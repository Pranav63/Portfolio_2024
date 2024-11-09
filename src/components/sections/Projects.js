import React from 'react';
import { Box, Heading, Text, Container, SimpleGrid, VStack, Image, Link, Tag, Stack, HStack } from '@chakra-ui/react';

const ProjectCard = ({ title, description, imageUrl, projectUrl, tags, highlights }) => (
  <Box 
    borderWidth={1} 
    borderRadius="lg" 
    overflow="hidden"
    transition="all 0.3s"
    _hover={{ 
      transform: 'translateY(-5px)',
      boxShadow: 'xl'
    }}
  >
    <Image 
      src={imageUrl} 
      alt={title} 
      height="200px"
      width="100%"
      objectFit="cover"
    />
    <Box p={6}>
      <Heading as="h3" size="md" mb={2}>{title}</Heading>
      <Text mb={4} color="gray.600">{description}</Text>
      
      {/* Tags */}
      <Stack direction="row" spacing={2} mb={4} flexWrap="wrap">
        {tags?.map((tag, index) => (
          <Tag 
            key={index} 
            size="sm" 
            colorScheme="purple" 
            variant="subtle"
            mt={1}
          >
            {tag}
          </Tag>
        ))}
      </Stack>

      {/* Highlights */}
      {highlights && (
        <VStack align="start" spacing={2} mb={4}>
          {highlights.map((highlight, index) => (
            <HStack key={index} spacing={2} color="gray.600">
              <Text>•</Text>
              <Text fontSize="sm">{highlight}</Text>
            </HStack>
          ))}
        </VStack>
      )}

      <Link 
        href={projectUrl} 
        color="brand.500" 
        fontWeight="bold"
        _hover={{
          textDecoration: 'none',
          color: 'brand.600'
        }}
      >
        View Project
      </Link>
    </Box>
  </Box>
);

const Projects = () => {
  const projects = [
    {
      title: "Production Cycle Time Prediction",
      description: "ML model to predict & optimize manufacturing cycle times using XGBoost. Achieved 85% accuracy and deployed via FastAPI.",
      imageUrl: "/images/production_time.gif", 
      projectUrl: "https://github.com/Pranav63/production_cycle_time_prediction",
      tags: ["Python", "XGBoost", "FastAPI", "Docker"],
      highlights: [
        "Reduced cycle time variations by 30%",
        "Deployed model using FastAPI & Docker",
        "Implemented real-time predictions"
      ]
    },
    {
      title: "GAN's Face Generation",
      description: "Face profile completion using Generative Adversarial Networks with advanced image synthesis.",
      imageUrl: "/images/gan.gif",
      projectUrl: "https://github.com/Pranav63/Generative-adverserial-Networks-Face-profile-completion-",
      tags: ["PyTorch", "GANs", "Computer Vision"],
      highlights: [
        "Implemented custom GAN architecture",
        "Achieved high-quality face completion",
        "Real-time processing capabilities"
      ]
    },
    {
      title: "RL Simulated Car Race",
      description: "Self-driving car simulation using Reinforcement Learning with dynamic environment adaptation.",
      imageUrl: "/images/carrace.gif",
      projectUrl: "https://github.com/Pranav63/SelfDrivingCar",
      tags: ["Python", "RL", "PyTorch"],
      highlights: [
        "Custom reward function design",
        "Real-time performance optimization",
        "Dynamic obstacle avoidance"
      ]
    }
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