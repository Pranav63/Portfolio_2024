import React, { useState, useEffect } from 'react';
import { IconButton, useColorModeValue } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const buttonBg = useColorModeValue('brand.500', 'brand.200');
  const buttonColor = useColorModeValue('white', 'gray.800');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000
          }}
        >
          <IconButton
            onClick={scrollToTop}
            icon={<ArrowUpIcon />}
            bg={buttonBg}
            color={buttonColor}
            size="lg"
            isRound={true}
            _hover={{ bg: useColorModeValue('brand.600', 'brand.300') }}
            _active={{ bg: useColorModeValue('brand.700', 'brand.400') }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;