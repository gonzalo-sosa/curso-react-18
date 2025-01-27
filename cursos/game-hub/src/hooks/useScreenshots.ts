import config from '@/config';
import { create } from '@/services/http-service';
import ApiResponse from '@/types/api';
import Game from '@/types/games';
import Screenshot from '@/types/screenshot';
import { useQuery } from '@tanstack/react-query';

const screenshotService = (gameId: Game['id']) =>
  create<ApiResponse<Screenshot>>(
    `https://api.rawg.io/api/games/${gameId}/screenshots?key=${config.api_key}`,
  );

export default function (gameId: Game['id']) {
  return useQuery<ApiResponse<Screenshot>, Error>({
    queryKey: ['screenshots'],
    queryFn: () => screenshotService(gameId).getAll().response,
  });
}
