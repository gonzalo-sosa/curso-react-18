import { Game } from "@/types/games";
import { SimpleGrid } from "@chakra-ui/react";
import { GameCard } from "./game-card";

interface GamesGridProps {
  games: Game[];
}

const GamesGrid = ({ games }: GamesGridProps) => {
  if (games.length === 0) return null;

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
      padding={"10px"}
      spacing={10}
    >
      {games.map((game) => (
        <GameCard key={game.id} {...game} />
      ))}
    </SimpleGrid>
  );
};

export default GamesGrid;
