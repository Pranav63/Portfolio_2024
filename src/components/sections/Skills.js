// src/components/sections/Skills.js
import React, { useEffect, useRef } from 'react';
import { Box, Heading, Text, Container, SimpleGrid, Flex, VStack, Progress } from '@chakra-ui/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { FaPython, FaDatabase, FaChartBar, FaRobot, FaReact } from 'react-icons/fa';
import { SiTensorflow, SiPytorch, SiScikitlearn, SiTableau, SiGooglecloud } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const SkillBar = ({ icon: Icon, label, percentage }) => {
  const barRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      barRef.current,
      { width: 0 },
      {
        width: `${percentage}%`,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: barRef.current,
          start: 'top bottom-=100',
          end: 'bottom center',
          scrub: 1,
        },
      }
    );
  }, [percentage]);

  return (
    <Box mb={6}>
      <Flex align="center" mb={2}>
        <Icon size="24px" color="brand.500" />
        <Text ml={2} fontWeight="medium">{label}</Text>
      </Flex>
      <Progress 
        value={percentage} 
        size="sm" 
        colorScheme="brand" 
        borderRadius="full" 
        ref={barRef}
      />
    </Box>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);

  const skills = [
    { icon: FaPython, label: 'Python', percentage: 95 },
    { icon: FaDatabase, label: 'SQL', percentage: 90 },
    { icon: SiTensorflow, label: 'TensorFlow', percentage: 85 },
    { icon: SiPytorch, label: 'PyTorch', percentage: 80 },
    { icon: SiScikitlearn, label: 'Scikit-Learn', percentage: 90 },
    { icon: FaChartBar, label: 'Data Visualization', percentage: 85 },
    { icon: FaRobot, label: 'Machine Learning', percentage: 90 },
    { icon: SiTableau, label: 'Tableau', percentage: 75 },
    { icon: SiGooglecloud, label: 'Google Cloud', percentage: 80 },
    { icon: FaReact, label: 'React', percentage: 70 },
  ];

  return (
    <Box id="skills" minHeight="100vh" display="flex" alignItems="center" py={20}>
      <Container maxW="container.xl">
        <VStack spacing={12} align="stretch">
          <Heading 
            as="h2" 
            size="2xl" 
            bgGradient="linear(to-r, brand.500, brand.300)" 
            bgClip="text"
            textAlign="center"
          >
            Skills & Expertise
          </Heading>
          <Text fontSize="xl" textAlign="center" mb={8}>
            Here's a snapshot of my technical proficiencies and areas of expertise:
          </Text>
          <SimpleGrid columns={[1, null, 2]} spacing={8}>
            {skills.map((skill, index) => (
              <SkillBar key={index} icon={skill.icon} label={skill.label} percentage={skill.percentage} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Skills;