import { Genre } from './genre';
import { ParentPlatform } from './platform';

export interface GameQuery {
  genres?: Genre['id'];
  parent_platforms?: ParentPlatform['id'];
  ordering?: string;
  search?: string;
  page?: number;
}
