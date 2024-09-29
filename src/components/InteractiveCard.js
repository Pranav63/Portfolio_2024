import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const InteractiveCard = ({ children, ...props }) => {
  const bg = useColorModeValue('white', 'gray.800');
  const shadow = useColorModeValue('lg', 'dark-lg');

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Box
        bg={bg}
        boxShadow={shadow}
        borderRadius="lg"
        p={6}
        transition="all 0.3s"
        _hover={{ boxShadow: '2xl' }}
        {...props}
      >
        {children}
      </Box>
    </motion.div>
  );
};

export default InteractiveCard;