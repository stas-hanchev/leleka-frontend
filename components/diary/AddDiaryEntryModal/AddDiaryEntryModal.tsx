"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./AddDiaryEntryModal.module.css";
import type { DiaryEntry, DiaryEmotion } from "@/types/diary";
import { createDiaryEntry, updateDiaryEntry } from "@/lib/api/diaryApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  open: boolean;
  onClose: () => void;
  initialEntry?: DiaryEntry;
};

const allEmotions: DiaryEmotion[] = [
  "натхнення",
  "любов",
  "енергія",
  "нудота",
  "тривога",
  "апетит",
  "радість",
  "щастя",
  "вдячність",
];

export default function AddDiaryEntryModal({
  open,
  onClose,
  initialEntry,
}: Props) {
  const qc = useQueryClient();
  const [mounted, setMounted] = useState(false);

  const isEdit = Boolean(initialEntry);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [emotions, setEmotions] = useState<DiaryEmotion[]>([]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    setTitle(initialEntry?.title ?? "");
    setContent(initialEntry?.content ?? "");
    setEmotions(initialEntry?.emotions ?? []);
  }, [open, initialEntry]);

  const canSubmit = useMemo(
    () => title.trim().length >= 2 && content.trim().length >= 5,
    [title, content]
  );

  const createMut = useMutation({
    mutationFn: () =>
      createDiaryEntry({
        title: title.trim(),
        content: content.trim(),
        emotions,
      }),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["diaryEntries"] });
      onClose();
    },
  });

  const updateMut = useMutation({
    mutationFn: () =>
      updateDiaryEntry(String(initialEntry!.id), {
        title: title.trim(),
        content: content.trim(),
        emotions,
      }),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["diaryEntries"] });
      await qc.invalidateQueries({
        queryKey: ["diaryEntry", initialEntry!.id],
      });
      onClose();
    },
  });

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      onMouseDown={onClose}
    >
      <div className={styles.modal} onMouseDown={(e) => e.stopPropagation()}>
        <div className={styles.head}>
          <h3 className={styles.title}>
            {isEdit ? "Редагувати запис" : "Новий запис"}
          </h3>
          <button
            className={styles.close}
            type="button"
            onClick={onClose}
            aria-label="Закрити"
          >
            ✕
          </button>
        </div>

        <label className={styles.label}>
          Заголовок
          <input
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label className={styles.label}>
          Текст
          <textarea
            className={styles.textarea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>

        <div className={styles.emotions}>
          <p className={styles.emotionsTitle}>Емоції</p>
          <div className={styles.chips}>
            {allEmotions.map((e) => {
              const active = emotions.includes(e);
              return (
                <button
                  key={e}
                  type="button"
                  className={`${styles.chip} ${
                    active ? styles.chipActive : ""
                  }`}
                  onClick={() => {
                    setEmotions((prev) =>
                      prev.includes(e)
                        ? prev.filter((x) => x !== e)
                        : [...prev, e]
                    );
                  }}
                >
                  {e}
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.secondary} onClick={onClose}>
            Скасувати
          </button>

          <button
            type="button"
            className={styles.primary}
            disabled={!canSubmit || createMut.isPending || updateMut.isPending}
            onClick={() => (isEdit ? updateMut.mutate() : createMut.mutate())}
          >
            {isEdit ? "Зберегти" : "Створити"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
