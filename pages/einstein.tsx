import BackgroundSVG from '@/components/bg-svg';
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

const einstein = data[2];

export default function Page() {
  return (
    <Box pos={'relative'} minH={'100vh'} minW="100vw">
      <Head>
        <title>{einstein.name} Links</title>
      </Head>
      <BackgroundSVG />
      <Box p="3rem 0">
        <Container borderBottom="1px solid" borderColor={'gray.100'}>
          <Flex justifyContent={'center'} mb="8">
            <Avatar
              src={einstein.profile_image_url}
              size="2xl"
              border="2px solid black"
              borderRadius={'lg'}
              boxShadow={'md'}
            />
          </Flex>
          <Flex justifyContent={'center'}>
            <Heading
              as="h1"
              mb="4"
              fontSize={'4xl'}
              display={'inline-block'}
              bgColor="gray.50"
              transform={'skew(-5deg)'}
              p="2"
            >
              {einstein.name}
            </Heading>
          </Flex>
          <Text
            fontSize={'lg'}
            mb="8"
            lineHeight={'tall'}
            letterSpacing={'wide'}
            color="gray.600"
            textAlign={'center'}
          >
            {einstein.bio}
          </Text>
        </Container>
      </Box>
      <Container>
        <Flex gap="6" flexDir={'column'}>
          {einstein.lush_links?.map((link) => (
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
                borderRadius={'full'}
                boxShadow={'2px 2px 0px black'}
                transition={'all 0.2s ease-in-out'}
                _hover={{
                  bg: 'gray.50',
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
        <Flex gap="5" mt="10" justifyContent={'center'}>
          {einstein.social?.map((item, i) => {
            return (
              <Text
                key={`site-${i}`}
                color="white"
                bgColor={'gray.900'}
                p="0.7rem"
                _hover={{
                  bgColor: 'gray.700',
                }}
                mb="4"
                rounded={'full'}
              >
                <Link
                  href={`https://${item.site}.com/${item.username}`}
                  fontSize={'xl'}
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
      </Container>
    </Box>
  );
}
