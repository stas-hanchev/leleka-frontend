export interface DiaryNote {
  _id: string;
  title: string;
  date: string;
  categories: string[];
  text: string;
}

export interface GetDiaryEntriesResponse {
  status: string;
  message: string;
  data: DiaryNote[];
}

export type DiaryEntryCreateDto = {
  title: string;
  content: string;
  emotions: string[];
};

export type DiaryEntryUpdateDto = Partial<DiaryEntryCreateDto>;
