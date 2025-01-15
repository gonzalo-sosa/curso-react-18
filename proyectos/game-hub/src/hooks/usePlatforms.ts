import { Platform } from '@/types/platform';
import useData from './useData';
import platformsService from '@/services/platforms-service';

const usePlatforms = () => {
  const {
    data: platforms,
    setData: setPlatforms,
    error,
    isLoading,
    setError,
  } = useData<Platform>(platformsService, []);

  return { platforms, error, isLoading, setPlatforms, setError };
};

export default usePlatforms;
