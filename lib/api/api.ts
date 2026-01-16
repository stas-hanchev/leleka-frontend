// import axios from "axios";

// const baseURL = process.env.NEXT_SITE_API_URL + "/api";

// export const NextServer = axios.create({
//   baseURL: "/api",
//   withCredentials: true,
// });

import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3050';

export const NextServer = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});