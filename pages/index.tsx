import Banner from '@/components/banner/banner';
import NavBar from '@/components/nav/navbar';
import Head from 'next/head';

export default function Home() {
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
      {/* <Card/> */}
    </>
  );
}
