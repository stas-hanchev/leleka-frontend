// import axios from "axios";
// import type { BabyDataResponse } from "@/types/baby";

import { BabyDataResponse } from '@/types/baby';
import { NextServer } from './api';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;
// axios.defaults.withCredentials = true;

// // const api = axios.create({
// //   baseURL: API_URL + "/api",
// //   withCredentials: true,
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// // });

// export const getBabyData = async (
//   isAuth: boolean
// ): Promise<BabyDataResponse> => {
//   const endpoint = isAuth
//     ? ${api.defaults.baseURL}/weeks/dashboard
//     : ${api.defaults.baseURL}/weeks/public;

//   try {
//     const res = await api.get<BabyDataResponse>(endpoint, {
//       headers: { Accept: "application/json" },
//       withCredentials: isAuth,
//     });

//     return res.data;
//   } catch (error) {
//     console.error("Помилка при отриманні даних з бекенду:", error);
//     throw error;
//   }
// };

export const getBabyData = async (
  isAuth: boolean
): Promise<BabyDataResponse> => {
  const endpoint = isAuth ? `/weeks/dashboard` : `/weeks/public`;

  try {
    const res = await NextServer.get<BabyDataResponse>(endpoint, {
      headers: { Accept: 'application/json' },
      withCredentials: isAuth,
    });

    return res.data;
  } catch (error) {
    console.error('Помилка при отриманні даних з бекенду:', error);
    throw error;
  }
};
