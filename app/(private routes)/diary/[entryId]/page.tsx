"use client";

import styles from "./DiaryEntryPage.module.css";
import DiaryEntryDetails from "@/components/diary/DiaryEntryDetails/DiaryEntryDetails";

type Props = {
  params: { entryId: string };
};

export default function DiaryEntryPage({ params }: Props) {
  return (
    <div className={styles.page}>
      <DiaryEntryDetails entryId={params.entryId} showMobileBack />
    </div>
  );
}
