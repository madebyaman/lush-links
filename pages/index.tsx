import PlainBackground from '@/components/plain-bg';
import ProfileSectionWrapper from '@/components/profile-section-wrapper';
import {
  Text,
  Image,
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
} from '@chakra-ui/react';

export default function Home() {
  return (
    <PlainBackground>
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
          <HStack spacing="1rem">
            <FormControl>
              <FormLabel>
                Name
                <Input
                  // value={state.name}
                  placeholder="Your Name"
                  // onChange={(e) =>
                  //   dispatch({
                  //     type: 'UPDATE_NAME',
                  //     payload: e.target.value,
                  //   })
                  // }
                />
              </FormLabel>
            </FormControl>
            <FormControl>
              <FormLabel>
                Username
                <InputGroup>
                  <Input
                    // value={state.username}
                    type="text"
                    // onChange={(e) =>
                    //   dispatch({
                    //     type: 'UPDATE_USERNAME',
                    //     payload: e.target.value,
                    //   })
                    // }
                    // onBlur={onUsernameBlur}
                  />
                </InputGroup>
              </FormLabel>
            </FormControl>
          </HStack>

          <FormControl>
            <FormLabel>
              Your Bio
              <Textarea
                // value={state.bio}
                placeholder="Your bio"
                // onChange={(e) =>
                //   dispatch({
                //     type: 'UPDATE_BIO',
                //     payload: e.target.value,
                //   })
                // }
              />
            </FormLabel>
          </FormControl>
        </Stack>
        <Button
          type="submit"
          // isLoading={state.loading}
          // disabled={!state.usernameValid}
          // mt="6"
        >
          Save Changes
        </Button>
      </ProfileSectionWrapper>
      <ProfileSectionWrapper width="full" maxW="xl" padding="2rem">
        Hello
      </ProfileSectionWrapper>
    </PlainBackground>
  );
}
