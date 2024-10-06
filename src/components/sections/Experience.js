import React, { useState } from 'react';
import { Box, Heading, Text, Container, VStack, HStack, Image, Button, Flex, useColorModeValue, ScaleFade } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const MotionBox = motion(Box);

const ExperienceCard = ({ experience, isActive, onClick }) => {
  const cardBg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)');
  const textColor = useColorModeValue('gray.800', 'white');
  const hoverBg = useColorModeValue('rgba(255, 255, 255, 0.9)', 'rgba(26, 32, 44, 0.9)');

  return (
    <MotionBox
      layout
      onClick={onClick}
      cursor="pointer"
      bg={cardBg}
      p={6}
      borderRadius="lg"
      boxShadow="lg"
      backdropFilter="blur(10px)"
      color={textColor}
      whileHover={{ 
        scale: 1.05,
        backgroundColor: hoverBg,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      position="relative"
    >
      <HStack spacing={4}>
        <Image src={experience.logo} alt={experience.company} boxSize="50px" objectFit="contain" />
        <VStack align="start" spacing={1}>
          <Heading as="h3" size="md" color="brand.500">{experience.title}</Heading>
          <Text fontWeight="bold">{experience.company}</Text>
          <Text fontSize="sm">{experience.period}</Text>
        </VStack>
      </HStack>
      <ScaleFade in={isActive} initialScale={0.9}>
        {isActive && (
          <Box mt={4}>
            <Text mb={2}>{experience.description}</Text>
            <VStack align="start" spacing={2}>
              {experience.achievements.map((achievement, index) => (
                <Text key={index} fontSize="sm">• {achievement}</Text>
              ))}
            </VStack>
          </Box>
        )}
      </ScaleFade>
      <MotionBox
        position="absolute"
        bottom={2}
        right={2}
        animate={{ y: isActive ? 0 : [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <FaChevronDown color={isActive ? 'transparent' : 'brand.500'} />
      </MotionBox>
    </MotionBox>
  );
};
const Experience = () => {
  const [activeExperience, setActiveExperience] = useState(null);
  const headingColor = useColorModeValue('brand.600', 'brand.300');

  const experiences = [
    {
      title: "Senior Data Scientist",
      company: "HPE",
      period: "Aug 2024 - Present",
      description: "Leading AI initiatives and developing advanced machine learning models.",
      achievements: [
        "Developed predictive models for factory ship dates, improving supply chain efficiency.",
        "Led project on production cycle time prediction, optimizing manufacturing processes.",
        "Designed and implemented 'ChatHPE', an in-house chatbot solution using GPT-4.0."
      ],
      logo: "/images/hpe.jpg"
    },
    {
      title: "Data Scientist",
      company: "Micron",
      period: "Jan 2022 - Aug 2024",
      description: "Developed machine learning models for semiconductor manufacturing optimization.",
      achievements: [
        "Created master data solution, saving 80% of manual data input and maintenance time.",
        "Optimized fab status using RL agents, minimizing queue time by 50%.",
        "Implemented predictive maintenance models, reducing downtime by 30%."
      ],
      logo: "/images/Micron.jpeg"
    },
    {
      title: "Junior Data Scientist",
      company: "Dentsu",
      period: "2020 - 2022",
      description: "Created data analytics solutions and reporting dashboards for marketing campaigns.",
      achievements: [
        "Reduced post-campaign analysis time by 50% through automated dashboard creation.",
        "Developed performance predictor, saving 20% cost on media planning and activation.",
        "Engineered data pipelines, saving $4k/month on third-party data ingestion costs."
      ],
      logo: "/images/denstu.jpg"
    },
  ];

  
  return (
    <Box id="experience" minHeight="100vh" display="flex" alignItems="center" py={20}>
      <Container maxW="container.xl">
        <VStack spacing={12} align="stretch">
          <Heading 
            as="h2" 
            size="2xl" 
            color={headingColor}
            textAlign="center"
            mb={10}
          >
            Professional Journey
          </Heading>
          <Text fontSize="lg" textAlign="center" mb={6}>
            Click on each card to explore my professional experiences in detail.
          </Text>
          <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="stretch" gap={6}>
            <VStack flex={1} spacing={6} align="stretch">
              {experiences.map((exp, index) => (
                <ExperienceCard
                  key={index}
                  experience={exp}
                  isActive={activeExperience === index}
                  onClick={() => setActiveExperience(activeExperience === index ? null : index)}
                />
              ))}
            </VStack>
            <Box flex={1} position="relative">
              <AnimatePresence>
                {activeExperience !== null && (
                  <MotionBox
                    key={activeExperience}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    position="sticky"
                    top="100px"
                  >
                    <Image
                      src={`/images/experience_${activeExperience + 1}.gif`}
                      alt={experiences[activeExperience].company}
                      borderRadius="lg"
                      boxShadow="2xl"
                    />
                    <Text mt={4} fontSize="sm" fontStyle="italic" textAlign="center">
                      {experiences[activeExperience].company}
                    </Text>
                  </MotionBox>
                )}
              </AnimatePresence>
            </Box>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
};

export default Experience;