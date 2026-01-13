import { User, UserData } from "@/types/user";
import { BabyDetails, GreetingResponse, MomDetails } from "@/types/journey";
import { lehlekaApi } from "@/app/api/api";

export interface SessionResponse {
  success: boolean;
}

interface UserRegisterData {
  name: string;
  email: string;
  password: string;
}

interface UserLoginData {
  email: string;
  password: string;
}

export interface Emotion {
  _id: string;
  title: string;
}

// Аутентифікація

export async function registerUser(userData: UserRegisterData) {
  const res = await lehlekaApi.post("/auth/register", userData);
  console.log("Frontend responce :", res);
  return res;
}

export async function loginUser(userData: UserLoginData): Promise<User> {
  const res = await lehlekaApi.post<User>("/auth/login", userData);
  console.log(res);
  return res.data;
}

export async function logoutUser(): Promise<void> {
  await lehlekaApi.post("/auth/logout");
}

export async function getUser(): Promise<UserData> {
  const res = await lehlekaApi.get("/users/current");
  return res.data;
}

export async function checkServerSession(): Promise<SessionResponse> {
  const res = await lehlekaApi.get("/auth/session");
  return res.data;
}

export async function fetchEmotions(): Promise<{
  emotions: Emotion[];
  limit: number;
  page: number;
  totalCount: number;
  totalPages: number;
}> {
  const res = await lehlekaApi.get("/emotions");

  return res.data;
}

// Подорож

export async function getGreeting(
  isAuthorized: boolean
): Promise<GreetingResponse> {
  const endpoint = isAuthorized ? "/weeks/dashboard" : "/weeks/public";
  const { data } = await lehlekaApi.get<GreetingResponse>(endpoint);
  return data;
}

export async function getBabyDetails(weekNumber: number): Promise<BabyDetails> {
  const { data } = await lehlekaApi.get<BabyDetails>(
    `/weeks/${weekNumber}/baby`
  );
  return data;
}

export async function getMomDetails(weekNumber: number): Promise<MomDetails> {
  const { data } = await lehlekaApi.get<MomDetails>(`/weeks/${weekNumber}/mom`);
  return data;
}

export interface UserToUpdate {
  name?: string;
  email?: string;
  dueDate?: string;
  babyGender?: string;
}

export const updateUser = async (updatedUser: UserToUpdate) => {
  const { data } = await lehlekaApi.patch<User>("/users/current", updatedUser);
  return data;
};

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("avatar", file);

  const res = await lehlekaApi.patch<User>("/users/current/avatars", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
