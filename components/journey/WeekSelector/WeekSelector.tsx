'use client';

import { useRouter } from 'next/navigation';
import styles from './WeekSelector.module.css';

interface WeekSelectorProps {
  currentWeek: number;
}

export const WeekSelector = ({ currentWeek }: WeekSelectorProps) => {
  const router = useRouter();

  const weeks = Array.from({ length: 40 }, (_, i) => i + 1);

  const handleWeekClick = (week: number) => {
    router.push(`/journey/${week}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.scrollWrapper}>
        {weeks.map((week) => (
          <button
            key={week}
            onClick={() => handleWeekClick(week)}
            className={`${styles.weekCard} ${
              week === currentWeek ? styles.active : ''
            }`}
          >
            <span className={styles.weekNumber}>{week}</span>
            <span className={styles.weekText}>Тиждень</span>
          </button>
        ))}
      </div>
    </div>
  );
};
