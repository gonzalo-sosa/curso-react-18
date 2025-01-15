import { create } from './http-service';
import config from '@/config';

const gamesService = (params: URLSearchParams | null) => {
  const endpoint = new URL(
    'https://api.rawg.io/api/games' + `?key=${config.api_key}`,
  );

  if (params) {
    params.entries().forEach(([key, value]) => {
      endpoint.searchParams.append(key, value);
    });
  }

  return create(endpoint.toString());
};

export default gamesService;
