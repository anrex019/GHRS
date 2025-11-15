'use client';

import { useState, useEffect } from 'react';
import { apiRequest } from '../config/api';

export interface Achievement {
  id: string;
  title: {
    en: string;
    ru: string;
    ka: string;
  };
  description: {
    en: string;
    ru: string;
    ka: string;
  };
  image?: string;
  imageBg?: string;
  current: number;
  total: number;
  isCompleted: boolean;
  unlockedAt?: Date;
  completedAt?: Date;
}

export interface UserStatistics {
  totalTimeSpent: number;
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

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const response = await apiRequest<Achievement[]>('/users/me/achievements');
      setAchievements(response);
      setError(null);
    } catch (err) {
      // If endpoint doesn't exist (404) or user not authenticated (401), use mock data
      if (err instanceof Error && (err.message.includes('404') || err.message.includes('401'))) {
        console.log('🏆 Achievements not available, using mock data');
        
        // Mock achievements data matching the Figma design
        const mockAchievements: Achievement[] = [
          {
            id: 'strike-wave',
            title: { en: 'Strike Wave', ru: 'Ударная волна', ka: 'დარტყმის ტალღა' },
            description: { en: 'Exercise for 15 days in a row', ru: 'Занимайтесь 15 дней подряд', ka: 'ივარჯიშეთ 15 დღე ზედიზედ' },
            image: '/assets/images/achievements/rocket.png',
            imageBg: '/assets/images/achievements/bg1.jpg',
            current: 12,
            total: 15,
            isCompleted: false,
          },
          {
            id: 'hard-for-me',
            title: { en: 'Too Hard For Me', ru: 'Сложности мне по плечу', ka: 'ძალიან რთულია ჩემთვის' },
            description: { en: 'Complete an advanced level in any set', ru: 'Завершите продвинутый уровень в любом комплексе', ka: 'დაასრულეთ მოწინავე დონე ნებისმიერ კომპლექსში' },
            image: '/assets/images/achievements/trophy.png',
            imageBg: '/assets/images/achievements/bg2.jpg',
            current: 0,
            total: 1,
            isCompleted: false,
          },
          {
            id: 'reader',
            title: { en: 'Reader', ru: 'Читатель', ka: 'მკითხველი' },
            description: { en: 'Read 15 articles', ru: 'Прочтите 15 статей', ka: 'წაიკითხეთ 15 სტატია' },
            image: '/assets/images/achievements/book.png',
            imageBg: '/assets/images/achievements/bg3.jpg',
            current: 12,
            total: 15,
            isCompleted: false,
          },
          {
            id: 'commentator',
            title: { en: 'I am a Commentator', ru: 'Я - комментатор', ka: 'მე ვარ კომენტატორი' },
            description: { en: 'Comment on articles 5 times', ru: 'Прокомментируйте статью 5 раз', ka: 'გააკეთეთ კომენტარი სტატიაზე 5-ჯერ' },
            image: '/assets/images/achievements/comment.png',
            imageBg: '/assets/images/achievements/bg4.jpg',
            current: 0,
            total: 1,
            isCompleted: false,
          },
        ];
        
        setAchievements(mockAchievements);
        setError(null);
      } else {
        setError(err instanceof Error ? err.message : 'Failed to load achievements');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  return {
    achievements,
    loading,
    error,
    refetch: fetchAchievements,
  };
}

export function useStatistics() {
  const [statistics, setStatistics] = useState<UserStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const response = await apiRequest<UserStatistics>('/users/me/statistics');
      setStatistics(response);
      setError(null);
    } catch (err) {
      console.error('Error fetching statistics:', err);
      
      // If endpoint doesn't exist (404), return null instead of error
      if (err instanceof Error && err.message.includes('404')) {
        console.warn('⚠️ Statistics endpoint not implemented yet, using null state');
        setStatistics(null);
        setError(null);
      } else {
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

// Activity tracking hook
export function useActivityTracker() {
  const recordActivity = async (
    type: 'exercise' | 'set' | 'course',
    itemId: string,
    timeSpent?: number
  ) => {
    try {
      // Debug: Check if token exists
      const token = localStorage.getItem('token');
      console.log('🔑 Token exists:', !!token);
      console.log('🔑 Token preview:', token ? token.substring(0, 20) + '...' : 'No token');
      
      // Debug: Check window object
      console.log('🌍 Window object:', typeof window !== 'undefined');
      console.log('🌍 LocalStorage available:', typeof localStorage !== 'undefined');
      
      console.log('📤 Sending activity request:', {
        type,
        itemId,
        timeSpent,
        endpoint: '/users/me/activity'
      });
      
      await apiRequest('/users/me/activity', {
        method: 'POST',
        body: JSON.stringify({
          type,
          itemId,
          timeSpent,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('✅ Activity recorded successfully!');
      
      // Trigger refetch of achievements and statistics
      // This could be improved with a global state management solution
      window.dispatchEvent(new CustomEvent('achievementsUpdate'));
      
    } catch (err) {
      console.error('❌ Error recording activity:', err);
      
      // Additional debug info for errors
      if (err instanceof Error) {
        console.error('❌ Error message:', err.message);
        console.error('❌ Error stack:', err.stack);
      }
      
      throw err; // Re-throw the error so it can be handled by the caller
    }
  };

  return {
    recordActivity,
  };
} 