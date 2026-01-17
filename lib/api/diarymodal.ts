import { DiaryNote } from '@/types/diary';
import { NextServer } from './api';

export interface FetchNotesResponse {
  data: DiaryNote[];
}

interface NoteDiaryProps {
  title: string;
  text: string;
  categories: string[];
}
export const createNote = async (
  values: NoteDiaryProps
): Promise<DiaryNote> => {
  const dataForBackend = {
    title: values.title,
    categories: values.categories,
    text: values.text,
  };
  const response = await NextServer.post('/api/diaries', dataForBackend);
  return response.data;
};

export const updateNote = async (
  id: string,
  note: NoteDiaryProps
): Promise<DiaryNote> => {
  console.log(note);
  const response = await NextServer.patch<DiaryNote>(
    `/api/diaries/${id}`,
    note
  );
  return response.data;
};

export const getNotes = async (): Promise<FetchNotesResponse> => {
  const response = await NextServer.get('/api/diaries');
  return response;
};
export const deleteNote = async (id: string): Promise<void> => {
  const response = await NextServer.delete(`/api/diaries/${id}`);
  return response.data;
};
