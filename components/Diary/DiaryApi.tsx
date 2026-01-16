import axios from "axios";
import { DiaryEntry } from "@/types/diary";


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getDiaries = async (): Promise<DiaryEntry[]> => {
  const { data } = await api.get("/diaries");
  return data;
};

export const getDiaryById = async (id: string): Promise<DiaryEntry> => {
  const { data } = await api.get(`/diaries/${id}`);
  return data;
};

export const createDiary = async (payload: Partial<DiaryEntry>) => {
  const { data } = await api.post("/diaries", payload);
  return data;
};

export const updateDiary = async (id: string, payload: Partial<DiaryEntry>) => {
  const { data } = await api.put(`/diaries/${id}`, payload);
  return data;
};

export const deleteDiary = async (id: string) => {
  await api.delete(`/diaries/${id}`);
};



// store/diaryStore.ts
import { create } from "zustand";

interface DiaryState {
  selectedEntryId: string | null;
  setSelectedEntryId: (id: string) => void;
}

export const useDiaryStore = create<DiaryState>((set) => ({
  selectedEntryId: null,
  setSelectedEntryId: (id) => set({ selectedEntryId: id }),
}));




