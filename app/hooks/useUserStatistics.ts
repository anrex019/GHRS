import { useState, useEffect } from 'react';
import { apiRequest } from '../config/api';

export interface UserStatistics {
  totalTimeSpent: number; // in minutes
  totalExercisesCompleted: number;
  currentStreak: number;
  recordStreak: number;
  totalSetsCompleted: number;
  totalCoursesCompleted: number;
  completedExerciseIds: string[];
  completedSetIds: string[];
  completedCourseIds: string[];
  activityDates: Date[];
}

interface UseUserStatisticsReturn {
  statistics: UserStatistics | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useUserStatistics(): UseUserStatisticsReturn {
  const [statistics, setStatistics] = useState<UserStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await apiRequest<UserStatistics>('/users/me/statistics');
      setStatistics(data);
    } catch (err) {
      // If user is not authenticated or endpoint doesn't exist, set default values
      if (err instanceof Error && (err.message.includes('401') || err.message.includes('404'))) {
        console.log('📊 User statistics not available, using defaults');
        setStatistics({
          totalTimeSpent: 0,
          totalExercisesCompleted: 0,
          currentStreak: 0,
          recordStreak: 0,
          totalSetsCompleted: 0,
          totalCoursesCompleted: 0,
          completedExerciseIds: [],
          completedSetIds: [],
          completedCourseIds: [],
          activityDates: []
        });
        setError(null);
      } else {
        console.error('❌ Error fetching user statistics:', err);
        setError(err instanceof Error ? err.message : 'Failed to load statistics');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return {
    statistics,
    loading,
    error,
    refetch: fetchStatistics,
  };
}

/**
 * Format time spent in hours and minutes
 */
export function formatTimeSpent(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:00`;
}

/**
 * Calculate average time per day
 */
export function calculateAverageTime(totalMinutes: number, days: number): string {
  if (days === 0) return '00:00:00';
  const avgMinutes = Math.floor(totalMinutes / days);
  return formatTimeSpent(avgMinutes);
}
