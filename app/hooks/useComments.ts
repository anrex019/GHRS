import { useState, useEffect } from 'react';
import { getArticleComments, createComment, deleteComment, likeComment, Comment, CreateCommentData } from '../api/comments';

export function useComments(articleId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch comments
  useEffect(() => {
    if (!articleId) return;

    const fetchComments = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getArticleComments(articleId);
        setComments(data);
      } catch (err) {
        console.error('Error fetching comments:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch comments');
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [articleId]);

  // Add a new comment
  const addComment = async (content: string): Promise<boolean> => {
    try {
      const newComment = await createComment({ articleId, content });
      setComments(prev => [newComment, ...prev]);
      return true;
    } catch (err) {
      console.error('Error creating comment:', err);
      setError(err instanceof Error ? err.message : 'Failed to create comment');
      return false;
    }
  };

  // Remove a comment
  const removeComment = async (commentId: string): Promise<boolean> => {
    try {
      await deleteComment(commentId);
      setComments(prev => prev.filter(c => c._id !== commentId));
      return true;
    } catch (err) {
      console.error('Error deleting comment:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete comment');
      return false;
    }
  };

  // Like a comment
  const toggleLike = async (commentId: string): Promise<boolean> => {
    try {
      const updated = await likeComment(commentId);
      setComments(prev => prev.map(c => c._id === commentId ? updated : c));
      return true;
    } catch (err) {
      console.error('Error liking comment:', err);
      return false;
    }
  };

  return {
    comments,
    isLoading,
    error,
    addComment,
    removeComment,
    toggleLike,
  };
}
