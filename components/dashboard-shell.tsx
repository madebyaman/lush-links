import React from 'react';
import {
  Box,
  Heading,
  Button,
  Flex,
  Link,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverHeader,
  PopoverCloseButton,
  ButtonGroup,
  PopoverFooter,
  Text,
} from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { FiLogOut } from 'react-icons/fi';

const DashboardShell = ({
  title,
  children,
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  const user = useAuth();

  if (!user?.loading && !user?.user) {
    window.location.href = '/';
  }

  return (
    <Box backgroundColor="gray.100" minH="100vh">
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
            <Link href={`/dashboard`} mr="4">
              Dashboard
            </Link>
            <Link href="/edit">Edit</Link>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            <Popover>
              {({ onClose }) => (
                <>
                  <PopoverTrigger>
                    <button>
                      <Avatar
                        size="sm"
                        src={user?.user?.photoUrl ?? undefined}
                      />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent boxShadow={'md'}>
                    <PopoverHeader border="0">
                      <Text fontWeight={'semibold'}>Hi {user?.user?.name}</Text>
                    </PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody>Do you want to logout?</PopoverBody>
                    <PopoverFooter display="flex" justifyContent="flex-end">
                      <ButtonGroup size="sm">
                        <Button variant="outline" onClick={onClose}>
                          Cancel
                        </Button>
                        <Button
                          onClick={() => user?.signout()}
                          backgroundColor="gray.900"
                          color="white"
                          fontWeight="medium"
                          leftIcon={<FiLogOut />}
                          _hover={{ bg: 'gray.700' }}
                          _active={{
                            bg: 'gray.800',
                            transform: 'scale(0.95)',
                          }}
                        >
                          Logout
                        </Button>
                      </ButtonGroup>
                    </PopoverFooter>
                  </PopoverContent>
                </>
              )}
            </Popover>
          </Flex>
        </Flex>
      </Flex>
      <Flex margin="0 auto" direction="column" maxW="1250px" px={8}>
        <Flex justifyContent="space-between">
          <Heading mb={8}>{title ? title : 'My Lush Link'}</Heading>
          {!title && (
            <Button
              as="a"
              href="/edit"
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              _hover={{ bg: 'gray.700' }}
              _active={{
                bg: 'gray.800',
                transform: 'scale(0.95)',
              }}
            >
              + Edit lush link
            </Button>
          )}
        </Flex>

        {children}
      </Flex>
    </Box>
  );
};

export default DashboardShell;
