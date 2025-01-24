import useGenre from '@/hooks/useGenre';
import usePlatform from '@/hooks/usePlatform';
import { GameQuery } from '@/types/query';
import { Heading } from '@chakra-ui/react';

interface GameHeadingProps {
  gameQuery: GameQuery;
}

const GameHeading = ({ gameQuery }: GameHeadingProps) => {
  const genre = useGenre(gameQuery.genres);
  const platform = usePlatform(gameQuery.parent_platforms);
  const heading = `${platform?.name || ''} ${genre?.name || ''} Games`;

  return (
    <Heading as="h1" marginY={5}>
      {heading}
    </Heading>
  );
};

export default GameHeading;
