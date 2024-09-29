import React from 'react';
import { Box, Heading, Text, Container, VStack, HStack, Image, Flex, List, ListItem, ListIcon } from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';

const ExperienceItem = ({ title, company, period, description, achievements, logo }) => (
  <Box borderWidth="1px" borderRadius="lg" p={6} mb={6} boxShadow="md">
    <HStack spacing={4} align="flex-start">
      <Box flexShrink={0}>
        <Image src={logo} alt={company} boxSize="50px" objectFit="contain" />
      </Box>
      <VStack align="start" spacing={2} w="100%">
        <Heading as="h3" size="md">{title}</Heading>
        <Text fontWeight="bold" color="brand.500">{company}</Text>
        <Text fontSize="sm" color="gray.500">{period}</Text>
        <Text>{description}</Text>
        <List spacing={2}>
          {achievements.map((achievement, index) => (
            <ListItem key={index}>
              <ListIcon as={MdCheckCircle} color="green.500" />
              {achievement}
            </ListItem>
          ))}
        </List>
      </VStack>
    </HStack>
  </Box>
);

const Experience = () => {
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
      logo: "/images/Denstu.png"
    },
  ];

  return (
    <Box id="experience" minHeight="100vh" display="flex" alignItems="center" py={20}>
      <Container maxW="container.xl">
        <VStack spacing={12} align="stretch">
          <Heading 
            as="h2" 
            size="2xl" 
            bgGradient="linear(to-r, brand.500, brand.300)" 
            bgClip="text"
            textAlign="center"
          >
            Professional Experience
          </Heading>
          {experiences.map((exp, index) => (
            <ExperienceItem key={index} {...exp} />
          ))}
        </VStack>
      </Container>
    </Box>
  );
};

export default Experience;