import { List, ListItem, HStack, Image, Text, Spinner } from '@chakra-ui/react';
import useGenres from '@/hooks/useGenres';
import { getCroppedImageUrl } from '@/services/image-service';

const GenreList = () => {
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
            <Text fontSize={'lg'}>{genre.name}</Text>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

export default GenreList;
