import useGenre from '@/hooks/useGenre';
import usePlatform from '@/hooks/usePlatform';
import useGameQueryStore from '@/store';
import { Heading } from '@chakra-ui/react';

const GameHeading = () => {
  const genreId = useGameQueryStore((s) => s.gameQuery.genres);
  const genre = useGenre(genreId);

  const platformId = useGameQueryStore((s) => s.gameQuery.parent_platforms);
  const platform = usePlatform(platformId);

  const heading = `${platform?.name || ''} ${genre?.name || ''} Games`;

  return (
    <Heading as="h1" marginY={5}>
      {heading}
    </Heading>
  );
};

export default GameHeading;
