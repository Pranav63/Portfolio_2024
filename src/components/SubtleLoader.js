import React from 'react';
import { Box, Spinner, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const SubtleLoader = () => {
  const spinnerColor = useColorModeValue('brand.500', 'brand.200');

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)')}
      zIndex={9999}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color={spinnerColor}
          size="xl"
        />
      </motion.div>
    </Box>
  );
};

export default SubtleLoader;