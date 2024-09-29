// src/components/sections/Hero.js
import React, { useRef } from 'react';
import { Box, Heading, Text, VStack, Container } from '@chakra-ui/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

const AnimatedSphere = () => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Sphere visible args={[2.5, 100, 200]} scale={1} ref={meshRef}>
      <MeshDistortMaterial
        color="#8352FD"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.5}
        transparent
        opacity={0.8}
      />
    </Sphere>
  );
};

const Hero = () => {
  return (
    <Box 
      as="section"
      h="100vh" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      position="relative" 
      overflow="hidden"
      id="hero"
    >
      <Container maxW="container.xl" zIndex={2} position="relative">
        <VStack align="center" spacing={4}>
          <Heading 
            as="h1" 
            size="4xl"
            color="white"
            textShadow="2px 2px 4px rgba(0,0,0,0.5)"
          >
            Pranav Arora
          </Heading>
          <Text 
            fontSize="2xl" 
            fontWeight="medium"
            color="white"
            textShadow="1px 1px 2px rgba(0,0,0,0.5)"
            textAlign="center"
          >
            Data Scientist | AI Enthusiast | GenAI Engineer
          </Text>
        </VStack>
      </Container>
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={1}
      >
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <AnimatedSphere />
        </Canvas>
      </Box>
    </Box>
  );
};

export default Hero;