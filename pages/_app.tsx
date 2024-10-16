import Loading from '@/components/loading/loading';
import { magic } from '@/lib/magic-client';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  useEffect(() => {
    const handleUserLoginStatus = async () => {
      const isLoggedIn = !!magic ? await magic.user.isLoggedIn() : false;
      if (isLoggedIn) {
        router.push('/');
      } else {
        router.push('/login');
      }
    };
    handleUserLoginStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? <Loading /> : <Component {...pageProps} />;
}
