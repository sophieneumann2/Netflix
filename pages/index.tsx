import Banner from '@/components/banner/banner';
import SectionCard from '@/components/card/section-card';
import NavBar from '@/components/nav/navbar';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const disneyVideos = [
    { imgUrl: '/static/clifford.webp' },
    { imgUrl: '/static/clifford.webp' },
    { imgUrl: '/static/clifford.webp' },
  ];
  return (
    <>
      <Head>
        <title>Nextflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar username="sophie" />
      <Banner
        title="Clifford"
        subTitle="a very cute dog"
        imgUrl="/static/clifford.webp"
      />
      <div className={styles.sectionWrapper}>
        <SectionCard title="Disney" videos={disneyVideos} size="large" />
        <SectionCard title="Disney" videos={disneyVideos} size="medium" />
      </div>
    </>
  );
}
