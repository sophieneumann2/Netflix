import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './navbar.module.css';

interface INavBarProps {
  username: string;
}

const NavBar = (props: INavBarProps) => {
  const { username } = props;
  const router = useRouter();

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

  const [showDropdown, setShowDropdown] = useState(false);

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
                  <Link className={styles.linkName} href="/login">
                    Sign out
                  </Link>
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
