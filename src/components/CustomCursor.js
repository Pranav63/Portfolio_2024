// src/components/CustomCursor.js
import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const mouseEnter = () => setCursorVariant('hover');
    const mouseLeave = () => setCursorVariant('default');

    window.addEventListener('mousemove', mouseMove);

    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', mouseEnter);
      el.addEventListener('mouseleave', mouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', mouseEnter);
        el.removeEventListener('mouseleave', mouseLeave);
      });
    };
  }, []);

  const variants = {
    default: { height: 12, width: 12 },
    hover: { height: 24, width: 24, backgroundColor: 'rgba(255, 255, 255, 0.3)' },
  };

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: mousePosition.x - 6,
        top: mousePosition.y - 6,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
      animate={cursorVariant}
      variants={variants}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    >
      <Box
        borderRadius="full"
        bg="brand.500"
        opacity={0.5}
        h="100%"
        w="100%"
      />
    </motion.div>
  );
};

export default CustomCursor;