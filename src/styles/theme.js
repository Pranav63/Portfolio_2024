import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: "'Space Grotesk', sans-serif",
    body: "'Inter', sans-serif",
  },
  colors: {
    brand: {
      50:  '#E0FEFF',
      100: '#B3FCFF',
      200: '#80F8FF',
      300: '#4DF4FF',
      400: '#26F0FF',
      500: '#00D4FF',
      600: '#00A8CC',
      700: '#007D99',
      800: '#005166',
      900: '#002633',
    },
  },
  styles: {
    global: {
      body: {
        bg: '#050A14',
        color: '#E2E8F0',
      },
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});

export default theme;
