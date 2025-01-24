import { Genre } from './genre';
import { ParentPlatform } from './platform';

export interface GameQuery {
  genres: Genre | null;
  parent_platforms: ParentPlatform | null;
  ordering: string;
  search: string;
}
