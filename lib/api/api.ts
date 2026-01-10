// import axios from "axios";

// const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api'

// export const NextServer = axios.create({
//     baseURL: baseURL,
//     withCredentials: true,

// })

import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const NextServer = axios.create({
  baseURL,
  withCredentials: true,
});

export const getUserProfile = async () => {
  const { data } = await NextServer.get("/users/me");
  return data;
};

export const updateUserProfile = async (payload: {
  name?: string;
  email?: string;
  childGender?: string;
  dueDate?: string;
}) => {
  const { data } = await NextServer.patch("/users/me", payload);
  return data;
};

export const uploadProfilePhoto = async (file: File) => {
  const formData = new FormData();
  formData.append("avatar", file);

  const { data } = await NextServer.patch("/users/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};
