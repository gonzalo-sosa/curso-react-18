import { Genre } from '@/types/genre';
import genresService from '@/services/genres-service';
import useData from './useData';

const useGenres = () => {
  const {
    data: genres,
    setData: setGenres,
    error,
    isLoading,
    setError,
  } = useData<Genre>(genresService, []);

  return { genres, error, isLoading, setGenres, setError };
};

export default useGenres;
