import { Genre } from './genre';
import { Platform } from './platform';

export interface GameQuery {
  genres: Genre | null;
  parent_platforms: Platform | null;
  ordering: string;
  search: string;
}
