import { cookies } from "next/headers";
import { NextServer } from "./api";
import { Emotion } from "./clientApi";

export async function checkServerSession() {
  const cookieStore = await cookies();
  const res = await NextServer.get("/auth/sessions", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
}

export async function fetchEmotions(): Promise<{
  emotions: Emotion[];
  limit: number;
  page: number;
  totalCount: number;
  totalPages: number;
}> {
  const cookieStore = await cookies();
  const res = await NextServer.get("/emotions", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
}
