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
import { Genre } from '@/types/genre';

interface GenreListProps {
  selectedGenre: Genre | null;
  onSelectGenre: (genre: Genre) => void;
}

const GenreList = ({ selectedGenre, onSelectGenre }: GenreListProps) => {
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
                onClick={() => onSelectGenre(genre)}
                fontWeight={selectedGenre?.id === genre.id ? 'bold' : 'normal'}
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
