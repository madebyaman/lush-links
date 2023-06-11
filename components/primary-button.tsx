import { Button, ButtonProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props extends ButtonProps {
  children: ReactNode;
  href?: string;
}

export default function PrimaryButton({ children, ...props }: Props) {
  return (
    <Button
      backgroundColor="gray.800"
      color="white"
      fontWeight="medium"
      maxW="200px"
      _hover={{ bg: 'gray.600' }}
      _active={{
        bg: 'gray.800',
        transform: 'scale(0.95)',
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
