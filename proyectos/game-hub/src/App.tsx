import { Button, Show } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
    >
      <GridItem area={"nav"} bg={"blue"}>
        Nav
      </GridItem>
      <Show above="lg">
        <GridItem area={"aside"} bg={"red"}>
          Aside
        </GridItem>
      </Show>
      <GridItem area={"main"} bg={"green"}>
        Main
      </GridItem>
    </Grid>
  );
}

export default App;