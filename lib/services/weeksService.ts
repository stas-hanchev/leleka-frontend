import { NextServer } from '../api/api';

export const getBabyDevelopment = async (weekNumber: number) => {
  const { data } = await NextServer.get(`/weeks/${weekNumber}/baby`);
  return data;
};

export const getMomBody = async (weekNumber: number) => {
  const { data } = await NextServer.get(`/weeks/${weekNumber}/body`);
  return data;
};
