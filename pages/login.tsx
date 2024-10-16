import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles/Login.module.css';

export default function Login() {
  const [userMsg, setUserMsg] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const router = useRouter();

  const handleOnChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setUserMsg('');
    setEmail(e.currentTarget.value);
  };

  const handleLoginWithEmail = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (email) {
      if (email === 'test@test.com') {
        router.push('/');
      } else {
        setUserMsg('Something went wrong logging in.');
      }
    } else {
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
          />
          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
}
