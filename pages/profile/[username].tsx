import ProfileSectionWrapper from '@/components/profile-section-wrapper';
import RainbowBackground from '@/components/rainbow-bg';
import { Text, Box, Heading, Link, Avatar, Button } from '@chakra-ui/react';
import { SiFacebook, SiInstagram, SiTwitter, SiYoutube } from 'react-icons/si';
import Head from 'next/head';
import { getAllLinkSites, getUserLinkSite } from '@/lib/db-admin';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ILushSite } from '@/types/types';

export const getStaticProps = async ({
  params,
}: {
  params: { username: string };
}) => {
  const { username } = params;
  const user = await getUserLinkSite(username);
  if (!user) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      user: user,
    },
  };
};

export const getStaticPaths = async () => {
  const { sites } = await getAllLinkSites();
  const paths = sites.map((site) => ({
    params: { username: site.username.toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export default function Page({ user }: { user: ILushSite }) {
  useEffect(() => {
    const data = {
      event: 'pageview',
      username: user.username,
      time: new Date(),
    };

    const jsonData = JSON.stringify(data);
    navigator.sendBeacon('/api/analytics', jsonData);
  }, [user.username]);

  function buttonClick(url: string) {
    const data = {
      event: 'click',
      time: new Date(),
      username: user.username,
      url: url,
    };

    const jsonData = JSON.stringify(data);
    navigator.sendBeacon('/api/analytics', jsonData);
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  }

  return (
    <RainbowBackground>
      <Head>
        <title>{user.name} Links</title>
      </Head>
      <ProfileSectionWrapper padding="4rem 2rem" w="full" maxW="sm">
        <Avatar
          name={user.name}
          src={user.profile_picture_url}
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
          {user.social_links?.map((item, i) => {
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
                <Button
                  onClick={() =>
                    buttonClick(`https://${item.site}.com/${item.username}`)
                  }
                  fontSize={'lg'}
                >
                  {item.site.toLowerCase() === 'twitter' && <SiTwitter />}
                  {item.site.toLowerCase() === 'youtube' && <SiYoutube />}
                  {item.site.toLowerCase() === 'facebook' && <SiFacebook />}
                  {item.site.toLowerCase() === 'instagram' && <SiInstagram />}
                </Button>
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
        {user.lush_links?.map((link) => (
          <Box
            as="button"
            onClick={() => {
              buttonClick(link.url);
            }}
            key={link.id}
          >
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
              <Text>{link.title}</Text>
            </ProfileSectionWrapper>
          </Box>
        ))}
      </Box>
    </RainbowBackground>
  );
}
