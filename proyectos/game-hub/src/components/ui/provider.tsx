import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider>{children}</ThemeProvider>
    </ChakraProvider>
  );
};

export default Provider;
