import Head from 'next/head';
import { useAuth } from '../lib/auth';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { FiLogIn } from 'react-icons/fi';

export default function Index() {
  const auth = useAuth();

  return (
    <Box bg="gray.100" py={16} px={4}>
      <Flex as="main" direction="column" maxW="700px" margin="0 auto">
        <Head>
          <title>Welcome to Lush Links</title>
        </Head>
        <Text mb={4} fontSize="lg" py={4}>
          <Text as="span" fontWeight="bold" display="inline">
            Lush Links
          </Text>
          {` is the easiest way to create your personal link site. Try it out by signin with google. After that you can create your first lush link page.`}
        </Text>
        {auth?.user ? (
          <Button
            as="a"
            href="/dashboard"
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            mt={4}
            maxW="200px"
            _hover={{ bg: 'gray.700' }}
            _active={{
              bg: 'gray.800',
              transform: 'scale(0.95)',
            }}
          >
            View Dashboard
          </Button>
        ) : (
          <Flex direction={['column', 'row']}>
            <Button
              onClick={() => auth?.signinWithGoogle()}
              backgroundColor="white"
              color="gray.900"
              variant="outline"
              fontWeight="medium"
              leftIcon={<FiLogIn />}
              mt={4}
              _hover={{ bg: 'gray.100' }}
              _active={{
                bg: 'gray.100',
                transform: 'scale(0.95)',
              }}
            >
              Continue with Google
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
