import { Grid, GridItem, Show, Spinner, Text } from "@chakra-ui/react";
import NavBar from "./components/ui/navbar";
import GamesGrid from "./components/games-grid";
import useGames from "./hooks/useGames";
function App() {
  const { games, error, isLoading, setGames, setError } = useGames();

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
    >
      <GridItem area={"nav"}>
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem area={"aside"}>Aside</GridItem>
      </Show>
      <GridItem area={"main"}>
        {isLoading && <Spinner />}
        {error && <Text>{error}</Text>}
        <GamesGrid games={games} />
      </GridItem>
    </Grid>
  );
}

export default App;
