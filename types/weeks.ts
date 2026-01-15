export interface BabyDevelopmentData {
  babyDevelopment: string;
  image: string;
  interestingFact: string;
}

export interface ComfortTip {
  _id: string;
  category: string;
  tip: string;
}

export interface Feelings {
  states: string[];
  sensationDescr: string;
}

export interface MomBodyData {
  feelings: Feelings;
  comfortTips: ComfortTip[];
}
