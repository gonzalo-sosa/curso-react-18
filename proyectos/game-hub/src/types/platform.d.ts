export interface Platform {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
  image: unknown;
  year_start?: number;
  year_end: unknown;
  games: Game[];
}

interface Game {
  id: number;
  slug: string;
  name: string;
  added: number;
}
