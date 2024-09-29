import React from 'react';
import { Box, Flex, Button, useBreakpointValue, HStack } from '@chakra-ui/react';
import { Link as ScrollLink } from 'react-scroll';
import ThemeToggle from './ThemeToggle';

const Navigation = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const navItems = ['About', 'Skills', 'Experience', 'Projects', 'Contact'];

  return (
    <Box 
      position="fixed" 
      top={0} 
      left={0} 
      right={0} 
      zIndex={10} 
      bg="rgba(0,0,0,0.7)" 
      backdropFilter="blur(5px)"
    >
      <Flex 
        maxW="container.xl" 
        mx="auto" 
        px={4} 
        py={4} 
        align="center" 
        justify="space-between"
        flexDir={isMobile ? "column" : "row"}
      >
        <Flex flexWrap="wrap" justify={isMobile ? "center" : "flex-start"} mb={isMobile ? 4 : 0}>
          {navItems.map((item) => (
            <ScrollLink
              key={item}
              to={item.toLowerCase()}
              smooth={true}
              duration={500}
              offset={-70}
            >
              <Button
                variant="ghost"
                color="white"
                mx={1}
                my={1}
                size={isMobile ? "sm" : "md"}
                _hover={{ bg: 'whiteAlpha.200' }}
              >
                {item}
              </Button>
            </ScrollLink>
          ))}
        </Flex>
        <HStack spacing={2}>
          <Button
            as="a"
            href="https://drive.google.com/file/d/1uatgc7D03vRNDYkLpk8TRhr8Jnot4bcU/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            colorScheme="brand"
            size={isMobile ? "sm" : "md"}
          >
            Resume
          </Button>
          <ThemeToggle />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navigation;