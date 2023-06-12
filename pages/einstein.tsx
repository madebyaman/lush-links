import BackgroundSVG from '@/components/bg-svg';
import * as data from '@/data.json';
import {
  Image,
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
    <Box pos={'relative'} className="fadeInUp" minH={'100vh'} minW="100vw">
      <Head>
        <title>{einstein.name} Links</title>
      </Head>
      <Box p="3rem 0" bgColor="gray.50">
        <BackgroundSVG />
        <Container borderBottom="1px solid" borderColor={'gray.300'}>
          <Flex justifyContent={'center'} mb="6">
            <Image
              src={einstein.profile_image_url}
              alt={einstein.name}
              border="4px solid black"
              boxSize={'2xs'}
              objectFit={'cover'}
              borderRadius={'lg'}
              boxShadow={'2xl'}
            />
          </Flex>
          <Flex justifyContent={'center'}>
            <Heading as="h1" mb="3" fontSize={'4xl'} display={'inline-block'}>
              {einstein.name}
            </Heading>
          </Flex>
          <Text fontSize={'lg'} mb="6" color="gray.600" textAlign={'center'}>
            {einstein.bio}
          </Text>
        </Container>
      </Box>
      <Container mt="6">
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
