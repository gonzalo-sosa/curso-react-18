import { HStack, Image } from '@chakra-ui/react';
import ColorModeSwitch from './color-mode-switch';
import SearchInput from '../search-input';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <HStack padding={'10px'}>
      <Link to={'/'}>
        <Image src="/public/logo.webp" boxSize={'60px'} objectFit={'cover'} />
      </Link>
      <SearchInput />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
