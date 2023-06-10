import { Box, BoxProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface RainbowBackgroundProps extends BoxProps {
  children: ReactNode;
}

export default function RainbowBackground({
  children,
  ...props
}: RainbowBackgroundProps) {
  return (
    <Box
      display={'flex'}
      flexDirection={['column', 'column', 'row']}
      gap="2rem"
      alignItems={'flex-start'}
      justifyContent={'center'}
      minH={'100vh'}
      w={'full'}
      padding={'5rem 2rem'}
      bgGradient={
        'linear(to-r, blue.100, green.100, yellow.100, red.100, orange.100)'
      }
      {...props}
    >
      {children}
    </Box>
  );
}
