export interface GreetingResponse {
  curWeekToPregnant: number;
  daysBeforePregnant: number;
  babyToday: {
    babySize: number;
    babyWeight: number;
    babyActivity: string;
    babyDevelopment: string;
    image: string;
  };
  momHint: string;
}

export interface BabyDetails {
  analogy: string;
  image: string;
  description: string[];
  interestingFact: string;
}

export interface MomDetails {
  feelings: {
    states: string[];
    sensationDescr: string;
  };
  comfortTips: {
    category: string;
    tip: string;
  }[];
}
