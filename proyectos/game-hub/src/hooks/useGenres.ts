import { Genre } from '@/types/genre';
import genresService from '@/services/genres-service';
import useData from './useData';

const useGenres = () => useData<Genre>(genresService, []);

export default useGenres;
