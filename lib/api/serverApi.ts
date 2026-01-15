import { cookies } from "next/headers";
import { NextServer } from "./api";

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
