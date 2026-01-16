import { create } from "zustand";

interface DiaryState {
  selectedEntryId: string | null;
  setSelectedEntryId: (id: string) => void;
}

export const useDiaryStore = create<DiaryState>((set) => ({
  selectedEntryId: null,
  setSelectedEntryId: (id) => set({ selectedEntryId: id }),
}));
