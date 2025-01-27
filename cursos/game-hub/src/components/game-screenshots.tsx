import useScreenshots from '@/hooks/useScreenshots';
import { Game } from '@/types/games';
import { Image, SimpleGrid } from '@chakra-ui/react';

interface GameScreenshotsProps {
  gameId: Game['id'];
}

export default function GameScreenshots({ gameId }: GameScreenshotsProps) {
  const { data, error, isLoading } = useScreenshots(gameId);

  if (isLoading) return null;

  if (error) throw error;

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
      {data.results.map((file) => (
        <Image key={file.id} src={file.image} />
      ))}
    </SimpleGrid>
  );
}
