import { Platform } from '@/types/platform';
import useData from './useData';
import platformsService from '@/services/platforms-service';

const usePlatforms = () => useData<Platform>(platformsService, []);

export default usePlatforms;
