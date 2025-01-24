import { Box, Flex, Grid, GridItem, Show } from '@chakra-ui/react';
import NavBar from './components/ui/navbar';
import GamesGrid from './components/games-grid';
import GenreList from './components/genre-list';
import { useState } from 'react';
import PlatformSelector from './components/platform-selector';
import { GameQuery } from './types/query';
import SortSelector from './components/sort-selector';
import GameHeading from './components/game-heading';

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

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
        <NavBar
          onSearch={(searchText) =>
            setGameQuery({ ...gameQuery, search: searchText })
          }
        />
      </GridItem>
      <Show above="lg">
        <GridItem area={'aside'} paddingX={5}>
          <GenreList
            selectedGenreId={gameQuery.genres}
            onSelectGenre={(genres) =>
              setGameQuery({ ...gameQuery, genres: genres.id })
            }
          />
        </GridItem>
      </Show>
      <GridItem area={'main'}>
        <Box paddingLeft={2}>
          <GameHeading gameQuery={gameQuery} />
          <Flex marginBottom={5}>
            <Box marginRight={5}>
              <PlatformSelector
                selectedPlatformId={gameQuery.parent_platforms}
                onSelectPlatform={(platform) =>
                  setGameQuery({ ...gameQuery, parent_platforms: platform?.id })
                }
              />
            </Box>
            <SortSelector
              selectedSortOrder={gameQuery.ordering}
              onSelectSortOrder={(sortOrder) =>
                setGameQuery({ ...gameQuery, ordering: sortOrder })
              }
            />
          </Flex>
        </Box>
        <GamesGrid gameQuery={gameQuery} />
      </GridItem>
    </Grid>
  );
}

export default App;
