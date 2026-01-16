export interface BabyToday {
  babySize: number;
  babyWeight: number;
  babyActivity: string;
  babyDevelopment: string;
  image: string;
  momDailyTips: string[];
  interestingFact: string;
}

export interface BabyDataResponse {
  weekNumber: number;
  daysRemaining: number;
  babyData?: BabyToday;
}
