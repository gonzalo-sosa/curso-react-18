import { Game } from "@/types/games";
import { Card, CardBody, Heading, Image, HStack } from "@chakra-ui/react";
import PlatformIconList from "./platform-icon-list";
import CriticScore from "./critic-score";
import { getCroppedImageUrl } from "@/services/image-service";

interface GameCardProps extends Game {}

const GameCard = ({
  name,
  background_image,
  parent_platforms,
  metacritic,
}: GameCardProps) => {
  return (
    <Card width={"300px"} borderRadius={10} overflow={"hidden"}>
      <Image src={getCroppedImageUrl(background_image, 600, 400)} />
      <CardBody>
        <Heading fontSize={"2xl"}>{name}</Heading>
        <HStack justifyContent={"space-between"}>
          <PlatformIconList
            platforms={parent_platforms.map((p) => p.platform)}
          />
          <CriticScore score={metacritic} />
        </HStack>
      </CardBody>
    </Card>
  );
};

export default GameCard;
