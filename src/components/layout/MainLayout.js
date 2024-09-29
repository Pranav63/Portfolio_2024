import React, { useEffect } from 'react';
import { Box, VStack } from '@chakra-ui/react';
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

gsap.registerPlugin(ScrollTrigger);

const MainLayout = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('section');

    sections.forEach((section, index) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom-=100',
            end: 'top center',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <Box position="relative">
      <AnimatedBackground />
      <Navigation />
      <Hero id="hero" />
      <VStack spacing={20} align="stretch">
        <About id="about" />
        <Skills id="skills" />
        <Experience id="experience" />
        <Projects id="projects" />
        <Contact id="contact" />
      </VStack>
    </Box>
  );
};

export default MainLayout;