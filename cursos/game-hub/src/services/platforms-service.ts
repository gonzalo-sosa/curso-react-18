import { ApiResponse } from '@/types/api';
import { create } from './http-service';
import config from '@/config';
import { ParentPlatform } from '@/types/platform';

export default create<ApiResponse<ParentPlatform>>(
  'https://api.rawg.io/api/platforms/lists/parents' + `?key=${config.api_key}`,
);
