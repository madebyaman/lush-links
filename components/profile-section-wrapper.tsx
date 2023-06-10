import { Box, BoxProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ProfileSectionWrapperProps extends BoxProps {
  children: ReactNode;
}

export default function ProfileSectionWrapper({
  children,
  ...props
}: ProfileSectionWrapperProps) {
  return (
    <Box
      boxShadow={'lg'}
      backgroundColor={'white'}
      borderRadius={'lg'}
      {...props}
    >
      {children}
    </Box>
  );
}
