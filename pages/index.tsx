import Banner from '@/components/banner/banner';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Nextflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Nextflix</h1>
      {/* <NavBar/> */}
      <Banner
        title="Clifford"
        subTitle="a very cute dog"
        imgUrl="/static/clifford.webp"
      />
      {/* <Card/> */}
    </>
  );
}
