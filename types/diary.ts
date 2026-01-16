// types/diary.ts
export interface DiaryEntry { 
  _id: string;
  note: string;
  date: string;
  emotions?: string[]; // додати, бо у записах можуть бути емоції
}



