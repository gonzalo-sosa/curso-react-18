import useTrailers from '@/hooks/useTrailers';
import { Game } from '@/types/games';

interface GameTrailerProps {
  gameId: Game['id'];
}

export default function GameTrailer({ gameId }: GameTrailerProps) {
  const { data, error, isLoading } = useTrailers(gameId);

  if (isLoading) return null;

  if (error) throw error;

  const first = data.results[0];
  return first ? (
    <video src={first.data['480']} poster={first.preview} controls />
  ) : null;
}
