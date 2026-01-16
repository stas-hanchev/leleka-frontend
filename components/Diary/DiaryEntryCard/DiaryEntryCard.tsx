'use client';

import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useDiaryStore } from "@/lib/store/diaryStore";
import styles from "./DiaryEntryCard.module.css";

interface Props {
  entry: {
    _id: string;
    note?: string;
    date: string;
    emotions?: string[]; // додаємо список емоцій
  };
}

export default function DiaryEntryCard({ entry }: Props) {
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 1440px)");
  const setSelectedEntryId = useDiaryStore((s) => s.setSelectedEntryId);

  const handleClick = () => {
    if (isDesktop) {
      setSelectedEntryId(entry._id);
    } else {
      router.push(`/diary/${entry._id}`);
    }
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <h3 className={styles.title}>
        {entry.note ? `${entry.note.slice(0, 30)}...` : "Без тексту"}
      </h3>
      <p className={styles.date}>{new Date(entry.date).toLocaleDateString()}</p>

      <div className={styles.emotions}>
        {entry.emotions?.map((emo, i) => (
          <span key={i} className={styles.emoji}>{emo}</span>
        ))}
      </div>
    </div>
  );
}
