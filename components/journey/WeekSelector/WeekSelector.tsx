'use client';

import React, { useEffect, useRef } from 'react';
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
  const activeWeekRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeWeekRef.current) {
      activeWeekRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentWeek]);

  const handleWeekClick = (week: number) => {
    if (week <= maxWeek) {
      router.push(`/journey/${week}`);
    }
  };

  const weeks = Array.from({ length: 40 }, (_, i) => i + 1);

  return (
    <div className={styles.weekContainer}>
      {weeks.map((week) => {
        const isFuture = week > maxWeek;
        const isSelected = week === currentWeek;

        return (
          <button
            key={week}
            ref={isSelected ? activeWeekRef : null}
            onClick={() => handleWeekClick(week)}
            className={`${styles.weekButton} ${
              isSelected ? styles.active : ''
            } ${isFuture ? styles.disabled : ''}`}
            disabled={isFuture}
          >
            <span className={styles.weekNumber}>{week}</span>
            <span className={styles.weekText}>тиждень</span>
          </button>
        );
      })}
    </div>
  );
};

export default WeekSelector;
