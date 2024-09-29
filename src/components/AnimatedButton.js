import React from 'react';
import { Button, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const AnimatedButton = ({ children, ...props }) => {
  const bgColor = useColorModeValue('brand.500', 'brand.200');
  const textColor = useColorModeValue('white', 'gray.800');

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        bg={bgColor}
        color={textColor}
        _hover={{ bg: useColorModeValue('brand.600', 'brand.300') }}
        _active={{ bg: useColorModeValue('brand.700', 'brand.400') }}
        transition="all 0.2s"
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
};

export default AnimatedButton;