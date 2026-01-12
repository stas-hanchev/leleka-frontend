export interface BabyToday {
  babySize: number;
  babyWeight: number;
  babyActivity: string;
  babyDevelopment: string;
  image: string;
}

export interface BabyDataResponse {
  curWeekToPregnant: number;
  daysBeforePregnant: number;
  babyToday: BabyToday;
  momHint: string;
}
