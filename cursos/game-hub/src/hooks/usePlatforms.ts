// import { Platform } from '@/types/platform';
// import useData from './useData';
// import platformsService from '@/services/platforms-service';

import parent_platforms from '@/data/parent_platforms';
import platformsService from '@/services/platforms-service';
import ApiResponse from '@/types/api';
import { ParentPlatform } from '@/types/platform';
import { useQuery } from '@tanstack/react-query';
import ms from 'ms';

// const usePlatforms = () => useData<Platform>(platformsService, []);
// const usePlatforms = () => ({
//   data: parent_platforms,
//   error: null,
//   isLoading: false,
// });

const usePlatforms = () =>
  useQuery<ApiResponse<ParentPlatform>, Error>({
    queryKey: ['platforms'],
    queryFn: () => platformsService.getAll().response,
    initialData: {
      count: parent_platforms.length,
      previous: null,
      next: null,
      results: parent_platforms as ParentPlatform[],
    },
    staleTime: ms('24h'),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export default usePlatforms;
