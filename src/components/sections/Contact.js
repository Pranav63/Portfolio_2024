// src/components/sections/Contact.js
import React, { useState } from 'react';
import { Box, Heading, Text, Container, VStack, FormControl, FormLabel, Input, Textarea, Button, useToast } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
        setTimeout(() => setIsSuccess(false), 5000); // Hide success message after 5 seconds
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
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
    <Box id="contact" minHeight="100vh" display="flex" alignItems="center" py={20}>
      <Container maxW="container.md">
        <VStack spacing={8} align="stretch">
          <Heading 
            as="h2" 
            size="2xl" 
            bgGradient="linear(to-r, brand.500, brand.300)" 
            bgClip="text"
            textAlign="center"
          >
            Get In Touch
          </Heading>
          <Text fontSize="xl" textAlign="center">
            Have a question or want to work together? Feel free to reach out!
          </Text>
          <AnimatePresence>
            {isSuccess && (
              <MotionBox
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                mb={4}
                p={4}
                bg="green.100"
                color="green.700"
                borderRadius="md"
                textAlign="center"
              >
                Your message has been sent successfully!
              </MotionBox>
            )}
          </AnimatePresence>
          <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Message</FormLabel>
                <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your Message" />
              </FormControl>
              <Button type="submit" colorScheme="brand" size="lg" width="full" isLoading={isSubmitting}>
                Send Message
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Contact;