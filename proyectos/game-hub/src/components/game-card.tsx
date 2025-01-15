import { Game } from "@/types/games";
import { Card, CardBody, Heading, Image, HStack } from "@chakra-ui/react";
import { PlatformIconList } from "./platform-icon-list";
import { CriticScore } from "./critic-score";

interface GameCardProps extends Game {}

export const GameCard = ({
  name,
  background_image,
  parent_platforms,
  metacritic,
}: GameCardProps) => {
  return (
    <Card borderRadius={10} overflow={"hidden"}>
      <Image src={background_image} />
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
