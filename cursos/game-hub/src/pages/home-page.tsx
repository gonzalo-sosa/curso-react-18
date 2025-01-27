import { Box, Flex, Grid, GridItem, Show } from '@chakra-ui/react';
import GameHeading from '@/components/game-heading';
import GamesGrid from '@/components/games-grid';
import GenreList from '@/components/genre-list';
import PlatformSelector from '@/components/platform-selector';
import SortSelector from '@/components/sort-selector';

export default function HomePage() {
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"aside main"`,
      }}
      templateColumns={{
        base: '1fr',
        lg: '200px 1fr',
      }}
    >
      <Show above="lg">
        <GridItem area={'aside'} paddingX={5}>
          <GenreList />
        </GridItem>
      </Show>
      <GridItem area={'main'}>
        <Box paddingLeft={2}>
          <GameHeading />
          <Flex marginBottom={5}>
            <Box marginRight={5}>
              <PlatformSelector />
            </Box>
            <SortSelector />
          </Flex>
        </Box>
        <GamesGrid />
      </GridItem>
    </Grid>
  );
}
