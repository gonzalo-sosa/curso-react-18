import { HStack, Image } from '@chakra-ui/react';
import ColorModeSwitch from './color-mode-switch';
import SearchInput from '../search-input';

const NavBar = () => {
  return (
    <HStack padding={'10px'}>
      <Image src="/public/logo.webp" boxSize={'60px'} />
      <SearchInput />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
