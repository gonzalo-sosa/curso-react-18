import config from '@/config';
import { create } from '@/services/http-service';
import { GameDetails } from '@/types/games';
import { useQuery } from '@tanstack/react-query';

const gameService = create<GameDetails>(
  `https://api.rawg.io/api/games/?key=${config.api_key}`,
);

export default function (slug: string) {
  return useQuery<GameDetails, Error>({
    queryKey: ['games', slug],
    queryFn: () => gameService.get(slug).response,
  });
}
