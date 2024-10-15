import cls from 'classnames';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import styles from './card.module.css';

interface ICardProps {
  imgUrl?: string;
  size?: 'small' | 'medium' | 'large';
  id: number;
}

const DEFAULT_IMG_SRC =
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80';

export default function Card(props: ICardProps) {
  const { imgUrl = DEFAULT_IMG_SRC, size = 'medium', id } = props;

  const [imgSrc, setImgSrc] = useState(imgUrl);

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const handleOnError = () => {
    setImgSrc(DEFAULT_IMG_SRC);
  };

  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };
  return (
    <div className={styles.container}>
      <motion.div
        className={cls(classMap[size], styles.imgMotionWrapper)}
        whileHover={{ ...scale }}
      >
        <Image
          src={imgSrc}
          alt="image"
          fill
          className={styles.cardImg}
          onError={handleOnError}
        />
      </motion.div>
    </div>
  );
}
