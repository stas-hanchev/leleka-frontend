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
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.actions}>
            <h3 className={styles.title}>{entry.title}</h3>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={() => {
                setSelectedNote(entry);
                openNoteModal();
              }}
            >
              <svg width="24" height="24">
                <use href="/icon-sprite.svg#icon-edit"></use>
              </svg>
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
          </div>
          <div className={styles.deleteSection}>
            <time className={styles.date}>{formatDate(entry.date)}</time>
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
              <svg width="17" height="19">
                <use href="/icon-sprite.svg#icon-delete"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <p className={styles.text}>{entry.text}</p>

        {emotions.length > 0 && (
          <div className={styles.emotions} aria-label="Емоції">
            {emotions.map((e, index) => (
              <span key={index} className={styles.tag}>
                {e}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
