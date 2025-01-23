import { GameQuery } from '@/types/query';
import { Heading } from '@chakra-ui/react';

interface GameHeadingProps {
  gameQuery: GameQuery;
}

const GameHeading = ({ gameQuery }: GameHeadingProps) => {
  const heading = `${gameQuery.parent_platforms?.name || ''} ${
    gameQuery.genres?.name || ''
  }`;

  return (
    <Heading as="h1" marginY={5}>
      {heading}
    </Heading>
  );
};

export default GameHeading;
