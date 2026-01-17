import clientApi from "./clientApi";
import type {
  DiaryEntry,
  DiaryEntryCreateDto,
  DiaryEntryUpdateDto,
} from "@/types/diary";

export async function getDiaryEntries(): Promise<DiaryEntry[]> {
  const { data } = await clientApi.get<DiaryEntry[]>("/diaries");
  return data;
}

export async function getDiaryEntry(entryId: string): Promise<DiaryEntry> {
  const { data } = await clientApi.get<DiaryEntry>(`/diaries/${entryId}`);
  return data;
}

export async function createDiaryEntry(
  payload: DiaryEntryCreateDto
): Promise<DiaryEntry> {
  const { data } = await clientApi.post<DiaryEntry>("/diaries", payload);
  return data;
}

export async function updateDiaryEntry(
  entryId: string,
  payload: DiaryEntryUpdateDto
): Promise<DiaryEntry> {
  const { data } = await clientApi.patch<DiaryEntry>(
    `/diaries/${entryId}`,
    payload
  );
  return data;
}

export async function deleteDiaryEntry(entryId: string): Promise<void> {
  await clientApi.delete(`/diaries/${entryId}`);
}
