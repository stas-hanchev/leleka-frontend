'use client';

import Link from 'next/link';
import styles from './DiaryEntryCard.module.css';
import type { DiaryNote } from '@/types/diary';
import { emotionToEmoji } from '../diaryEmojis';

type Props = {
  entry: DiaryNote;
  isActive: boolean;
  mode: 'desktop' | 'mobile';
  onClick: () => void;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}

export default function DiaryNoteCard({
  entry,
  isActive,
  mode,
  onClick,
}: Props) {
  const emotions = entry.categories.slice(0, 3);

  const inner = (
    <article className={`${styles.card} ${isActive ? styles.active : ''}`}>
      <div className={styles.top}>
        <h4 className={styles.title}>{entry.title}</h4>
        <time className={styles.date}>{formatDate(entry.date)}</time>
      </div>

      <div className={styles.emotions} aria-label="Емоції">
        {emotions.map((e) => (
          <span key={e} className={styles.emoji} title={e}>
            {emotionToEmoji[e]}
          </span>
        ))}
      </div>
    </article>
  );

  if (mode === 'mobile') {
    return (
      <Link href={`/diary/${entry._id}`} className={styles.link}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" className={styles.btnReset} onClick={onClick}>
      {inner}
    </button>
  );
}
