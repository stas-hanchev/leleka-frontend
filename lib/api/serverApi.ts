import { cookies } from "next/headers";
import { NextServer } from "./api";
import axios from 'axios';

import type { User } from "@/types/user";

export async function getCurrentUserServer(): Promise<User> {
  const cookieStore = await cookies();

  const res = await NextServer.get<User>("/users/current", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
}

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await NextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};



export const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  // withCredentials тут не обов’язково, бо ми будемо явно додавати Authorization/Cookie
});