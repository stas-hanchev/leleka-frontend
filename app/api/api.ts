import axios from 'axios';

export const NextServer = axios.create({
  baseURL: 'http://localhost:3050',
  withCredentials: true,
});