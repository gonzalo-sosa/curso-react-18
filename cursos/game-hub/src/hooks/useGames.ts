import { Game } from '@/types/games';
import gamesService from '@/services/games-service';
import { GameQuery } from '@/types/query';
import { useQuery } from '@tanstack/react-query';
import { ApiResponse } from '@/types/api';

// const useGames = (gameQuery: GameQuery) => {
//   const urlParams = new URLSearchParams();
//   Object.entries(gameQuery).forEach(([key, value]) => {
//     if (value) urlParams.append(key, value.id ?? value);
//   });

//   return useData<Game>(gamesService(urlParams), [gameQuery]);
// };

// () =>
//       fetch(`https://api.rawg.io/api/games?key=${config.api_key}`).then(
//         (data) => data.json(),
//       ),

function toURLParams(gameQuery: GameQuery) {
  const urlParams = new URLSearchParams();
  Object.entries(gameQuery).forEach(([key, value]) => {
    if (value) urlParams.append(key, value.id ?? value);
  });

  return urlParams;
}

const useGames = (gameQuery: GameQuery) =>
  useQuery<ApiResponse<Game>, Error>({
    queryKey: ['games', gameQuery],
    queryFn: () => gamesService(toURLParams(gameQuery)).getAll().response,
  });

export default useGames;
