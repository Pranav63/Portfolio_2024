import React, { useState, useRef, useEffect } from 'react';
import { Box, Heading, Text, Container, VStack, FormControl, FormLabel, Input, Textarea, Button, useToast, Flex, Icon, useColorModeValue, ScaleFade, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const MotionBox = motion(Box);

const AnimatedSphere = () => {
  const meshRef = useRef();
  const clock = new THREE.Clock();

  useFrame(() => {
    if (meshRef.current) {
      const elapsedTime = clock.getElapsedTime();
      meshRef.current.rotation.x = elapsedTime * 0.5;
      meshRef.current.rotation.y = elapsedTime * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} visible args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        color={useColorModeValue("#8855FF", "#BB99FF")}
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0}
      />
    </Sphere>
  );
};

const ContactMethod = ({ icon, text, href, color }) => (
  <Button
    as="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    leftIcon={<Icon as={icon} boxSize={6} />}
    variant="ghost"
    size="lg"
    justifyContent="flex-start"
    fontWeight="medium"
    color={useColorModeValue(`${color}.600`, `${color}.200`)}
    _hover={{
      bg: useColorModeValue(`${color}.50`, `${color}.900`),
      transform: 'translateY(-2px)',
    }}
    transition="all 0.3s"
  >
    {text}
  </Button>
);

const SuccessModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        as={motion.div}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ModalCloseButton />
        <ModalBody textAlign="center" py={10}>
          <VStack spacing={4}>
            <Icon as={FaCheckCircle} w={16} h={16} color="green.500" />
            <Heading size="lg">Message Sent Successfully!</Heading>
            <Text>Thank you for reaching out. I'll get back to you soon.</Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();
  const controls = useAnimation();

  // Use transparent background to blend with the main layout
  const bgColor = 'transparent';
  const textColor = useColorModeValue('gray.200', 'gray.200');
  const headingColor = useColorModeValue('brand.600', 'brand.300');
  const cardBg = useColorModeValue('white', 'gray.800');
  const inputColor = useColorModeValue('gray.800', 'white');
  const inputBg = useColorModeValue('white', 'gray.700');
  const inputBorder = useColorModeValue('gray.300', 'gray.600');
  const inputPlaceholder = useColorModeValue('gray.400', 'gray.400');
  const inputStyles = {
    color: inputColor,
    bg: inputBg,
    borderColor: inputBorder,
    _placeholder: { color: inputPlaceholder },
    _hover: {
      borderColor: useColorModeValue('gray.400', 'gray.500'),
    },
    _focus: {
      borderColor: 'brand.500',
      boxShadow: `0 0 0 1px ${useColorModeValue('brand.500', 'brand.400')}`,
    },
  };
  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      setIsModalOpen(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box id="contact" minHeight="100vh" bg={bgColor} position="relative" overflow="hidden">
      <Box position="absolute" top={0} left={0} width="100%" height="100%" opacity={0.1}>
        <Canvas>
          <AnimatedSphere />
        </Canvas>
      </Box>
      <Container maxW="container.xl" py={20} position="relative">
        <VStack spacing={12} align="stretch">
          <MotionBox
            initial={{ opacity: 0, y: -50 }}
            animate={controls}
            transition={{ duration: 0.5 }}
          >
            <Heading
              as="h2"
              size="2xl"
              color={headingColor}
              textAlign="center"
              fontWeight="bold"
            >
              Let's Create Something Extraordinary
            </Heading>
          </MotionBox>
          <Flex direction={{ base: 'column', lg: 'row' }} spacing={10} align="center">
            <VStack flex={1} spacing={6} align="stretch" pr={{ base: 0, lg: 10 }}>
              <Text fontSize="xl" color={textColor} textAlign="center">
                Ready to embark on a journey of innovation? Reach out through these channels:
              </Text>
              <ContactMethod icon={FaEnvelope} text="Shoot me an email" href="mailto:pranav2vis@gmail.com" color="blue" />
              <ContactMethod icon={FaLinkedin} text="Connect on LinkedIn" href="https://www.linkedin.com/in/pranavarora63/" color="purple" />
              <ContactMethod icon={FaGithub} text="Explore my GitHub" href="https://github.com/Pranav63" color="green" />
            </VStack>
            <MotionBox
              flex={1}
              bg={cardBg}
              p={8}
              borderRadius="2xl"
              boxShadow="xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={controls}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
               <ScaleFade initialScale={0.9} in={true}>
                <VStack as="form" onSubmit={handleSubmit} spacing={6}>
                  <FormControl isRequired>
                    <FormLabel color={textColor}>Name</FormLabel>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name"
                      {...inputStyles}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel color={textColor}>Email</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your Email"
                      {...inputStyles}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel color={textColor}>Message</FormLabel>
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your Message"
                      minHeight="150px"
                      {...inputStyles}
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    colorScheme="brand"
                    size="lg"
                    width="full"
                    isLoading={isSubmitting}
                    loadingText="Sending..."
                    leftIcon={<FaPaperPlane />}
                    _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                    transition="all 0.3s"
                  >
                    Send Message
                  </Button>
                </VStack>
              </ScaleFade>
            </MotionBox>
          </Flex>
        </VStack>
      </Container>
      <AnimatePresence>
        {isModalOpen && (
          <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Contact;