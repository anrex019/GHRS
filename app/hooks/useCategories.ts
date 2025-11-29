"use client";

import { useState, useEffect } from "react";

// ბექენდის API რესპონსისთვის - exact structure
interface LocalizedString {
  ka: string;
  en: string;
  ru: string;
  _id: string;
}

interface BackendCategory {
  _id: string;
  name: LocalizedString;
  description?: LocalizedString;
  image?: string | null;
  subcategories: string[]; // ObjectId arrays from backend
  sets: string[]; // ObjectId arrays from backend
  isActive: boolean;
  isPublished: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  parentId?: string; // Added for filtering
}

interface UseCategoriesReturn {
  categories: BackendCategory[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

function getFallbackCategories(): BackendCategory[] {
  return [
    {
      _id: "fallback_1",
      name: {
        ka: "ორთოპედია",
        en: "Orthopedics", 
        ru: "Ортопедия",
        _id: "fallback_name_1"
      },
      description: {
        ka: "ძვლებისა და სახსრების მკურნალობა",
        en: "Treatment of bones and joints",
        ru: "Лечение костей и суставов",
        _id: "fallback_desc_1"
      },
      image: "/assets/images/services/category.png",
      subcategories: [],
      sets: [],
      isActive: true,
      isPublished: true,
      sortOrder: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0
    },
    {
      _id: "fallback_2", 
      name: {
        ka: "თერაპია",
        en: "Therapy",
        ru: "Терапия",
        _id: "fallback_name_2"
      },
      description: {
        ka: "მკურნალობა მედიკამენტებით",
        en: "Treatment with medications",
        ru: "Лечение медикаментами",
        _id: "fallback_desc_2"
      },
      image: "/assets/images/services/course2.png",
      subcategories: [],
      sets: [],
      isActive: true,
      isPublished: true,
      sortOrder: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0
    },
    {
      _id: "fallback_3",
      name: {
        ka: "ქირურგია",
        en: "Surgery", 
        ru: "Хирургия",
        _id: "fallback_name_3"
      },
      description: {
        ka: "ოპერაციული ჩარევა",
        en: "Surgical intervention",
        ru: "Хирургическое вмешательство", 
        _id: "fallback_desc_3"
      },
      image: "/assets/images/services/cousre1.png",
      subcategories: [],
      sets: [],
      isActive: true,
      isPublished: true,
      sortOrder: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0
    }
  ];
}

export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<BackendCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const { apiRequest, API_CONFIG } = await import("../config/api");
      const endpoint = API_CONFIG.ENDPOINTS.CATEGORIES;

      const backendCategories: BackendCategory[] = await apiRequest<BackendCategory[]>(endpoint);

      if (!Array.isArray(backendCategories)) {
        throw new Error("API response is not an array");
      }

      setCategories(backendCategories);
      
    } catch (err: unknown) {
      const fallbackCategories = getFallbackCategories();
      setCategories(fallbackCategories);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
  };
}

// SWR Version - გამოიყენე მხოლოდ თუ SWR დაინსტალირებული გაქვს
// npm install swr
/*
import useSWR from 'swr';

export function useCategoriesSWR() {
  const fetcher = async () => {
    const { apiRequest } = await import('../config/api');
    return apiRequest<BackendCategory[]>('/categories');
  };

  const { data, error, isLoading, mutate } = useSWR(
    '/categories',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 0,
      errorRetryCount: 3
    }
  );

  return {
    categories: data || [],
    loading: isLoading,
    error: error?.message || null,
    refetch: mutate
  };
}
*/
