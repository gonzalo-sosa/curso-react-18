import ApiResponse from '@/types/api';
import Game from '@/types/games';
import gamesService from '@/services/games-service';
import GameQuery from '@/types/query';
import { useInfiniteQuery } from '@tanstack/react-query';
import ms from 'ms';
import useGameQueryStore from '@/store';

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

// const useGames = (gameQuery: GameQuery) =>
//   useQuery<ApiResponse<Game>, Error>({
//     queryKey: ['games', gameQuery],
//     queryFn: () => gamesService(toURLParams(gameQuery)).getAll().response,
//   });

const useGames = () => {
  const gameQuery = useGameQueryStore((s) => s.gameQuery);

  return useInfiniteQuery<ApiResponse<Game>, Error>({
    queryKey: ['games', gameQuery],
    queryFn: ({ pageParam = 1 }) =>
      gamesService(toURLParams({ ...gameQuery, page: pageParam })).getAll()
        .response,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: ms('24h'),
    refetchOnWindowFocus: false,
  });
};

export default useGames;
