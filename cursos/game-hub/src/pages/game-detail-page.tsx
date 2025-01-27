import GameAttributes from '@/components/game-attributes';
import GameScreenshots from '@/components/game-screenshots';
import GameTrailer from '@/components/game-trailer';
import ExpandableText from '@/components/ui/expandable-text';
import useGame from '@/hooks/useGame';
import { Box, Heading, Spinner } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

export default function GameDetailPage() {
  const { slug } = useParams();
  const { data: game, isLoading, error } = useGame(slug!); // No es null

  if (error) throw error;

  if (isLoading) return <Spinner />;

  return (
    <Box padding={5}>
      <Heading marginBottom={3}>{game.name}</Heading>
      <ExpandableText>{game.description_raw}</ExpandableText>
      <GameAttributes game={game} />
      <GameTrailer gameId={game.id} />
      <GameScreenshots gameId={game.id} />
    </Box>
  );
}
