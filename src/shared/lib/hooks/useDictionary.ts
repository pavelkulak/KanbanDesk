import { useState, useEffect } from 'react';
import { Dictionary } from '~/shared/types';
import { getDictionary } from '~/app/providers/store/api/dictionaryApi';

export const useDictionary = () => {
  const [dictionary, setDictionary] = useState<Dictionary>({
    assignees: [],
    statuses: [],
    priorities: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      setIsLoading(true);
      try {
        const data = await getDictionary();
        setDictionary(data);
        setError(null);
      } catch (error) {
        setError('Ошибка при загрузке справочника');
        console.error('Ошибка при загрузке справочника:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDictionary();
  }, []);

  return {
    dictionary,
    isLoading,
    error,
  };
};
