import Banner from '@/components/banner/banner';
import SectionCard from '@/components/card/section-card';
import NavBar from '@/components/nav/navbar';
import { getPopularVideos, getVideos } from '@/lib/videos';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export async function getServerSideProps() {
  const disneyVideos = await getVideos('disney trailer');
  const productivityVideos = await getVideos('productivity');
  const travelVideos = await getVideos('travel');
  const popularVideos = await getPopularVideos();

  return {
    props: { disneyVideos, productivityVideos, travelVideos, popularVideos },
  };
}

export default function Home({
  disneyVideos,
  productivityVideos,
  travelVideos,
  popularVideos,
}: any) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <NavBar />
        <Banner
          title="Clifford"
          subTitle="a very cute dog"
          imgUrl="/static/clifford.webp"
          videoId="mYfJxlgR2jw"
        />
        <div className={styles.sectionWrapper}>
          <SectionCard title="Disney" videos={disneyVideos} size="large" />
          <SectionCard title="Travel" videos={travelVideos} size="small" />
          <SectionCard
            title="Productivity"
            videos={productivityVideos}
            size="medium"
          />
          <SectionCard title="Popular" videos={popularVideos} size="small" />
        </div>
      </div>
    </div>
  );
}
