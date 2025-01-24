/* eslint-disable react-hooks/exhaustive-deps */
import { ApiResponse } from '@/types/api';
import { useEffect, useState } from 'react';
import { create } from '@/services/http-service';

const useData = <T>(
  service: ReturnType<typeof create<ApiResponse<T>>>,
  dependencies: unknown[],
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      setIsLoading(true);
      const { response, cancel } = service.getAll();

      response
        .then(({ results }) => {
          setData(results);
          setIsLoading(false);
        })
        .catch((error) => {
          if (error.name === 'AbortError') return;
          setError(error.message);
          setIsLoading(false);
        });

      return () => cancel();
    },
    dependencies ? [...dependencies] : [],
  );

  return { data, error, isLoading, setData, setError };
};

export default useData;
