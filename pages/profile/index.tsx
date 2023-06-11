import DashboardShell from '@/components/dashboard-shell';
import PrimaryButton from '@/components/primary-button';
import SecondaryButton from '@/components/secondary-button';
import { useAuth } from '@/lib/auth';
import {
  checkUsernameAvailability,
  createOrUpdateUser,
  getUserProfile,
} from '@/lib/db';
import {
  Text,
  Avatar,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  ButtonGroup,
  useToast,
  Skeleton,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Profile() {
  const auth = useAuth();
  const [state, setState] = useState<{
    name: string;
    username: string;
    status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
  }>({
    name: '',
    username: '',
    status: 'INIT',
  });
  const toast = useToast();

  useEffect(() => {
    let mounted = true;
    if (auth?.user?.uid && mounted) {
      setState({ ...state, status: 'LOADING' });
      getUserProfile(auth.user.uid)
        .then((data) =>
          setState({
            ...state,
            name: data?.name ?? '',
            username: data?.username ?? '',
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

  function handleChange(e: any) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSave() {
    if (!auth?.user) {
      toast({
        title: "You're not logged in",
        status: 'error',
      });
      return;
    }
    const usernameAvailable = await checkUsernameAvailability(
      state.username,
      auth.user.uid
    );
    if (!usernameAvailable) {
      toast({
        title: 'Username not available',
        status: 'error',
      });
      return;
    } else {
      try {
        const newProfile = {
          name: state.name,
          username: state.username,
        };
        await createOrUpdateUser(auth.user.uid, newProfile);
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
  }

  return (
    <DashboardShell title="My Profile">
      <Head>
        <title>My Profile</title>
      </Head>
      <Flex
        direction="column"
        maxW="600px"
        align={['left', 'center']}
        margin="0 auto"
      >
        <Flex direction="column" align={['left', 'center']} ml={4}>
          {state.status === 'LOADING' ? (
            <>
              <Skeleton
                height={['3rem', '6rem']}
                width={['3rem', '6rem']}
                rounded="full"
                mb="4"
              />
              <Skeleton mb="4" height="10px" width="120px" />
              <Skeleton height="8px" width="100px" />
            </>
          ) : (
            <>
              <Avatar
                w={['3rem', '6rem']}
                h={['3rem', '6rem']}
                mb={4}
                src={auth?.user?.photoUrl ?? undefined}
              />
              <Heading letterSpacing="-1px">{auth?.user?.name}</Heading>
              <Text>{auth?.user?.email}</Text>
            </>
          )}
        </Flex>
      </Flex>
      <Flex
        margin="0 auto"
        maxW="500px"
        w="full"
        backgroundColor="white"
        boxShadow={'md'}
        p="2rem"
        mt="1rem"
        borderRadius={'md'}
        flexDir={'column'}
        gap="1rem"
      >
        <FormControl>
          <FormLabel>Name</FormLabel>
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
        </FormControl>
        <FormControl>
          <FormLabel>Username</FormLabel>
          {state.status === 'LOADING' ? (
            <Skeleton height="2rem" width="full" />
          ) : (
            <Input
              placeholder="Username"
              name="username"
              value={state.username}
              onChange={handleChange}
            />
          )}
        </FormControl>
        <ButtonGroup>
          <SecondaryButton type="button" onClick={() => auth?.signout()}>
            Signout
          </SecondaryButton>
          <PrimaryButton onClick={handleSave}>Save Settings</PrimaryButton>
        </ButtonGroup>
      </Flex>
    </DashboardShell>
  );
}
