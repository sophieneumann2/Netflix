import { magic } from '@/lib/magic-client';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/Login.module.css';

export default function Login() {
  const [userMsg, setUserMsg] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

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

  const handleOnChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setUserMsg('');
    setEmail(e.currentTarget.value);
  };

  const handleLoginWithEmail = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (email) {
      if (email === process.env.NEXT_PUBLIC_TEST_EMAIL ?? 'test@test.com') {
        try {
          setIsLoading(true);

          if (!!magic) {
            const didToken = await magic.auth.loginWithMagicLink({
              email,
            });
            if (didToken) {
              router.push('/');
            }
          }
        } catch (error) {
          // Handle errors if required!
          setIsLoading(false);
          console.error('Something went wrong logging in', error);
        }
      } else {
        setIsLoading(false);
        setUserMsg('Something went wrong logging in.');
      }
    } else {
      setIsLoading(false);
      setUserMsg('Please enter a valid email adress.');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix Sign In</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link className={styles.logoLink} href="/">
            <div className={styles.logoWrapper}>
              <Image
                src="/static/netflix.svg"
                alt="Netflix logo"
                width={128}
                height={34}
              />
            </div>
          </Link>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>
          <input
            type="text"
            placeholder="Email adress"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
            disabled={isLoading}
          />
          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>
        </div>
      </main>
    </div>
  );
}
