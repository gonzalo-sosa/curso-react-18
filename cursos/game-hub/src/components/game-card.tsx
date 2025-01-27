import { Game } from '@/types/games';
import { Card, CardBody, Heading, Image, HStack } from '@chakra-ui/react';
import PlatformIconList from './platform-icon-list';
import CriticScore from './critic-score';
import { getCroppedImageUrl } from '@/services/image-service';
import Emoji from './emoji';
import { Link } from 'react-router-dom';

type GameCardProps = Game;

const GameCard = ({
  name,
  slug,
  background_image,
  parent_platforms,
  metacritic,
  rating_top,
}: GameCardProps) => {
  return (
    <Card as={Link} to={`/games/${slug}`}>
      <Image src={getCroppedImageUrl(background_image, 600, 400)} />
      <CardBody>
        <HStack justifyContent={'space-between'} marginBottom={3}>
          <PlatformIconList
            platforms={parent_platforms.map((p) => p.platform)}
          />
          <CriticScore score={metacritic} />
        </HStack>
        <Heading fontSize={'2xl'}>{name}</Heading>
        <Emoji rating={rating_top} />
      </CardBody>
    </Card>
  );
};

export default GameCard;
