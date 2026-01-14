export interface BabyDevelopmentData {
  babyDevelopment: string;
  image: string;
  interestingFact: string;
}

export interface MomBodyData {
  feelings: {
    states: string[];
    sensationDescr: string;
  };
  comfortTips: {
    category: string;
    tip: string;
  }[];
}
