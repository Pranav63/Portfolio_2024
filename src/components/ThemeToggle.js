// src/components/ThemeToggle.js
import React from 'react';
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('black', 'white');

  return (
    <IconButton
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      variant="solid"
      aria-label="Toggle theme"
      backgroundColor={bgColor}
      color={color}
      size="lg"
      isRound
      _hover={{ 
        backgroundColor: useColorModeValue('gray.200', 'gray.600') 
      }}
    />
  );
};

export default ThemeToggle;