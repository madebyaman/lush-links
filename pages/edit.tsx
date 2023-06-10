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
  Avatar,
  Skeleton,
  useToast,
} from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import Head from 'next/head';
import { useAuth } from '@/lib/auth';
import {
  checkUsernameAvailability,
  createOrUpdateLink,
  getUserLinkPage,
} from '@/lib/db';
import DashboardShell from '@/components/dashboard-shell';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { uploadImage } from '@/lib/uploadImage';

const initialState = {
  name: '',
  username: '',
  bio: '',
  lush_links: [],
  profile_picture_url: '',
  status: 'INIT',
};
export default function Home() {
  const toast = useToast();
  const [state, setState] = useState<{
    name: string;
    username: string;
    bio: string;
    lush_links: { title: string; url: string; id: string }[];
    profile_picture_url: string;
    status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
  }>(initialState as any);
  let [uploading, setUploading] = useState(false);
  const auth = useAuth();
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

  async function saveChanges() {
    if (!auth?.user) {
      toast({
        title: "You're not logged in",
        status: 'error',
      });
      return;
    }
    const username = state.username.toLowerCase();
    const usernameAvailable = await checkUsernameAvailability(username);
    if (!usernameAvailable) {
      toast({
        title: 'Username is not available',
        status: 'error',
      });
      return;
    }
    try {
      const newLink = { ...state, userId: auth?.user.uid, username };
      createOrUpdateLink(username, newLink);
      toast({
        title: 'Changes saved',
        status: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error saving changes',
        status: 'error',
      });
      console.log(error);
    }
  }

  async function uploadFile(e: ChangeEvent<HTMLInputElement>) {
    const file: File = Array.from(e.target.files as any)[0] as File;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setState({ ...state, profile_picture_url: url });
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  }

  useEffect(() => {
    let mounted = true;
    if (auth?.user?.uid && mounted) {
      setState({ ...state, status: 'LOADING' });
      getUserLinkPage(auth.user.uid)
        .then((data) =>
          setState({
            ...state,
            name: data?.name ?? '',
            username: data?.username ?? '',
            bio: data?.bio ?? '',
            lush_links: data?.lush_links ?? [],
            profile_picture_url: data?.profile_picture_url ?? '',
            status: 'SUCCESS',
          })
        )
        .catch((err) => {
          setState({ ...state, status: 'ERROR' });
        });
    }

    return () => {
      mounted = false;
    };
  }, [auth?.user]);

  return (
    <DashboardShell title="Edit Your Lush Link">
      <Head>
        <title>Create new link page</title>
      </Head>
      <Box
        display={'flex'}
        flexDirection={['column', 'column', 'row']}
        gap="2rem"
        w={'full'}
        margin={'2rem auto'}
        justifyContent={'center'}
      >
        <ProfileSectionWrapper
          padding="2rem"
          w="sm"
          display={'flex'}
          alignSelf={'flex-start'}
          flexDirection={'column'}
          gap="4"
        >
          <Heading as="h2" fontSize="30px" color="text.400">
            Profile
          </Heading>
          {state.status === 'LOADING' ? (
            <Skeleton height="70px" width="70px" rounded="full" />
          ) : state.profile_picture_url ? (
            <Avatar src={state.profile_picture_url} />
          ) : (
            <FormLabel display={'flex'} flexDir={'column'} gap="2">
              Profile Picture
              <Text fontSize={'sm'} mt="-2">
                Upload 150px * 150px photo to display in public profile.
              </Text>
              <input
                onChange={uploadFile}
                type="file"
                accept="image/png, image/jpeg"
                name="uploadImage"
                id="uploadImage"
              />
            </FormLabel>
          )}

          <Stack spacing={'4'}>
            <HStack spacing="0.2rem">
              <FormControl>
                <FormLabel>
                  Name
                  {state.status === 'LOADING' ? (
                    <Skeleton height="2rem" width="full" />
                  ) : (
                    <Input
                      placeholder="Your Name"
                      name="name"
                      value={state.name}
                      onChange={handleChange}
                    />
                  )}
                </FormLabel>
              </FormControl>
              <FormControl>
                <FormLabel>
                  Username
                  {state.status === 'LOADING' ? (
                    <Skeleton height="2rem" width="full" />
                  ) : (
                    <InputGroup>
                      <Input
                        type="text"
                        placeholder="username"
                        name="username"
                        value={state.username}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  )}
                </FormLabel>
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel>
                Your Bio
                {state.status === 'LOADING' ? (
                  <Skeleton height="5rem" width="full" rounded="md" />
                ) : (
                  <Textarea
                    placeholder="Your bio"
                    name="bio"
                    value={state.bio}
                    onChange={handleChange}
                  />
                )}
              </FormLabel>
            </FormControl>
          </Stack>
          <Button colorScheme="teal" onClick={saveChanges}>
            Publish Changes
          </Button>
        </ProfileSectionWrapper>
        <Box width="full" maxW="xl">
          {state.status === 'LOADING' ? (
            <ProfileSectionWrapper margin={'0 auto'} padding="2rem" mb="4">
              <Skeleton height="3rem" width="full" />
            </ProfileSectionWrapper>
          ) : (
            state.lush_links.map((l) => (
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
                    onClick={(e) => {
                      e.stopPropagation();
                      const newLinks = state.lush_links.filter(
                        (link) => l.id !== link.id
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
            ))
          )}
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
      </Box>
    </DashboardShell>
  );
}
