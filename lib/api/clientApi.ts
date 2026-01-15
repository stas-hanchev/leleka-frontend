import axios from "axios";
import { User } from "@/types/user";

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