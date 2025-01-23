import { SimpleGrid, Text } from '@chakra-ui/react';
import GameCard from './game-card';
import GameCardSkeleton from './game-card-skeleton';
import GameCardContainer from './game-card-container';
import useGames from '@/hooks/useGames';
import { GameQuery } from '@/types/query';

const MAX_SKELETONS_TO_SHOW = 8;

interface GamesGridProps {
  gameQuery: GameQuery;
}

const GamesGrid = ({ gameQuery }: GamesGridProps) => {
  const { data: games, error, isLoading } = useGames(gameQuery);

  if (error) return <Text>{error}</Text>;
  if (!isLoading && games.length === 0) return <Text>No games found</Text>;

  const skeletons = new Array(MAX_SKELETONS_TO_SHOW)
    .fill(0)
    .map((_, index) => index + 1);

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      padding={'10px'}
      spacing={6}
      justifyItems={'center'}
    >
      {isLoading &&
        skeletons.map((skeleton) => (
          <GameCardContainer key={`skeleton-container-${skeleton}`}>
            <GameCardSkeleton key={`skeleton-${skeleton}`} />
          </GameCardContainer>
        ))}
      {games.map((game) => (
        <GameCardContainer key={`container-${game.id}`}>
          <GameCard key={game.id} {...game} />
        </GameCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default GamesGrid;
