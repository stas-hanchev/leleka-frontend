import axios from "axios";
import { NextServer } from "./api";
import type { User, UpdateUserPayload } from "@/types/user";

export const checkSession = async (): Promise<boolean> => {
  try {
    await axios.get("/api/auth/session");
    return true;
  } catch {
    return false;
  }
};

export const getMe = async (): Promise<User | null> => {
  try {
    const { data } = await axios.get<User>("/api/auth/session");
    return data;
  } catch {
    return null;
  }
};

export async function getCurrentUser(): Promise<User> {
  const { data } = await NextServer.get<User>("api/users/current");
  return data;
}

export async function updateUser(userData: UpdateUserPayload): Promise<User> {
  const { data } = await NextServer.patch<User>("api/users/current", userData);
  return data;
}

export async function uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
  const formData = new FormData();
  formData.append("avatar", file);

  const { data } = await NextServer.patch<{ avatarUrl: string }>(
    "api/users/avatar",
    formData,
  );

  return data;
}
