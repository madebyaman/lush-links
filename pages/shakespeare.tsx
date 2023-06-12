import BackgroundSVG from '@/components/bg-svg';
import ShakespeareSVG from '@/components/shakespear-svg';
import * as data from '@/data.json';
import {
  Image,
  Text,
  Container,
  Heading,
  Link,
  Box,
  Flex,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import Head from 'next/head';
import { SiFacebook, SiInstagram, SiTwitter, SiYoutube } from 'react-icons/si';

const einstein = data[2];

export default function Page() {
  return (
    <Box pos={'relative'} minH={'100vh'} bgColor={'gray.100'} minW="100vw">
      <Head>
        <title>{einstein.name} Links</title>
      </Head>
      <Box
        backgroundColor={'white'}
        mx="2rem"
        minH="100vh"
        border="1px solid"
        borderColor={'gray.200'}
      >
        <Box p="3rem 0" position={'relative'}>
          <Container>
            <Flex pos="relative" justifyContent={'flex-start'} mb="3">
              <Image
                src={einstein.profile_image_url}
                alt={einstein.name}
                boxSize={'100px'}
                objectFit={'cover'}
                borderRadius={'full'}
                boxShadow={'lg'}
              />
            </Flex>
            <Heading as="h1" mb="3" fontSize={'4xl'} display={'inline-block'}>
              {einstein.name}
            </Heading>
            <Text fontSize={'lg'} mb="6" color="gray.600">
              {einstein.bio}
            </Text>
            <Flex gap="5" justifyContent={'flex-start'}>
              {einstein.social?.map((item, i) => {
                return (
                  <Text
                    key={`site-${i}`}
                    color="gray.500"
                    _hover={{
                      color: 'gray.700',
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
                      {item.site.toLowerCase() === 'instagram' && (
                        <SiInstagram />
                      )}
                    </Link>
                  </Text>
                );
              })}
            </Flex>
          </Container>
        </Box>
        <Container>
          <Flex gap="6" flexDir="column" position={'relative'}>
            {einstein.lush_links?.map((link) => (
              <GridItem
                zIndex={1}
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
                  border="2px solid black"
                  bgColor={'white'}
                  borderRadius={'lg'}
                  transition={'all 0.2s ease-in-out'}
                  _hover={{
                    bgColor: 'gray.50',
                  }}
                >
                  <Text fontSize={'lg'} fontWeight={'black'}>
                    {link.title}
                  </Text>
                </Box>
              </GridItem>
            ))}
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}
