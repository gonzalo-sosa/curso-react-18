import { ApiResponse } from '@/types/api';
import { create } from './http-service';
import config from '@/config';
import { Game } from '@/types/games';

const gamesService = (params?: URLSearchParams) => {
  const endpoint = new URL('https://api.rawg.io/api/games');
  if (params) endpoint.search = `?key=${config.api_key}&${params.toString()}`;
  else endpoint.search = `?key=${config.api_key}`;
  return create<ApiResponse<Game>>(endpoint.toString());
};

export default gamesService;
