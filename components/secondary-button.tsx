import { Button, ButtonProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props extends ButtonProps {
  children: ReactNode;
  href?: string;
}

export default function SecondaryButton({ children, ...props }: Props) {
  return (
    <Button
      backgroundColor="white"
      color="gray.900"
      variant="outline"
      fontWeight="medium"
      _hover={{ bg: 'gray.50' }}
      _active={{
        bg: 'gray.100',
        transform: 'scale(0.95)',
      }}
      maxW="200px"
      {...props}
    >
      {children}
    </Button>
  );
}
