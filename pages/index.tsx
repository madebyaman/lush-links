import { FiTrash } from 'react-icons/fi';
import ProfileSectionWrapper from '@/components/profile-section-wrapper';
import {
  Text,
  Heading,
  Input,
  Flex,
  Box,
  Button,
  FormLabel,
  Textarea,
  FormControl,
  HStack,
  InputGroup,
  Stack,
  IconButton,
} from '@chakra-ui/react';
import { useState } from 'react';
import RainbowBackground from '@/components/rainbow-bg';
import Head from 'next/head';

export default function Home() {
  const [state, setState] = useState<{
    name: string;
    username: string;
    bio: string;
    lush_links: { title: string; url: string; id: string }[];
    profile_picture_url: string;
  }>({
    name: '',
    username: '',
    bio: '',
    lush_links: [],
    profile_picture_url: '',
  });
  const [profilePicture, setProfilePicture] = useState<File | undefined>();
  const [link, setLink] = useState<{ id?: string; title: string; url: string }>(
    {
      title: '',
      url: '',
    }
  );

  function updateLink() {
    if (link.id) {
      changeLink(link.id, link.url, link.title);
    } else {
      setState({
        ...state,
        lush_links: [
          ...state.lush_links,
          { ...link, id: Date.now().toString() },
        ],
      });
    }
    setLink({
      title: '',
      url: '',
    });
  }

  function changeLink(id: string, url: string, title: string) {
    setState({
      ...state,
      lush_links: state.lush_links.map((link) => {
        if (link.id === id) {
          return {
            ...link,
            url: url,
            title: title,
          };
        }
        return link;
      }),
    });
  }

  function handleChange(e: any) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function saveChanges() {
    console.log(state);
  }

  return (
    <RainbowBackground>
      <Head>
        <title>Create new link page</title>
      </Head>
      <Box
        position={'fixed'}
        top="0"
        right={0}
        left={0}
        padding={'0.5rem'}
        background={'white'}
        width="full"
        shadow={'sm'}
      >
        <Flex
          maxW={'container.lg'}
          margin={'0 auto'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Heading as="h1" letterSpacing={'tight'} fontSize={'xl'}>
            Create new link page
          </Heading>
          <Button colorScheme="teal" onClick={saveChanges}>
            Save Changes
          </Button>
        </Flex>
      </Box>
      <ProfileSectionWrapper
        padding="2rem"
        maxW="sm"
        display={'flex'}
        flexDirection={'column'}
        gap="4"
      >
        <Heading as="h2" fontSize="30px" color="text.400">
          Profile
        </Heading>
        <Flex gap="4" mt="4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{
              color: '#4A5568',
              width: '80px',
              height: '80px',
            }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <Box>
            <FormLabel htmlFor="uploadImage">Profile Picture</FormLabel>
            <Text fontSize={'sm'} mt="-2">
              Upload 150px * 150px photo to display in public profile.
            </Text>
            <Box pos="relative" overflow={'hidden'}>
              <Button
                display={'flex'}
                gap="3"
                backgroundColor="transparent"
                border="1px"
                borderColor="gray.200"
                _hover={{
                  borderColor: 'gray.400',
                }}
                mt="3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    width: '18px',
                    height: '18px',
                  }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                Upload
              </Button>
              <input
                style={{
                  position: 'absolute',
                  zIndex: -1,
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0,
                }}
                type="file"
                accept="image/png, image/jpeg"
                name="uploadImage"
                id="uploadImage"
              />
            </Box>
          </Box>
        </Flex>

        <Stack spacing={'4'}>
          <HStack spacing="0.2rem">
            <FormControl>
              <FormLabel>
                Name
                <Input
                  placeholder="Your Name"
                  name="name"
                  value={state.name}
                  onChange={handleChange}
                />
              </FormLabel>
            </FormControl>
            <FormControl>
              <FormLabel>
                Username
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="username"
                    name="username"
                    value={state.username}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormLabel>
            </FormControl>
          </HStack>

          <FormControl>
            <FormLabel>
              Your Bio
              <Textarea
                placeholder="Your bio"
                name="bio"
                value={state.bio}
                onChange={handleChange}
              />
            </FormLabel>
          </FormControl>
        </Stack>
      </ProfileSectionWrapper>
      <Box width="full" maxW="xl">
        {state.lush_links.map((l) => (
          <Box
            key={l.id}
            mb="4"
            cursor={'pointer'}
            onClick={() => {
              setLink(l);
            }}
          >
            <ProfileSectionWrapper
              margin={'0 auto'}
              padding="2rem"
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
              gap="2"
              _hover={{
                bg: 'gray.50',
              }}
            >
              <Text>{l.title}</Text>
              <IconButton
                aria-label="Delete"
                onClick={() => {
                  const newLinks = state.lush_links.filter(
                    (l) => l.id !== link.id
                  );
                  setState({
                    ...state,
                    lush_links: newLinks,
                  });
                }}
              >
                <FiTrash />
              </IconButton>
            </ProfileSectionWrapper>
          </Box>
        ))}
        <ProfileSectionWrapper p="2rem">
          <Flex flexDirection={'column'} gap="4">
            <Input
              value={link.title}
              placeholder="Link text"
              onChange={(e) => setLink({ ...link, title: e.target.value })}
            />
            <Input
              value={link.url}
              placeholder="Link URL"
              onChange={(e) => setLink({ ...link, url: e.target.value })}
            />
            <Button onClick={updateLink} alignSelf={'flex-start'}>
              {link.id ? 'Update Link' : 'Add Link'}
            </Button>
          </Flex>
        </ProfileSectionWrapper>
      </Box>
    </RainbowBackground>
  );
}
