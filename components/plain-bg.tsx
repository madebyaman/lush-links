import { Box, BoxProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface PlainBackground extends BoxProps {
  children: ReactNode;
}

export default function PlainBackground({
  children,
  ...props
}: PlainBackground) {
  return (
    <Box
      minH={'100vh'}
      w={'full'}
      padding={'5rem 2rem'}
      bgColor={'gray.50'}
      display={'flex'}
      gap="2rem"
      alignItems={'flex-start'}
      justifyContent={'center'}
      {...props}
    >
      {children}
    </Box>
  );
}
