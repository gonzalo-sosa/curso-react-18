// import { Platform } from '@/types/platform';
// import useData from './useData';
// import platformsService from '@/services/platforms-service';
import parent_platforms from '@/data/parent_platforms';

// const usePlatforms = () => useData<Platform>(platformsService, []);
const usePlatforms = () => ({
  data: parent_platforms,
  error: null,
  isLoading: false,
});

export default usePlatforms;
