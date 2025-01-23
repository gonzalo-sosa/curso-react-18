import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
};

const theme = extendTheme({
  config,
  colors: {
    gray: {
      900: '#111',
      800: '#121212',
      700: '#202020',
      600: '#6c6c6c',
      500: '#898989',
      400: '#0a0a0a',
      300: '#b3b3b3',
      200: '#d3d3d3',
      100: '#ededed',
      50: '#f9f9f9',
    },
  },
});

export default theme;
