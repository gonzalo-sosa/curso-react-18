import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import usePlatforms from '../hooks/usePlatforms';
import { BsChevronDown } from 'react-icons/bs';
import { ParentPlatform } from '@/types/platform';

interface PlatformSelectorProps {
  selectedPlatformId?: ParentPlatform['id'];
  onSelectPlatform: (platform: ParentPlatform | null) => void;
}

const PlatformSelector = ({
  selectedPlatformId,
  onSelectPlatform,
}: PlatformSelectorProps) => {
  const { data, error } = usePlatforms();
  const selectedPlatformName = data.results.find(
    (p) => p.id === selectedPlatformId,
  )?.name;

  if (error) return null;

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedPlatformName || 'Platforms'}
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
