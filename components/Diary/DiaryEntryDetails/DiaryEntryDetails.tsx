// components/Diary/DiaryEntryDetails/DiaryEntryDetails.tsx
'use client';

import { useQuery } from "@tanstack/react-query";

import { getDiaryById } from "@/components/Diary/DiaryApi";
import styles from "./DiaryEntryDetails.module.css";
import { DiaryEntry } from "@/types/diary";
import { useDiaryStore } from "@/lib/store/diaryStore";


interface Props {
  entryId?: string;
}

export default function DiaryEntryDetails({ entryId }: Props) {
  // Використовуємо ID з пропсів або зі стану
  const selectedId = entryId ?? useDiaryStore((s) => s.selectedEntryId);

  const { data, isLoading, error } = useQuery<DiaryEntry>({
    queryKey: ["diary", selectedId],
    queryFn: () => getDiaryById(selectedId as string),
    enabled: !!selectedId,
  });

  if (!selectedId) {
    return <p className={styles.placeholder}>Наразі записи у щоденнику відсутні</p>;
  }

  if (isLoading) return <p>Завантаження...</p>;
  if (error || !data) return <p>Помилка завантаження запису</p>;

  return (
    <article className={styles.wrapper}>
      <h2 className={styles.title}>{data.note}</h2>
      <p className={styles.date}>{new Date(data.date).toLocaleDateString()}</p>

      {data.emotions?.length ? (
        <div className={styles.emotions}>
          {data.emotions.map((emo: string, i: number) => (
            <span key={i} className={styles.emoji}>{emo}</span>
          ))}
        </div>
      ) : null}

      <div className={styles.actions}>
        <button className={styles.edit}>Редагувати</button>
        <button className={styles.delete}>Видалити</button>
      </div>
    </article>
  );
}
