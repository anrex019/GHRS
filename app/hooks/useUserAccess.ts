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
    // Check if token exists in localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    if (!isAuthenticated || !user || !token) {
      console.log('👤 User not authenticated or no token, skipping access check', {
        isAuthenticated,
        hasUser: !!user,
        hasToken: !!token
      });
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
      // Silently handle 401 errors (user not authorized for this content)
      if (err instanceof Error && err.message.includes('401')) {
        console.log('🔒 User does not have access to this content');
      } else {
        console.error('❌ Error checking user access:', err);
      }
      setHasAccess(false);
      setError(null); // Don't show error to user for access checks
    } finally {
      setLoading(false);
    }
  };

  const checkCourseAccess = async (targetCourseId: string) => {
    // Check if token exists in localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    if (!isAuthenticated || !user || !token) {
      console.log('👤 User not authenticated or no token, skipping course access check', {
        isAuthenticated,
        hasUser: !!user,
        hasToken: !!token
      });
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
      // Silently handle 401 errors (user not authorized for this content)
      if (err instanceof Error && err.message.includes('401')) {
        console.log('🔒 User does not have access to this course');
      } else {
        console.error('❌ Error checking course access:', err);
      }
      setHasAccess(false);
      setError(null); // Don't show error to user for access checks
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only check access if user is authenticated
    if (!isAuthenticated || !user) {
      setHasAccess(false);
      setLoading(false);
      return;
    }

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
