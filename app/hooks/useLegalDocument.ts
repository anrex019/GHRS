import { useState, useEffect } from 'react';
import { API_CONFIG } from '../config/api';

interface LegalDocument {
  _id: string;
  type: string;
  locale: string;
  title: string;
  content: string;
  isActive: boolean;
  version?: string;
  effectiveDate?: string;
  createdAt: string;
  updatedAt: string;
}

export const useLegalDocument = (type: string, locale: string) => {
  const [document, setDocument] = useState<LegalDocument | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${API_CONFIG.BASE_URL}/api/legal/document?type=${type}&locale=${locale}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch legal document: ${response.statusText}`);
        }

        const data = await response.json();
        setDocument(data);
      } catch (err) {
        console.error('Error fetching legal document:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setDocument(null);
      } finally {
        setLoading(false);
      }
    };

    if (type && locale) {
      fetchDocument();
    }
  }, [type, locale]);

  return { document, loading, error };
};
