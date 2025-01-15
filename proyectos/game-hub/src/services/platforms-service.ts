import { create } from './http-service';
import config from '@/config';

export default create(
  'https://api.rawg.io/api/platforms' + `?key=${config.api_key}`,
);
