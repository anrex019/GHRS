import { useState, useEffect } from 'react';
import { getBlogs, getFeaturedBlogs, getPopularBlogs, getBlogsByCategory, Blog } from '@/app/api/blogs';

interface UseBlogsOptions {
  page?: number;
  limit?: number;
  categoryId?: string;
  isPublished?: boolean;
  isFeatured?: boolean;
}

export const useBlogs = (options: UseBlogsOptions = {}) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getBlogs(options);
        setBlogs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [options.page, options.limit, options.categoryId, options.isPublished, options.isFeatured]);

  return { blogs, loading, error };
};

export const useFeaturedBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getFeaturedBlogs();
        setBlogs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch featured blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBlogs();
  }, []);

  return { blogs, loading, error };
};

export const usePopularBlogs = (limit?: number) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPopularBlogs(limit);
        setBlogs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch popular blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchPopularBlogs();
  }, [limit]);

  return { blogs, loading, error };
};

export const useBlogsByCategory = (categoryId: string) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryId) return;

    const fetchBlogsByCategory = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getBlogsByCategory(categoryId);
        setBlogs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blogs by category');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogsByCategory();
  }, [categoryId]);

  return { blogs, loading, error };
};