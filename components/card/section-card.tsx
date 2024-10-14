import Card from './card';
import styles from './section-card.module.css';

type Video = {
  imgUrl?: string;
};

interface ISectionCardProps {
  title: string;
  videos: any[];
  size?: 'small' | 'medium' | 'large';
}

export default function SectionCard(props: ISectionCardProps) {
  const { title, videos, size } = props;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video: Video, index: number) => (
          <Card
            id={index}
            key={`section_card_${index}`}
            size={size}
            imgUrl={video.imgUrl}
          />
        ))}
      </div>
    </section>
  );
}
