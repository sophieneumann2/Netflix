import { magic } from '@/lib/magic-client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './navbar.module.css';

const NavBar = () => {
  const [username, setUsername] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function getUsername() {
      try {
        if (!!magic) {
          const { email } = await magic.user.getMetadata();
          if (email) {
            setUsername(email);
          }
        }
      } catch (error) {
        console.log('Error retrieving email:', error);
      }
    }
    getUsername();
  }, []);

  const handleOnClickHome = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    router.push('/');
  };

  const handleOnClickMyList = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    router.push('/browse/my-list');
  };

  const handleShowDropdown = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    try {
      if (!!magic) {
        await magic.user.logout();
        router.push('/login');
      }
    } catch (error) {
      console.log('Error logging out', error);
      router.push('/login');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.logo} href="/">
          <div className={styles.logoWrapper}>
            <Image
              src={'/static/netflix.svg'}
              alt={'Netflix Logo'}
              width={128}
              height={34}
            />
          </div>
        </Link>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>

        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleShowDropdown}>
              <p className={styles.username}>{username}</p>
              <Image
                src={'/static/expand_more.svg'}
                alt={'Expand dropdown'}
                width={24}
                height={24}
              />
            </button>
            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <a className={styles.linkName} onClick={handleSignOut}>
                    Sign out
                  </a>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
