import { HStack, Image } from '@chakra-ui/react';
import ColorModeSwitch from './color-mode-switch';
import SearchInput from '../search-input';

interface NavBarProps {
  onSearch: (searchText: string) => void;
}

const NavBar = ({ onSearch }: NavBarProps) => {
  return (
    <HStack padding={'10px'}>
      <Image src="logo.webp" boxSize={'60px'} />
      <SearchInput onSearch={onSearch} />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
