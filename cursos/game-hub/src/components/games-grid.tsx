import { SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import GameCard from './game-card';
import GameCardSkeleton from './game-card-skeleton';
import GameCardContainer from './game-card-container';
import useGames from '@/hooks/useGames';
import { GameQuery } from '@/types/query';
import { Fragment } from 'react/jsx-runtime';
import InfiniteScroll from 'react-infinite-scroll-component';

const MAX_SKELETONS_TO_SHOW = 8;

interface GamesGridProps {
  gameQuery: GameQuery;
}

const GamesGrid = ({ gameQuery }: GamesGridProps) => {
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useGames(gameQuery);

  if (error) return <Text>{error.message}</Text>;

  const skeletons = new Array(MAX_SKELETONS_TO_SHOW)
    .fill(0)
    .map((_, index) => index + 1);

  const fetchedGamesCount =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  return (
    data && (
      <InfiniteScroll
        dataLength={fetchedGamesCount}
        next={() => fetchNextPage()}
        hasMore={hasNextPage ?? false}
        loader={<Spinner />}
        endMessage={<p>Yuo hace seen it all</p>}
      >
        <SimpleGrid
          columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
          spacing={6}
          padding={'10px'}
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
      </InfiniteScroll>
    )
  );
};

export default GamesGrid;
