import React, { useEffect, useRef } from 'react';
import { Box, Heading, Text, Container, Flex, Image, VStack, HStack, Icon, Divider, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { FaLaptopCode, FaChartLine, FaRobot, FaCamera, FaFilm, FaChessKnight } from 'react-icons/fa';
import { MdSchool, MdWorkspaces, MdCastForEducation } from 'react-icons/md';

gsap.registerPlugin(ScrollTrigger);

const HighlightBox = ({ icon, text }) => (
  <HStack 
    bg="whiteAlpha.200" 
    p={3} 
    borderRadius="md" 
    boxShadow="md" 
    _hover={{ bg: "whiteAlpha.300", transform: "translateY(-5px)" }}
    transition="all 0.3s"
  >
    <Icon as={icon} boxSize={6} color="brand.500" />
    <Text fontWeight="medium">{text}</Text>
  </HStack>
);

const EducationItem = ({ icon, degree, institution, year }) => (
  <HStack spacing={4} align="flex-start">
    <Icon as={icon} boxSize={6} color="brand.500" />
    <VStack align="start" spacing={0}>
      <Text fontWeight="bold">{degree}</Text>
      <Text>{institution}</Text>
      <Text fontSize="sm" color="gray.500">{year}</Text>
    </VStack>
  </HStack>
);
const NetworkVisualization = () => {
  const nodes = [...Array(10)].map((_, i) => ({
    id: i,
    x: Math.random() * 280 + 10,
    y: Math.random() * 280 + 10,
  }));

  const edges = [...Array(15)].map(() => {
    const source = Math.floor(Math.random() * nodes.length);
    let target = Math.floor(Math.random() * nodes.length);
    while (target === source) {
      target = Math.floor(Math.random() * nodes.length);
    }
    return { source, target };
  });

  return (
    <svg width="100%" height="100%" viewBox="0 0 300 300">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00FFFF" />
          <stop offset="100%" stopColor="#FF00FF" />
        </linearGradient>
      </defs>
      {edges.map((edge, i) => (
        <motion.line
          key={`edge-${i}`}
          x1={nodes[edge.source].x}
          y1={nodes[edge.source].y}
          x2={nodes[edge.target].x}
          y2={nodes[edge.target].y}
          stroke="url(#gradient)"
          strokeWidth="1"
          strokeOpacity="0.6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
      ))}
      {nodes.map((node, i) => (
        <motion.circle
          key={`node-${i}`}
          cx={node.x}
          cy={node.y}
          r="4"
          fill="#FFFFFF"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
      ))}
    </svg>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;

    gsap.fromTo(
      content,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center+=100',
          end: 'center center',
          scrub: true,
        },
      }
    );
  }, []);

  const headerColor = useColorModeValue('gray.800', 'white');
  const subHeaderColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box ref={sectionRef} minHeight="100vh" display="flex" alignItems="center" py={20} id="about">
      <Container maxW="container.xl">
        <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between">
          <Box 
            flex={1} 
            mr={{ base: 0, md: 10 }} 
            mb={{ base: 10, md: 0 }} 
            width={{ base: "300px", md: "300px" }}
            height={{ base: "300px", md: "300px" }}
            bg="rgba(255, 255, 255, 0.05)"
            borderRadius="xl"
            overflow="hidden"
            boxShadow="xl"
          >
            <NetworkVisualization />
          </Box>
          <VStack flex={1} align="start" spacing={6} ref={contentRef}>
            <HStack spacing={4} align="center">
              <Image
                src="/images/pranav_pho.png"
                alt="Pranav Arora"
                borderRadius="full"
                boxSize="50px"
                objectFit="cover"
                border="2px solid"
                borderColor="brand.500"
              />
              <Heading as="h2" size="2xl" bgGradient="linear(to-r, brand.500, brand.300)" bgClip="text">
                About Me
              </Heading>
            </HStack>
            <Text fontSize="lg" fontWeight="medium">
              Passionate Data Scientist and AI Enthusiast based in Singapore, with over 5 years of experience in turning complex data into actionable insights.
            </Text>
            <VStack align="start" spacing={4} width="100%">
              <Heading as="h3" size="md" color="brand.400">Key Skills</Heading>
              <Flex wrap="wrap" gap={4}>
                <HighlightBox icon={FaLaptopCode} text="Machine Learning" />
                <HighlightBox icon={FaChartLine} text="Data Analytics" />
                <HighlightBox icon={FaRobot} text="Artificial Intelligence" />
              </Flex>
            </VStack>
            <VStack align="start" spacing={4} width="100%">
              <Heading as="h3" size="md" color="brand.400">When I'm not coding</Heading>
              <Flex wrap="wrap" gap={4}>
                <HighlightBox icon={FaCamera} text="Photography" />
                <HighlightBox icon={FaFilm} text="Marvel Movies" />
                <HighlightBox icon={FaChessKnight} text="Quizzing" />
              </Flex>
            </VStack>
            <Divider my={4} />
            <VStack align="start" spacing={4} width="100%">
              <Heading as="h3" size="md" color="brand.400">Education</Heading>
              <VStack align="start" spacing={4}>
                <EducationItem 
                  icon={MdSchool}
                  degree="Masters in Artificial Intelligence"
                  institution="Singapore Management University"
                  year="2018-2020"
                />
                <EducationItem 
                  icon={MdWorkspaces}
                  degree="Bachelors in Computer Science"
                  institution="University of Petroleum and Energy Studies"
                  year="2014-2018"
                />
                <EducationItem 
                  icon={MdCastForEducation}
                  degree="HBX Online spl. Business Analytics"
                  institution="Harvard Business School"
                  year="2020"
                />
              </VStack>
            </VStack>
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default About;