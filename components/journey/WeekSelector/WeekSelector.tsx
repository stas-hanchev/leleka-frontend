'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './WeekSelector.module.css';

interface WeekSelectorProps {
  currentWeek: number;
  maxWeek: number;
}

const WeekSelector: React.FC<WeekSelectorProps> = ({
  currentWeek,
  maxWeek,
}) => {
  const router = useRouter();

  const handleWeekClick = (week: number) => {
    if (week <= maxWeek) {
      router.push(`/journey/${week}`);
    }
  };

  const weeks = Array.from({ length: 40 }, (_, i) => i + 1);

  return (
    <div className={styles.weekContainer}>
      {weeks.map((week) => (
        <button
          key={week}
          onClick={() => handleWeekClick(week)}
          className={`${styles.weekButton} ${
            week === currentWeek ? styles.active : ''
          } ${week > maxWeek ? styles.disabled : ''}`}
          disabled={week > maxWeek}
        >
          <span className={styles.weekNumber}>{week}</span>
          <span className={styles.weekText}>тиждень</span>
        </button>
      ))}
    </div>
  );
};

export default WeekSelector;
