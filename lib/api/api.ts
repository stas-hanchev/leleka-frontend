import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3050';

axios.defaults.withCredentials = true;
export const NextServer = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});
