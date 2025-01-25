// import { Genre } from '@/types/genre';
// import genresService from '@/services/genres-service';
// import useData from './useData';
import genres from '@/data/genres';

import genresService from '@/services/genres-service';
import { ApiResponse } from '@/types/api';
import { Genre } from '@/types/genre';
import { useQuery } from '@tanstack/react-query';
import ms from 'ms';

// const useGenres = () => useData<Genre>(genresService, []);
// const useGenres = () => ({ data: genres, error: null, isLoading: false });

const useGenres = () =>
  useQuery<ApiResponse<Genre>, Error>({
    queryKey: ['genres'],
    queryFn: () => genresService.getAll().response,
    initialData: {
      count: genres.length,
      previous: null,
      next: null,
      results: genres,
    },
    staleTime: ms('24h'),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export default useGenres;
