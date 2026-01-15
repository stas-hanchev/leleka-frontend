import axios from 'axios';
import { BabyDevelopmentData, MomBodyData } from '@/types/weeks';

const API_URL = 'http://localhost:3050/api/weeks';

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
