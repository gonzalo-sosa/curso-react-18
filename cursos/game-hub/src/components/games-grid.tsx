import { Box, Button, SimpleGrid, Text } from '@chakra-ui/react';
import GameCard from './game-card';
import GameCardSkeleton from './game-card-skeleton';
import GameCardContainer from './game-card-container';
import useGames from '@/hooks/useGames';
import { GameQuery } from '@/types/query';
import { Fragment } from 'react/jsx-runtime';

const MAX_SKELETONS_TO_SHOW = 8;

interface GamesGridProps {
  gameQuery: GameQuery;
}

const GamesGrid = ({ gameQuery }: GamesGridProps) => {
  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGames(gameQuery);

  if (error) return <Text>{error.message}</Text>;

  const skeletons = new Array(MAX_SKELETONS_TO_SHOW)
    .fill(0)
    .map((_, index) => index + 1);

  return (
    <Box padding={'10px'}>
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        spacing={6}
        justifyItems={'center'}
        marginBottom={4}
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <GameCardContainer key={`skeleton-container-${skeleton}`}>
              <GameCardSkeleton key={`skeleton-${skeleton}`} />
            </GameCardContainer>
          ))}
        {data?.pages.map((page, index) => (
          <Fragment key={`page-${index}`}>
            {page.results.map((game) => (
              <GameCardContainer key={`container-${game.id}`}>
                <GameCard key={game.id} {...game} />
              </GameCardContainer>
            ))}
          </Fragment>
        ))}
      </SimpleGrid>
      {hasNextPage && (
        <Button onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </Button>
      )}
    </Box>
  );
};

export default GamesGrid;
