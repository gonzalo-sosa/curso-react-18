import { HStack, Image } from "@chakra-ui/react";
import ColorModeSwitch from "./color-mode-switch";

const NavBar = () => {
  return (
    <HStack>
      <Image src="logo.webp" boxSize={"60px"} />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
