import GameAttributes from '@/components/game-attributes';
import GameScreenshots from '@/components/game-screenshots';
import GameTrailer from '@/components/game-trailer';
import ExpandableText from '@/components/ui/expandable-text';
import useGame from '@/hooks/useGame';
import { Box, GridItem, Heading, SimpleGrid, Spinner } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

export default function GameDetailPage() {
  const { slug } = useParams();
  const { data: game, isLoading, error } = useGame(slug!); // No es null

  if (error) throw error;

  if (isLoading) return <Spinner />;

  return (
    <Box padding={5}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
        <GridItem>
          <Heading marginBottom={3}>{game.name}</Heading>
          <ExpandableText>{game.description_raw}</ExpandableText>
          <GameAttributes game={game} />
        </GridItem>
        <GridItem>
          <GameTrailer gameId={game.id} />
          <GameScreenshots gameId={game.id} />
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}
