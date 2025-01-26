import {
  List,
  ListItem,
  HStack,
  Image,
  Spinner,
  Button,
  Heading,
} from '@chakra-ui/react';
import useGenres from '@/hooks/useGenres';
import { getCroppedImageUrl } from '@/services/image-service';
import useGameQueryStore from '@/store';

const GenreList = () => {
  const genreId = useGameQueryStore((s) => s.gameQuery.genres);
  const setGenreId = useGameQueryStore((s) => s.setGenreId);
  const { data, isLoading, error } = useGenres();

  if (error) return null;
  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading fontSize={'2xl'} marginBottom={3}>
        Genres
      </Heading>
      <List>
        {data?.results.map((genre) => (
          <ListItem key={genre.id} paddingY={'5px'}>
            <HStack>
              <Image
                src={getCroppedImageUrl(genre.image_background)}
                boxSize={'32px'}
                borderRadius={8}
                objectFit={'cover'}
              />
              <Button
                onClick={() => setGenreId(genre.id)}
                fontWeight={genreId === genre.id ? 'bold' : 'normal'}
                fontSize={'lg'}
                variant={'link'}
                whiteSpace={'normal'}
                textAlign={'left'}
              >
                {genre.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
