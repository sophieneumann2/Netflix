import Link from 'next/link';
import Card from './card';
import styles from './section-card.module.css';

type Video = {
  imgUrl?: string;
  id: string;
};

interface ISectionCardProps {
  title: string;
  videos: any[];
  size?: 'small' | 'medium' | 'large';
}

export default function SectionCard(props: ISectionCardProps) {
  const { title, videos = [], size } = props;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video: Video, index: number) => (
          <Link href={`/video/${video.id}`} key={`section_card_${index}`}>
            <Card id={index} size={size} imgUrl={video.imgUrl} />
          </Link>
        ))}
      </div>
    </section>
  );
}
