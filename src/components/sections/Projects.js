// src/components/sections/Projects.js
import React from 'react';
import { Box, Heading, Text, Container, SimpleGrid, VStack, Image, Link } from '@chakra-ui/react';

const ProjectCard = ({ title, description, imageUrl, projectUrl }) => (
  <Box borderWidth={1} borderRadius="lg" overflow="hidden">
    <Image src={imageUrl} alt={title} />
    <Box p={6}>
      <Heading as="h3" size="md" mb={2}>{title}</Heading>
      <Text mb={4}>{description}</Text>
      <Link href={projectUrl} color="brand.500" fontWeight="bold">
        View Project
      </Link>
    </Box>
  </Box>
);

const Projects = () => {
  const projects = [
    {
      title: "GAN's Face Generation",
      description: "Face profile completion using Generative Adversarial Networks.",
      imageUrl: "/images/gan.gif",
      projectUrl: "https://github.com/Pranav63/Generative-adverserial-Networks-Face-profile-completion-"
    },
    {
      title: "RL Simulated Car Race",
      description: "Self-driving car simulation using Reinforcement Learning.",
      imageUrl: "/images/carrace.gif",
      projectUrl: "https://github.com/Pranav63/SelfDrivingCar"
    },
    // Add more projects as needed
  ];

  return (
    <Box id="projects" minHeight="100vh" display="flex" alignItems="center" py={20}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Heading 
            as="h2" 
            size="2xl" 
            bgGradient="linear(to-r, brand.500, brand.300)" 
            bgClip="text"
            textAlign="center"
          >
            Projects
          </Heading>
          <Text fontSize="xl" textAlign="center" mb={8}>
            Here are some of my recent projects:
          </Text>
          <SimpleGrid columns={[1, null, 3]} spacing={8}>
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Projects;