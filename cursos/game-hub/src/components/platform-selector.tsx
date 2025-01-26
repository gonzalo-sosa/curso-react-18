import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import usePlatforms from '../hooks/usePlatforms';
import { BsChevronDown } from 'react-icons/bs';
import useGameQueryStore from '@/store';

// interface PlatformSelectorProps {
//   selectedPlatformId?: ParentPlatform['id'];
//   onSelectPlatform: (platform: ParentPlatform | null) => void;
// }

const PlatformSelector = () => {
  const platformId = useGameQueryStore((s) => s.gameQuery.parent_platforms);
  const setPlatformId = useGameQueryStore((s) => s.setPlatformId);
  const { data, error } = usePlatforms();
  const selectedPlatformName = data.results.find(
    (p) => p.id === platformId,
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
            onClick={() => setPlatformId(platform.id)}
          >
            {platform.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default PlatformSelector;
