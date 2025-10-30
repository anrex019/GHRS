'use client';

import { useState, useEffect } from 'react';
import { apiRequest, API_CONFIG } from '../config/api';
import { useAuth } from '../context/AuthContext';

interface UseUserAccessReturn {
  hasAccess: boolean;
  loading: boolean;
  error: string | null;
  checkAccess: (setId: string) => Promise<void>;
  checkCourseAccess: (courseId: string) => Promise<void>;
}

export function useUserAccess(setId?: string, courseId?: string): UseUserAccessReturn {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, user } = useAuth();

  const checkAccess = async (targetSetId: string) => {
    if (!isAuthenticated || !user) {
      console.log('👤 User not authenticated, skipping access check');
      setHasAccess(false);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await apiRequest<boolean>(
        API_CONFIG.ENDPOINTS.PURCHASES.CHECK_ACCESS(targetSetId)
      );
      
      setHasAccess(response);
      console.log('✅ Access check result:', response);
    } catch (err) {
      // Only log error if user is authenticated (unexpected error)
      if (isAuthenticated) {
        console.error('❌ Error checking user access:', err);
        setError('შეცდომა access-ის შემოწმებისას');
      }
      setHasAccess(false);
    } finally {
      setLoading(false);
    }
  };

  const checkCourseAccess = async (targetCourseId: string) => {
    if (!isAuthenticated || !user) {
      console.log('👤 User not authenticated, skipping course access check');
      setHasAccess(false);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await apiRequest<boolean>(
        API_CONFIG.ENDPOINTS.PURCHASES.CHECK_COURSE_ACCESS(targetCourseId)
      );
      
      setHasAccess(response);
      console.log('✅ Course access check result:', response);
    } catch (err) {
      // Only log error if user is authenticated (unexpected error)
      if (isAuthenticated) {
        console.error('❌ Error checking course access:', err);
        setError('შეცდომა course access-ის შემოწმებისას');
      }
      setHasAccess(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (setId) {
      checkAccess(setId);
    } else if (courseId) {
      checkCourseAccess(courseId);
    }
  }, [setId, courseId, isAuthenticated, user]);

  return {
    hasAccess,
    loading,
    error,
    checkAccess,
    checkCourseAccess,
  };
}
