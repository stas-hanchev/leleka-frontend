'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import styles from './DiaryEntryDetails.module.css';
import { useRouter } from 'next/navigation';
import { deleteDiaryNote } from '@/lib/api/diaryApi';
import type { DiaryNote } from '@/types/diary';
import AddDiaryEntryModal from '@/components/diary.modal/AddDiaryEntryModal';
import { useSelectedNoteStore } from '@/lib/store/selectedNoteStore';
import { useNoteModalStore } from '@/lib/store/modalNoteStore';

type Props = {
  _id: string | null;
  emptyText?: string;
  showMobileBack?: boolean;
  entry: DiaryNote;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}

export default function DiaryEntryDetails({
  _id,
  emptyText,
  showMobileBack,
  entry,
}: Props) {
  const qc = useQueryClient();

  const { isOpen, openNoteModal, closeNoteModal } = useNoteModalStore();
  const { selectedNote, setSelectedNote } = useSelectedNoteStore();
  const router = useRouter();
  const delMutation = useMutation({
    mutationFn: (id: string) => deleteDiaryNote(id),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['diaryEntries'] });
    },
  });

  const emotions = useMemo(() => entry?.categories ?? [], [entry?.categories]);

  if (!_id || !entry) {
    return (
      <section className={styles.wrap}>
        <div className={styles.placeholder}>
          {emptyText ?? 'Наразі записи у щоденнику відстні'}
        </div>
      </section>
    );
  }

  return (
    <section className={styles.wrap}>
      {showMobileBack && (
        <Link href="/diary" className={styles.back}>
          ← Назад
        </Link>
      )}

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h3 className={styles.title}>{entry.title}</h3>
          <time className={styles.date}>{formatDate(entry.date)}</time>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => {
              setSelectedNote(entry);
              openNoteModal();
            }}
          >
            Редагувати
          </button>

          {isOpen && (
            <AddDiaryEntryModal
              isOpen={isOpen}
              onClose={() => {
                closeNoteModal();
                setSelectedNote(null);
              }}
              note={selectedNote}
            />
          )}

          <button
            type="button"
            className={`${styles.iconBtn} ${styles.danger}`}
            onClick={() => {
              const ok = window.confirm('Видалити запис?');
              if (ok) delMutation.mutate(entry._id);
              router.push('/diary');
            }}
            disabled={delMutation.isPending}
          >
            Видалити
          </button>
        </div>
      </div>

      <div className={styles.body}>
        <p className={styles.text}>{entry.text}</p>

        {emotions.length > 0 && (
          <div className={styles.emotions}>
            {emotions.map((e) => (
              <span key={e} className={styles.emoji} title={e}>
                {e}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
