"use client";

import { useMemo, useState } from "react";
import styles from "./DiaryList.module.css";
import type { DiaryEntry } from "@/types/diary";
import DiaryEntryCard from "../DiaryEntryCard/DiaryEntryCard";
import AddDiaryEntryModal from "../AddDiaryEntryModal/AddDiaryEntryModal";

type Props = {
  entries: DiaryEntry[];
  isLoading: boolean;
  isError: boolean;
  selectedId: string | null;
  onSelect: (id: string) => void;
  mode: "desktop" | "mobile";
};

export default function DiaryList({
  entries,
  isLoading,
  isError,
  selectedId,
  onSelect,
  mode,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const content = useMemo(() => {
    if (isLoading) return <div className={styles.info}>Завантаження...</div>;
    if (isError) return <div className={styles.info}>Помилка завантаження</div>;
    if (!entries.length)
      return <div className={styles.info}>Поки що немає записів</div>;

    return (
      <ul className={styles.list}>
        {entries.map((e) => (
          <li key={e.id} className={styles.item}>
            <DiaryEntryCard
              entry={e}
              isActive={mode === "desktop" ? selectedId === e.id : false}
              mode={mode}
              onClick={() => onSelect(e.id)}
            />
          </li>
        ))}
      </ul>
    );
  }, [entries, isLoading, isError, mode, onSelect, selectedId]);

  return (
    <section className={styles.wrap}>
      <div className={styles.header}>
        <h3 className={styles.h3}>Ваші записи</h3>

        <button
          type="button"
          className={styles.addBtn}
          onClick={() => setIsModalOpen(true)}
        >
          <span className={styles.addText}>Новий запис</span>
          <span className={styles.addIcon} aria-hidden>
            +
          </span>
        </button>
      </div>

      <div className={styles.scrollArea}>{content}</div>

      <AddDiaryEntryModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
