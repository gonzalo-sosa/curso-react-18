import { Game } from "@/types/games";
import { Card, CardBody, Heading, Image, Text } from "@chakra-ui/react";
import { PlatformIconList } from "./platform-icon-list";

interface GameCardProps extends Game {}

export const GameCard = ({
  name,
  background_image,
  parent_platforms,
}: GameCardProps) => {
  return (
    <Card borderRadius={10} overflow={"hidden"}>
      <Image src={background_image} />
      <CardBody>
        <Heading fontSize={"2xl"}>{name}</Heading>
        <PlatformIconList platforms={parent_platforms.map((p) => p.platform)} />
      </CardBody>
    </Card>
  );
};
