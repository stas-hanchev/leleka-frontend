"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "./DiaryPage.module.css";

import GreetingBlock from "@/components/diary/GreetingBlock/GreetingBlock";
import DiaryList from "@/components/diary/DiaryList/DiaryList";
import DiaryEntryDetails from "@/components/diary/DiaryEntryDetails/DiaryEntryDetails";
import { getDiaryEntries } from "@/lib/api/diaryApi";
import type { DiaryEntry } from "@/types/diary";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

export default function DiaryPage() {
  const isDesktop = useMediaQuery("(min-width: 1440px)");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["diaryEntries"],
    queryFn: getDiaryEntries,
  });

  const entries = data ?? [];

  const firstId = useMemo(() => entries[0]?.id ?? null, [entries]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (!isDesktop) return;
    setSelectedId((prev) => prev ?? firstId);
  }, [isDesktop, firstId]);

  return (
    <div className={styles.page}>
      <GreetingBlock />

      <div className={styles.content}>
        <div className={styles.listCol}>
          <DiaryList
            entries={entries}
            isLoading={isLoading}
            isError={isError}
            selectedId={selectedId}
            onSelect={(id) => setSelectedId(id)}
            mode={isDesktop ? "desktop" : "mobile"}
          />
        </div>
        {isDesktop && (
          <div className={styles.detailsCol}>
            <DiaryEntryDetails
              entryId={selectedId}
              emptyText="Наразі записи у щоденнику відстні"
            />
          </div>
        )}
      </div>
    </div>
  );
}
