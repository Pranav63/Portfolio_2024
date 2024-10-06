// src/components/layout/MainLayout.js
import React, { useEffect } from 'react';
import { Box, VStack, ChakraProvider } from '@chakra-ui/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import AnimatedBackground from '../AnimatedBackground';
import Navigation from '../Navigation';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Experience from '../sections/Experience';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';
import ScrollToTopButton from '../ScrollToTopButton';
import SubtleLoader from '../SubtleLoader';
import CustomCursor from '../CustomCursor';
import PageTransition from '../PageTransition';
import useSmoothScroll from '../../hooks/useSmoothScroll';
import useDynamicTheme from '../../hooks/useDynamicTheme';

gsap.registerPlugin(ScrollTrigger);

const MainLayout = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  useSmoothScroll();
  const { colorMode, accentColor } = useDynamicTheme();

  useEffect(() => {
    const sections = document.querySelectorAll('section');

    sections.forEach((section, index) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom-=10%',
            end: 'top center',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  if (isLoading) {
    return <SubtleLoader />;
  }
  return (
    <Box position="relative">
      <AnimatedBackground />
      <Navigation />
      <Hero id="hero" />
      <VStack spacing={10} align="stretch">
        <About id="about" />
        <Skills id="skills" />
        <Experience id="experience" />
        <Projects id="projects" />
        <Contact id="contact" />
      </VStack>
      <ScrollToTopButton />
    </Box>
  );
};

export default MainLayout;