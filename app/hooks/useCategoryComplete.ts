/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { apiRequest } from '../config/api';
import { MultiLanguageField, Subcategory } from '../types/category';

// BackendSet type definition (moved from exercise.ts)
export interface BackendSet {
  _id: string;
  name: MultiLanguageField;
  description?: MultiLanguageField;
  thumbnailImage?: string;
  categoryId: string;
  subCategoryId?: string;
  isActive: boolean;
  isPublished: boolean;
  sortOrder: number;
}

export interface CategoryCompleteData {
  category: {
    _id: string;
    name: MultiLanguageField;
    description?: MultiLanguageField;
    image?: string;
    subcategories: Subcategory[];
    sets: BackendSet[];
    isActive: boolean;
    sortOrder: number;
    isPublished: boolean;
  };
  sets: BackendSet[];
  subcategories: Subcategory[];
}

interface UseCategoryCompleteReturn {
  categoryData: CategoryCompleteData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useCategoryComplete(categoryId: string): UseCategoryCompleteReturn {
  const [categoryData, setCategoryData] = useState<CategoryCompleteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategoryComplete = async () => {
    if (!categoryId) return;

    if (categoryId.startsWith('fallback_')) {
      setCategoryData({
        category: {
          _id: categoryId,
          name: { ka: '', en: '', ru: '' },
          subcategories: [],
          sets: [],
          isActive: true,
          sortOrder: 0,
          isPublished: true,
        },
        sets: [],
        subcategories: [],
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const endpoint = `/api/categories/${categoryId}/complete`;
      const response = await apiRequest<CategoryCompleteData>(endpoint);
      
      setCategoryData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchCategoryComplete();
    }
  }, [categoryId]);

  return {
    categoryData,
    loading,
    error,
    refetch: fetchCategoryComplete,
  };
} 