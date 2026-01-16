import axios from "axios";
import { DiaryEntry } from "@/types/diary";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getDiaryById = async (id: string): Promise<DiaryEntry> => {
  const { data } = await api.get(`/diaries/${id}`);
  return data;
};
