import { NextServer } from '@/lib/api/api';
import type {
  DiaryNote,
  DiaryEntryCreateDto,
  DiaryEntryUpdateDto,
  GetDiaryEntriesResponse,
} from '@/types/diary';

export async function getDiaryEntries(): Promise<DiaryNote[]> {
  const { data } = await NextServer.get<GetDiaryEntriesResponse>('/diaries');
  console.log('lox', data.data);

  return data.data;
}

export async function createDiaryNote(
  payload: DiaryEntryCreateDto
): Promise<DiaryNote> {
  const { data } = await NextServer.post<DiaryNote>('/diaries', payload);
  return data;
}

export async function updateDiaryNote(
  entryId: string,
  payload: DiaryEntryUpdateDto
): Promise<DiaryNote> {
  const { data } = await NextServer.patch<DiaryNote>(
    `/diaries/${entryId}`,
    payload
  );
  return data;
}

export async function deleteDiaryNote(entryId: string): Promise<void> {
  await NextServer.delete(`/diaries/${entryId}`);
}
