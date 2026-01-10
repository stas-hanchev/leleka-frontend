'use client';

import { useQuery } from '@tanstack/react-query';
import { getBabyDevelopment } from '@/lib/services/weeksService';
import styles from './BabyDevelopment.module.css';

export const BabyDevelopment = ({ weekNumber }: { weekNumber: number }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['babyDevelopment', weekNumber],
    queryFn: () => getBabyDevelopment(weekNumber),
  });

  if (isLoading) return <div className={styles.loader}>Завантаження...</div>;
  if (isError)
    return <div className={styles.error}>Не вдалося завантажити дані</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageContainer}>
        <img
          src={data?.image}
          alt="Baby size"
          className={styles.illustration}
        />
      </div>

      <div className={styles.textBlock}>
        <p className={styles.description}>{data?.babyDevelopment}</p>
      </div>

      {data?.interestingFact && (
        <div className={styles.factCard}>
          <div className={styles.factHeader}>
            <span className={styles.icon}>💡</span>
            <h4>Цікавий факт тижня</h4>
          </div>
          <p>{data.interestingFact}</p>
        </div>
      )}
    </div>
  );
};
