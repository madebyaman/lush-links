import { Avatar, Box, Flex, Heading, Link } from '@chakra-ui/react';
import React, { useEffect } from 'react';

import { useAuth } from '@/lib/auth';
import PrimaryButton from './primary-button';

const DashboardShell = ({
  title,
  children,
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  const user = useAuth();

  useEffect(() => {
    if (!user?.loading && !user?.user) {
      window.location.href = '/';
    }
  }, [user?.loading, user?.user]);

  return (
    <Box backgroundColor="gray.100" minH="100vh" w="full">
      <Flex backgroundColor="white" mb={16} w="full">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          pt={4}
          pb={4}
          maxW="1250px"
          margin="0 auto"
          w="full"
          px={8}
        >
          <Flex>
            <Link
              href={`/dashboard`}
              borderRadius={'md'}
              p="2"
              _hover={{ bg: 'gray.100', textDecoration: 'none' }}
              mr="4"
            >
              Dashboard
            </Link>
            <Link
              borderRadius={'md'}
              p="2"
              _hover={{ bg: 'gray.100', textDecoration: 'none' }}
              mr="4"
              href="/edit"
            >
              Edit
            </Link>
            <Link
              borderRadius={'md'}
              p="2"
              _hover={{ bg: 'gray.100', textDecoration: 'none' }}
              mr="4"
              href={`/${user?.user?.username}`}
            >
              View Link Page
            </Link>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            <Link
              href="/profile"
              p="1"
              borderRadius={'full'}
              _hover={{ backgroundColor: 'gray.300' }}
            >
              <Avatar size="sm" src={user?.user?.photoUrl ?? undefined} />
            </Link>
          </Flex>
        </Flex>
      </Flex>
      <Flex margin="0 auto" direction={'column'} maxW="1250px" px={8}>
        <Flex
          flexDirection={['column', 'row']}
          mb="8"
          gap="2"
          justifyContent={title ? 'center' : 'space-between'}
        >
          <Heading>{title ? title : 'My Lush Link'}</Heading>
          {!title && (
            <PrimaryButton
              as="a"
              href="/edit"
              backgroundColor={'gray.700'}
              _hover={{ bgColor: 'gray.600' }}
            >
              + Edit lush link
            </PrimaryButton>
          )}
        </Flex>

        {children}
      </Flex>
    </Box>
  );
};

export default DashboardShell;
