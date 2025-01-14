import { Game } from "@/types/games";

interface GamesGridProps {
  games: Game[];
}

const GamesGrid = ({ games }: GamesGridProps) => {
  return (
    <ul>
      {games.map((game) => (
        <li key={game.id}>{game.name}</li>
      ))}
    </ul>
  );
};

export default GamesGrid;
