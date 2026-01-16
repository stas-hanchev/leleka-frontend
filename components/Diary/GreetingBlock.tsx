// components/diary/GreetingBlock.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { getDiaries } from "@/components/Diary/DiaryApi";

import styles from './GreetingBlock.module.css';

export default function GreetingBlock() {
  const { data: diaries, isLoading, error } = useQuery({
    queryKey: ['diariesCount'],
    queryFn: getDiaries,
  });

  const diaryCount = diaries?.length ?? 0;

  if (isLoading) return <p className={styles.message}>Завантаження...</p>;
  if (error) return <p className={styles.message}>Помилка завантаження</p>;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.greeting}>Привіт! 👋</h2>
      <p className={styles.info}>
        У твоєму щоденнику зараз {diaryCount} {diaryCount === 1 ? 'запис' : 'записів'}.
      </p>
      <button className={styles.addButton}>Додати новий запис</button>
    </div>
  );
}
