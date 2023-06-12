import * as data from '@/data.json';
import {
  Avatar,
  Text,
  Container,
  Heading,
  Link,
  Box,
  Flex,
} from '@chakra-ui/react';
import Head from 'next/head';
import { SiFacebook, SiInstagram, SiTwitter, SiYoutube } from 'react-icons/si';

const daVinci = data[1];

function randomHSL() {
  // Generate a random hue from 0 to 360
  let hue = Math.floor(Math.random() * 360);

  // Fixed saturation and lightness
  let saturation = 97;
  let lightness = 68;

  // Return the HSL color string
  return 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)';
}

export default function Page() {
  return (
    <Box
      className="fadeInUp"
      backgroundColor={'yellow.300'}
      color="black"
      minH={'100vh'}
      minW="100vw"
      p={'3rem 0'}
    >
      <Head>
        <title>{daVinci.name} Links</title>
      </Head>
      <Container>
        <Flex justifyContent={'center'} mb="4">
          <Avatar
            src={daVinci.profile_image_url}
            size="2xl"
            border="2px solid black"
          />
        </Flex>
        <Heading as="h1" mb="2" fontSize={'4xl'} textAlign={'center'}>
          {daVinci.name}
        </Heading>
        <Text fontSize={'lg'} mb="4" textAlign={'center'}>
          {daVinci.bio}
        </Text>
        <Flex gap="5" mb="8" justifyContent={'center'}>
          {daVinci.social.map((item: any, i: number) => {
            return (
              <Text
                key={`site-${i}`}
                color="gray.800"
                _hover={{
                  color: 'gray.700',
                }}
                mb="4"
              >
                <Link
                  href={`https://${item.site}.com/${item.username}`}
                  fontSize={'2xl'}
                >
                  {item.site.toLowerCase() === 'twitter' && <SiTwitter />}
                  {item.site.toLowerCase() === 'youtube' && <SiYoutube />}
                  {item.site.toLowerCase() === 'facebook' && <SiFacebook />}
                  {item.site.toLowerCase() === 'instagram' && <SiInstagram />}
                </Link>
              </Text>
            );
          })}
        </Flex>
        <Flex gap="6" flexDir={'column'}>
          {daVinci.lush_links?.map((link) => (
            <Box
              as="button"
              onClick={() => (window.location.href = link.url)}
              key={link.id}
            >
              <Box
                margin={'0 auto'}
                w="full"
                maxW={'40rem'}
                padding="1rem"
                display={'flex'}
                alignItems={'center'}
                gap="2"
                border="4px solid black"
                boxShadow={'8px 8px 0px black'}
                transition={'all 0.2s ease-in-out'}
                style={{
                  backgroundColor: randomHSL(),
                }}
                _hover={{
                  boxShadow: '4px 4px 0px 0px black',
                }}
              >
                <Text fontSize={'lg'} fontWeight={'black'}>
                  {link.title}
                </Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Container>
    </Box>
  );
}
