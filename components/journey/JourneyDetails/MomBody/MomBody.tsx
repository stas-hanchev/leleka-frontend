'use client';

import { useQuery } from '@tanstack/react-query';
import { getMomBody } from '@/lib/services/weeksService';
import styles from './MomBody.module.css';

interface Props {
  weekNumber: number;
}

export const MomBody = ({ weekNumber }: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['momBody', weekNumber],
    queryFn: () => getMomBody(weekNumber),
  });

  if (isLoading)
    return <div className={styles.loader}>Завантаження даних для мами...</div>;
  if (isError)
    return <div className={styles.error}>Помилка завантаження даних</div>;

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h3 className={styles.title}>Як ви можете почуватись</h3>
        <p className={styles.text}>
          {data?.bodyDescription ||
            'На цьому тижні ваше тіло продовжує адаптуватись до нових змін.'}
        </p>
      </section>

      {data?.tips && data.tips.length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.title}>Поради для вашого комфорту</h3>
          <ul className={styles.tipsList}>
            {data.tips.map((tip: string, index: number) => (
              <li key={index} className={styles.tipItem}>
                <span className={styles.checkIcon}>✓</span>
                {tip}
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className={styles.warningCard}>
        <p>
          <strong>Важливо:</strong> Кожна вагітність індивідуальна. Якщо вас
          щось турбує, обов&apos;язково зверніться до лікаря.
        </p>
      </div>
    </div>
  );
};
