import axios from 'axios';
import { BabyDevelopmentData, MomBodyData } from '@/types/weeks';

export const getBabyDevelopment = async (
  weekNumber: number
): Promise<BabyDevelopmentData> => {
  const { data } = await axios.get(`/api/weeks/${weekNumber}/baby`);
  return data;
};

export const getMomBody = async (weekNumber: number): Promise<MomBodyData> => {
  const { data } = await axios.get(`/api/weeks/${weekNumber}/body`);
  return data;
};
