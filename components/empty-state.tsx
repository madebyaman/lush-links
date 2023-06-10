import React from 'react';
import { Box, Heading, Stack, Text, Button } from '@chakra-ui/react';

const EmptyState = () => {
  return (
    <Box backgroundColor="white" mt="8" borderRadius={'md'} boxShadow="lg">
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={2}
        p={16}
        borderRadius={8}
      >
        <Heading size="lg">You haven’t created your lush link page.</Heading>
        <Text>Welcome 👋🏼 Let’s get started.</Text>
        <Button
          as="a"
          href="/edit"
          maxWidth="200px"
          backgroundColor="gray.900"
          color="white"
          fontWeight="medium"
          mt={4}
          _hover={{ bg: 'gray.700' }}
          _active={{
            bg: 'gray.800',
            transform: 'scale(0.95)',
          }}
        >
          Add Your Lush Link Page
        </Button>
      </Stack>
    </Box>
  );
};

export default EmptyState;
