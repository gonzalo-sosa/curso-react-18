import config from '@/config';
import { create } from '@/services/http-service';
import { ApiResponse } from '@/types/api';
import { Game } from '@/types/games';
import { Trailer } from '@/types/trailer';
import { useQuery } from '@tanstack/react-query';

const trailerService = (gameId: Game['id']) =>
  create<ApiResponse<Trailer>>(
    `https://api.rawg.io/api/games/${gameId}/movies?key=${config.api_key}`,
  );

export default function (gameId: Game['id']) {
  return useQuery<ApiResponse<Trailer>, Error>({
    queryKey: ['trailers', gameId],
    queryFn: () => trailerService(gameId).getAll().response,
  });
}
