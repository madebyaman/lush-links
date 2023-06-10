import { FiTrash } from 'react-icons/fi';
import NextLink from 'next/link';
import * as data from '../../data.json';
import ProfileSectionWrapper from '@/components/profile-section-wrapper';
import RainbowBackground from '@/components/rainbow-bg';
import { Text, Box, Heading, Link, Avatar } from '@chakra-ui/react';
import { SiFacebook, SiInstagram, SiTwitter, SiYoutube } from 'react-icons/si';
import Head from 'next/head';

export const getStaticProps = async ({
  params,
}: {
  params: { username: string };
}) => {
  const user = data.find((user) => user.username === params.username);
  if (!user) {
    return { notFound: true };
  }
  return { props: { user } };
};

export const getStaticPaths = async () => {
  const usernames = data.map((user) => user.username);

  return {
    paths: usernames.map((username) => ({ params: { username } })),
    fallback: 'blocking',
  };
};

export default function Page({ user }: { user: (typeof data)[0] }) {
  if (!user) {
  }

  return (
    <RainbowBackground>
      <Head>
        <title>{user.name} Links</title>
      </Head>
      <ProfileSectionWrapper padding="4rem 2rem" maxW="sm">
        <Avatar
          name={user.name}
          src={user.profile_image_url}
          size={'xl'}
          mb="4"
        />
        <Heading as="h1" size="xl" mb={1} letterSpacing="tight">
          {user.name}
        </Heading>
        <Text fontSize={'md'} mb="4" color={'gray.400'} fontWeight={'semibold'}>
          @{user.username}
        </Text>
        <Text fontSize={'md'} mb="4" color={'gray.600'}>
          {user.bio}
        </Text>
        <Box display={'flex'} gap={'4'} justifyContent={'flex-start'}>
          {user.social.map((item, i) => {
            return (
              <Text
                key={`site-${i}`}
                color="gray.400"
                _hover={{
                  color: 'gray.700',
                }}
                fontSize={'md'}
                mb="4"
              >
                <Link
                  href={`https://${item.site}.com/${item.username}`}
                  fontSize={'lg'}
                  isExternal
                >
                  {item.site.toLowerCase() === 'twitter' && <SiTwitter />}
                  {item.site.toLowerCase() === 'youtube' && <SiYoutube />}
                  {item.site.toLowerCase() === 'facebook' && <SiFacebook />}
                  {item.site.toLowerCase() === 'instagram' && <SiInstagram />}
                </Link>
              </Text>
            );
          })}
        </Box>
      </ProfileSectionWrapper>
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={'4'}
        justifyContent={'center'}
        width="full"
        maxW="xl"
      >
        {user.lush_links.map((link) => (
          <NextLink href={link.url} target="_blank" key={link.id}>
            <ProfileSectionWrapper
              margin={'0 auto'}
              w="full"
              maxW={'50rem'}
              padding="2rem"
              display={'flex'}
              alignItems={'center'}
              gap="2"
              _hover={{
                bg: 'gray.50',
              }}
            >
              {link.icon && <Avatar size="xs" src={link.icon} />}
              <Text>{link.title}</Text>
            </ProfileSectionWrapper>
          </NextLink>
        ))}
      </Box>
    </RainbowBackground>
  );
}
