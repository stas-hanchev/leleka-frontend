import axios from 'axios';
import { BabyDevelopmentData, MomBodyData } from '@/types/weeks';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/weeks`;

axios.defaults.withCredentials = true;

export const getBabyDevelopment = async (
  weekNumber: number
): Promise<BabyDevelopmentData> => {
  const res = await axios.get(`${API_URL}/${weekNumber}/baby`, {
    withCredentials: true,
  });
  return res.data;
};

export const getMomBody = async (weekNumber: number): Promise<MomBodyData> => {
  const res = await axios.get(`${API_URL}/${weekNumber}/body`, {
    withCredentials: true,
  });
  return res.data;
};
