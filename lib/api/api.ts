import axios from "axios";

const baseURL = `${process.env.NEXT_PUBLIC_SITE_API_URL}/api` || 'http://localhost:3000/api';

// const baseURL = 'http://localhost:3000/api';

// axios.defaults.withCredentials = true;
export const NextServer = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});
