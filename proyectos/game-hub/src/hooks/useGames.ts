import { Game } from '@/types/games';
import gamesService from '@/services/games-service';
import useData from './useData';
import { GameQuery } from '@/types/query';

const useGames = (gameQuery: GameQuery) => {
  const urlParams = new URLSearchParams();
  Object.entries(gameQuery).forEach(([key, value]) => {
    if (value) urlParams.append(key, value.id);
  });

  return useData<Game>(gamesService(urlParams), [gameQuery]);
};

export default useGames;
