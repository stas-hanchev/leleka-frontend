import axios from 'axios';

axios.defaults.withCredentials = true;
export const lehlekaApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: true,
});
