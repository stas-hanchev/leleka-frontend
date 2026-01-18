import axios from 'axios';
import { BabyDevelopmentData, MomBodyData } from '@/types/weeks';
import { NextServer } from '../api/api';

// axios.defaults.withCredentials = true;

export const getBabyDevelopment = async (
  weekNumber: number
): Promise<BabyDevelopmentData> => {
  // const res = await axios.get(${API_URL}/${weekNumber}/baby, {
  //   withCredentials: true,
  // });
  // return res.data;
  const res = await NextServer.get(`/${weekNumber}/baby`);
  return res.data;
};

export const getMomBody = async (weekNumber: number): Promise<MomBodyData> => {
  // const res = await axios.get(${API_URL}/${weekNumber}/body, {
  // withCredentials: true,
  // });
  // return res.data;
  console.log(`!!!Weeknumber`, weekNumber);
  const res = await NextServer.get(`/${weekNumber}/body`);
  return res.data;
};
