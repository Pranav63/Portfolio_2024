import React, { useState, useEffect } from 'react';
import { Box, Flex, Button, useBreakpointValue, HStack, useColorModeValue } from '@chakra-ui/react';
import { Link as ScrollLink } from 'react-scroll';
import ThemeToggle from './ThemeToggle';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('');
  const isMobile = useBreakpointValue({ base: true, md: false });

  const navItems = [
    { name: 'About', color: 'pink.400' },
    { name: 'Skills', color: 'purple.400' },
    { name: 'Experience', color: 'blue.400' },
    { name: 'Projects', color: 'green.400' },
    { name: 'Contact', color: 'orange.400' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.name.toLowerCase());
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(currentSection || '');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box 
      position="fixed" 
      top={0} 
      left={0} 
      right={0} 
      zIndex={10} 
      bg="rgba(0,0,0,0.7)" 
      backdropFilter="blur(5px)"
      boxShadow="0 2px 10px rgba(0,0,0,0.1)"
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
              key={item.name}
              to={item.name.toLowerCase()}
              smooth={true}
              duration={500}
              offset={-70}
            >
              <Button
                variant="ghost"
                color={activeSection === item.name.toLowerCase() ? item.color : "white"}
                mx={1}
                my={1}
                size={isMobile ? "sm" : "md"}
                _hover={{ 
                  bg: useColorModeValue(`${item.color}Alpha.200`, `${item.color}Alpha.300`),
                  transform: 'translateY(-2px)'
                }}
                _active={{ bg: useColorModeValue(`${item.color}Alpha.300`, `${item.color}Alpha.400`) }}
                transition="all 0.2s"
                fontWeight={activeSection === item.name.toLowerCase() ? "bold" : "normal"}
                borderBottom={activeSection === item.name.toLowerCase() ? `2px solid ${item.color}` : "none"}
              >
                {item.name}
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