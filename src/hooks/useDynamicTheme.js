// src/hooks/useDynamicTheme.js
import { useState, useEffect } from 'react';
import { useColorMode } from '@chakra-ui/react';

const useDynamicTheme = () => {
  const { colorMode, setColorMode } = useColorMode();
  const [accentColor, setAccentColor] = useState('brand.500');

  useEffect(() => {
    const updateTheme = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 6 && currentHour < 18) {
        setColorMode('light');
        setAccentColor('brand.500');
      } else {
        setColorMode('dark');
        setAccentColor('brand.200');
      }
    };

    updateTheme();
    const interval = setInterval(updateTheme, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [setColorMode]);

  return { colorMode, accentColor };
};

export default useDynamicTheme;