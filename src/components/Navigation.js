// src/components/Navigation.js
import React from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import { Link as ScrollLink } from 'react-scroll';

const Navigation = () => {
  return (
    <Box position="fixed" top={0} left={0} right={0} zIndex={10} bg="rgba(0,0,0,0.7)" backdropFilter="blur(5px)">
      <Flex maxW="container.xl" mx="auto" px={4} py={4} align="center" justify="space-between">
        <Flex>
          {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
            <ScrollLink
              key={item}
              to={item.toLowerCase()}
              smooth={true}
              duration={500}
              offset={-70} // Adjust this value based on your navbar height
            >
              <Button
                variant="ghost"
                color="white"
                mx={2}
                _hover={{ bg: 'whiteAlpha.200' }}
              >
                {item}
              </Button>
            </ScrollLink>
          ))}
        </Flex>
        <Button
          as="a"
          href="https://drive.google.com/file/d/1uatgc7D03vRNDYkLpk8TRhr8Jnot4bcU/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          colorScheme="brand"
        >
          Resume
        </Button>
      </Flex>
    </Box>
  );
};

export default Navigation;