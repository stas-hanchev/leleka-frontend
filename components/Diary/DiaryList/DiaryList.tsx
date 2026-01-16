'use client';

import { useQuery } from "@tanstack/react-query";
import { getDiaries } from "@/components/Diary/DiaryApi";
import DiaryEntryCard from "../DiaryEntryCard/DiaryEntryCard";

import styles from "./DiaryList.module.css";

export default function DiaryList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["diaries"],
    queryFn: getDiaries,
  });

  if (isLoading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка завантаження</p>;

  if (!data || data.length === 0) {
    return <p className={styles.empty}>Наразі записи у щоденнику відстні</p>;
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Щоденник</h1>
        <button className={styles.addButton}>Новий запис</button>
      </div>

      <div className={styles.list}>
        {data.map((entry) => (
          <DiaryEntryCard key={entry._id} entry={entry} />
        ))}
      </div>
    </section>
  );
}
