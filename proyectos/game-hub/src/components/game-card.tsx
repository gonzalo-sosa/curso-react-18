import { Game } from "@/types/games";
import { Card, CardBody, Heading, Image } from "@chakra-ui/react";

interface GameCardProps extends Game {}

export const GameCard = ({ name, background_image }: GameCardProps) => {
  return (
    <Card borderRadius={10} overflow={"hidden"}>
      <Image src={background_image} />
      <CardBody>
        <Heading fontSize={"2xl"}>{name}</Heading>
      </CardBody>
    </Card>
  );
};
