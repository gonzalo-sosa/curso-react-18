// import { Genre } from '@/types/genre';
// import genresService from '@/services/genres-service';
// import useData from './useData';
import genres from '@/data/genres';

// const useGenres = () => useData<Genre>(genresService, []);
const useGenres = () => ({ data: genres, error: null, isLoading: false });

export default useGenres;
