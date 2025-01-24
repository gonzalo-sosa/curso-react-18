import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import usePlatforms from '../hooks/usePlatforms';
import { BsChevronDown } from 'react-icons/bs';
import { ParentPlatform } from '@/types/platform';

interface PlatformSelectorProps {
  selectedPlatform: ParentPlatform | null;
  onSelectPlatform: (platform: ParentPlatform | null) => void;
}

const PlatformSelector = ({
  selectedPlatform,
  onSelectPlatform,
}: PlatformSelectorProps) => {
  const { data, error } = usePlatforms();

  if (error) return null;

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedPlatform?.name || 'Platforms'}
      </MenuButton>
      <MenuList>
        {data?.results.map((platform) => (
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
