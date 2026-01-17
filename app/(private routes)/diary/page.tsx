'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styles from './DiaryPage.module.css';

import GreetingBlock from '@/components/diary/GreetingBlock/GreetingBlock';
import DiaryList from '@/components/diary/DiaryList/DiaryList';
import DiaryEntryDetails from '@/components/diary/DiaryEntryDetails/DiaryEntryDetails';
import { getDiaryEntries } from '@/lib/api/diaryApi';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';

export default function DiaryPage() {
  const isDesktop = useMediaQuery('(min-width: 1440px)');

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['diaryEntries'],
    queryFn: getDiaryEntries,
  });

  const entries = data;

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const activeId = useMemo(() => {
    if (!isDesktop) return null;
    return selectedId ?? entries[0]?._id ?? entries[0]?._id ?? null;
  }, [isDesktop, selectedId, entries]);
  return (
    <div className={styles.page}>
      <GreetingBlock />

      <div className={styles.content}>
        <div className={styles.listCol}>
          <DiaryList
            entries={entries}
            isLoading={isLoading}
            isError={isError}
            selectedId={activeId}
            onSelect={(id: string) => setSelectedId(id)}
            mode={isDesktop ? 'desktop' : 'mobile'}
          />
        </div>

        {isDesktop && (
          <div className={styles.detailsCol}>
            <DiaryEntryDetails
              _id={activeId}
              entry={entries.find((e) => e._id === activeId)!}
              emptyText="Наразі записи у щоденнику відстні"
            />
          </div>
        )}
      </div>
    </div>
  );
}
