import { Game } from '@/types/games';
import gamesService from '@/services/games-service';
import useData from './useData';
import { Genre } from '@/types/genre';

const useGames = (selectedGenre: Genre | null) => {
  let params = null;
  if (selectedGenre) {
    params = new URLSearchParams();
    params.append('genres', selectedGenre.id.toString());
  }

  const {
    data: games,
    setData: setGames,
    error,
    isLoading,
    setError,
  } = useData<Game>(gamesService(params), [selectedGenre?.id]);

  return { games, error, isLoading, setGames, setError };
};

export default useGames;
