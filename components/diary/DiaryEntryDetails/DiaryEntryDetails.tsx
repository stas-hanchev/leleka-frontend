"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "./DiaryEntryDetails.module.css";

import { deleteDiaryEntry, getDiaryEntry } from "@/lib/api/diaryApi";
import type { DiaryEntry } from "@/types/diary";
import { emotionToEmoji } from "../diaryEmojis";
import AddDiaryEntryModal from "../AddDiaryEntryModal/AddDiaryEntryModal";

type Props = {
  entryId: string | null;
  emptyText?: string;
  showMobileBack?: boolean;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}

export default function DiaryEntryDetails({
  entryId,
  emptyText,
  showMobileBack,
}: Props) {
  const qc = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["diaryEntry", entryId],
    queryFn: () => getDiaryEntry(String(entryId)),
    enabled: Boolean(entryId),
  });

  const delMutation = useMutation({
    mutationFn: (id: string) => deleteDiaryEntry(id),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["diaryEntries"] });
    },
  });

  const entry = data as DiaryEntry | undefined;

  const emotions = useMemo(() => entry?.emotions ?? [], [entry?.emotions]);

  if (!entryId) {
    return (
      <section className={styles.wrap}>
        <div className={styles.placeholder}>
          {emptyText ?? "Наразі записи у щоденнику відстні"}
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className={styles.wrap}>
        <div className={styles.placeholder}>Завантаження...</div>
      </section>
    );
  }

  if (isError || !entry) {
    return (
      <section className={styles.wrap}>
        <div className={styles.placeholder}>Не вдалося завантажити запис</div>
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
          <time className={styles.date}>{formatDate(entry.createdAt)}</time>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => setEditOpen(true)}
          >
            Редагувати
          </button>

          {/* ConfirmationModal робить інший розробник — щоб НЕ ламати збірку,
              тут без імпорту. Коли модалка буде готова, підключите її тут.
          */}
          <button
            type="button"
            className={`${styles.iconBtn} ${styles.danger}`}
            onClick={() => {
              const ok = window.confirm("Видалити запис?");
              if (ok) delMutation.mutate(entry.id);
            }}
            disabled={delMutation.isPending}
          >
            Видалити
          </button>
        </div>
      </div>

      <div className={styles.body}>
        <p className={styles.text}>{entry.content}</p>

        {emotions.length > 0 && (
          <div className={styles.emotions}>
            {emotions.map((e) => (
              <span key={e} className={styles.emoji} title={e}>
                {emotionToEmoji[e]}
              </span>
            ))}
          </div>
        )}
      </div>

      <AddDiaryEntryModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        initialEntry={entry}
      />
    </section>
  );
}
