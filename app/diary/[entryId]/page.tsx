// /diary/[entryId] (мобілка)

'use client';

import DiaryEntryDetails from "@/components/Diary/DiaryEntryDetails";

type Props = {
  params: { entryId: string };
};

export default function DiaryEntryPage({ params }: Props) {
  return <DiaryEntryDetails entryId={params.entryId} />;
}
