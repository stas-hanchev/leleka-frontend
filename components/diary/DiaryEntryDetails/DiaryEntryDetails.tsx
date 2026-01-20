'use client';

import { useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import styles from './DiaryEntryDetails.module.css';
import { useRouter } from 'next/navigation';
import { deleteDiaryNote } from '@/lib/api/diaryApi';
import type { DiaryNote } from '@/types/diary';
import AddDiaryEntryModal from '@/components/diary.modal/AddDiaryEntryModal';
import { useSelectedNoteStore } from '@/lib/store/selectedNoteStore';
import { useNoteModalStore } from '@/lib/store/modalNoteStore';
import { useState } from 'react';
import { ConfirmationModal } from '@/components/ConfirmationModal/ConfirmationModal';

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
              onClick={() => setIsDeleteModalOpen(true)}
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
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Ви точно хочете видалити запис?"
        confirmButtonText="Видалити"
        cancelButtonText="Скасувати"
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={async () => {
          await delMutation.mutateAsync(entry._id);
          setIsDeleteModalOpen(false);
          router.push('/diary');
        }}
      />
    </section>
  );
}
