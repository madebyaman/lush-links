import '@/styles/globals.css';
import theme from '@/theme';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { Inter, Yeseva_One } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const yesevaOne = Yeseva_One({ subsets: ['latin'], weight: ['400'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
        h1,
        h2,
        h3,
        h4 {
          font-family: ${yesevaOne.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
