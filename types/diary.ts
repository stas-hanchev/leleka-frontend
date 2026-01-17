export type DiaryEmotion =
  | "натхнення"
  | "любов"
  | "енергія"
  | "нудота"
  | "тривога"
  | "апетит"
  | "радість"
  | "щастя"
  | "вдячність";

export type DiaryEntry = {
  id: string;
  title: string;
  content: string;
  emotions: DiaryEmotion[];
  createdAt: string;
};

export type DiaryEntryCreateDto = {
  title: string;
  content: string;
  emotions: DiaryEmotion[];
};

export type DiaryEntryUpdateDto = Partial<DiaryEntryCreateDto>;
