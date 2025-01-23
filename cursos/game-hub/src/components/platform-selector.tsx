import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import usePlatforms from '../hooks/usePlatforms';
import { BsChevronDown } from 'react-icons/bs';
import { Platform } from '@/types/platform';

interface PlatformSelectorProps {
  selectedPlatform: Platform | null;
  onSelectPlatform: (platform: Platform | null) => void;
}

const PlatformSelector = ({
  selectedPlatform,
  onSelectPlatform,
}: PlatformSelectorProps) => {
  const { data: platforms, error } = usePlatforms();

  if (error) return null;

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedPlatform?.name || 'Platforms'}
      </MenuButton>
      <MenuList>
        {platforms.map((platform) => (
          <MenuItem
            key={platform.id}
            onClick={() => onSelectPlatform(platform)}
          >
            {platform.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default PlatformSelector;
