import { SimpleGrid, Text } from "@chakra-ui/react";
import GameCard from "./game-card";
import GameCardSkeleton from "./game-card-skeleton";
import useGames from "@/hooks/useGames";

const MAX_SKELETONS_TO_SHOW = 6;

const GamesGrid = () => {
  const { games, error, isLoading } = useGames();

  if (error) return <Text>{error}</Text>;
  if (!isLoading && games.length === 0) return <Text>No games found</Text>;

  const skeletons = new Array(MAX_SKELETONS_TO_SHOW)
    .fill(0)
    .map((_, index) => index + 1);

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      padding={"10px"}
      spacing={10}
      justifyItems={"center"}
    >
      {isLoading &&
        skeletons.map((skeleton) => (
          <GameCardSkeleton key={`skeleton-${skeleton}`} />
        ))}
      {games.map((game) => (
        <GameCard key={game.id} {...game} />
      ))}
    </SimpleGrid>
  );
};

export default GamesGrid;
