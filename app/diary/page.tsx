'use client';

import GreetingBlock from "@/components/Diary/GreetingBlock";
import DiaryList from "@/components/Diary/DiaryList/DiaryList";
import DiaryEntryDetails from "@/components/Diary/DiaryEntryDetails/DiaryEntryDetails";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import styles from "./DiaryPage.module.css";

export default function DiaryPage() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <div className={styles.container}>
      <GreetingBlock />

      {isDesktop ? (
        <div className={styles.grid}>
          <DiaryList />
          <DiaryEntryDetails />
        </div>
      ) : (
        <DiaryList />
      )}
    </div>
  );
}
