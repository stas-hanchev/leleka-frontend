'use client';

import { useQuery } from '@tanstack/react-query';
import { getDiaryEntries } from '@/lib/api/diaryApi';
import styles from './DiaryEntryPage.module.css';
import DiaryEntryDetails from '@/components/diary/DiaryEntryDetails/DiaryEntryDetails';
import { use, useEffect } from 'react';
import { useSelectedNoteStore } from '@/lib/store/selectedNoteStore';

type Props = {
  params: Promise<{ entryId: string }>;
};

export default function DiaryEntryPage({ params }: Props) {
  const resolvedParams = use(params);
  const entryId = resolvedParams.entryId;
  const setSelectedNote = useSelectedNoteStore(
    (state) => state.setSelectedNote
  );

  const {
    data: entries = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['diaryEntries'],
    queryFn: getDiaryEntries,
  });

  const entry = entries.find((e) => e._id === entryId);

  useEffect(() => {
    if (entry) {
      setSelectedNote(entry);
    }
    return () => setSelectedNote(null);
  }, [entry, setSelectedNote]);

  if (isLoading) return <div className={styles.page}>Завантаження...</div>;
  if (isError) return <div className={styles.page}>Помилка завантаження</div>;
  if (!entry) return <div className={styles.page}>Запис не знайдено</div>;

  return (
    <div className={styles.page}>
      <DiaryEntryDetails _id={entryId} entry={entry} showMobileBack />
    </div>
  );
}
