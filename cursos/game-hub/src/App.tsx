import { Box, Flex, Grid, GridItem, Show } from '@chakra-ui/react';
import NavBar from './components/ui/navbar';
import GamesGrid from './components/games-grid';
import GenreList from './components/genre-list';
import PlatformSelector from './components/platform-selector';
import SortSelector from './components/sort-selector';
import GameHeading from './components/game-heading';

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: '1fr',
        lg: '200px 1fr',
      }}
    >
      <GridItem area={'nav'}>
        <NavBar />
      </GridItem>
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

export default App;
