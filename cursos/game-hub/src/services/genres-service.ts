import config from '@/config';
import { create } from './http-service';
import { Genre } from '@/types/genre';
import { ApiResponse } from '@/types/api';

export default create<ApiResponse<Genre>>(
  'https://api.rawg.io/api/genres' + `?key=${config.api_key}`,
);
