// src/components/sections/About.js
import React, { useEffect, useRef } from 'react';
import { Box, Heading, Text, Container, Flex, Image, VStack, HStack, Icon, Divider, useColorModeValue } from '@chakra-ui/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { FaLaptopCode, FaChartLine, FaRobot, FaCamera, FaFilm, FaChessKnight, FaGraduationCap } from 'react-icons/fa';

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

const EducationItem = ({ degree, institution, year }) => (
  <HStack spacing={4} align="flex-start">
    <Icon as={FaGraduationCap} boxSize={6} color="brand.500" />
    <VStack align="start" spacing={0}>
      <Text fontWeight="bold">{degree}</Text>
      <Text>{institution}</Text>
      <Text fontSize="sm" color="gray.500">{year}</Text>
    </VStack>
  </HStack>
);

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    gsap.fromTo(
      image,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top center+=100',
          end: 'center center',
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      content,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
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
          <Box flex={1} mr={{ base: 0, md: 10 }} mb={{ base: 10, md: 0 }} ref={imageRef}>
            <Image
              src="/images/pranav_pho.png"
              alt="Pranav Arora"
              borderRadius="full"
              boxSize={{ base: '200px', md: '300px' }}
              objectFit="cover"
              boxShadow="lg"
            />
          </Box>
          <VStack flex={1} align="start" spacing={6} ref={contentRef}>
            <Heading as="h2" size="2xl" bgGradient="linear(to-r, brand.500, brand.300)" bgClip="text">
              About Me
            </Heading>
            <Text fontSize="lg" fontWeight="medium">
              Passionate Data Scientist and AI Enthusiast based in Singapore, with over 5 years of experience in turning complex data into actionable insights.
            </Text>
            <Heading as="h3" size="md" color="brand.400">Key Skills:</Heading>
            <Flex wrap="wrap" gap={4}>
              <HighlightBox icon={FaLaptopCode} text="Machine Learning" />
              <HighlightBox icon={FaChartLine} text="Data Analytics" />
              <HighlightBox icon={FaRobot} text="Artificial Intelligence" />
            </Flex>
            <Heading as="h3" size="md" color="brand.400">When I'm not coding:</Heading>
            <Flex wrap="wrap" gap={4}>
              <HighlightBox icon={FaCamera} text="Photography" />
              <HighlightBox icon={FaFilm} text="Marvel Movies" />
              <HighlightBox icon={FaChessKnight} text="Quizzing" />
            </Flex>
            <Divider my={4} />
            <Heading as="h3" size="md" color="brand.400">Education:</Heading>
            <VStack align="start" spacing={4}>
              <EducationItem 
                degree="Masters in Artificial Intelligence"
                institution="Singapore Management University"
                year="2018-2020"
              />
              <EducationItem 
                degree="Bachelors in Computer Science"
                institution="University of Petroleum and Energy Studies"
                year="2014-2018"
              />
              <EducationItem 
                degree="HBX Online spl. Business Analytics"
                institution="Harvard Business School"
                year="2020"
              />
            </VStack>
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default About;