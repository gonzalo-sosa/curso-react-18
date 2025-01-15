import {
  List,
  ListItem,
  HStack,
  Image,
  Spinner,
  Button,
} from '@chakra-ui/react';
import useGenres from '@/hooks/useGenres';
import { getCroppedImageUrl } from '@/services/image-service';
import { Genre } from '@/types/genre';

interface GenreListProps {
  onSelectGenre: (genre: Genre) => void;
}

const GenreList = ({ onSelectGenre }: GenreListProps) => {
  const { genres, isLoading, error } = useGenres();

  if (error) return null;
  if (isLoading) return <Spinner />;

  return (
    <List>
      {genres.map((genre) => (
        <ListItem key={genre.id} paddingY={'5px'}>
          <HStack>
            <Image
              src={getCroppedImageUrl(genre.image_background, 600, 400)}
              boxSize={'32px'}
              borderRadius={8}
            />
            <Button
              onClick={() => onSelectGenre(genre)}
              fontSize={'lg'}
              variant={'link'}
            >
              {genre.name}
            </Button>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

export default GenreList;
