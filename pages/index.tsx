import Head from 'next/head';
import { useAuth } from '../lib/auth';
import { Box, Flex, Text } from '@chakra-ui/react';
import PrimaryButton from '@/components/primary-button';
import SecondaryButton from '@/components/secondary-button';
import { FcGoogle } from 'react-icons/fc';

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
          <PrimaryButton as="a" href="/dashboard">
            View Dashboard
          </PrimaryButton>
        ) : (
          <Flex direction={['column', 'row']}>
            <SecondaryButton
              leftIcon={<FcGoogle />}
              onClick={() => auth?.signinWithGoogle()}
              mt={4}
            >
              Continue with Google
            </SecondaryButton>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
