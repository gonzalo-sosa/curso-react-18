import { Game } from '@/types/games';
import gamesService from '@/services/games-service';
import useData from './useData';

const useGames = () => {
  const {
    data: games,
    setData: setGames,
    error,
    isLoading,
    setError,
  } = useData<Game>(gamesService);

  return { games, error, isLoading, setGames, setError };
};

export default useGames;
