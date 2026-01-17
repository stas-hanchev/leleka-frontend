import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3050";

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createNote = async (values: any) => {
  const data = {
    title: values.title,
    categories: values.tags,
    text: values.content,
  };
  const response = await api.post("/diary", data);
  return response.data;
};

export const updateNote = async (id: string, values: any) => {
  const dataForBackend = {
    title: values.title,
    categories: values.tags,
    text: values.content,
  };
  const response = await api.patch(`/diary/${id}`, dataForBackend);
  return response.data;
};

export const getNotes = async () => {
  const response = await api.get("/diary");
  return response.data;
};
export const deleteNote = async (id: string) => {
  const response = await api.delete(`/diary/${id}`);
  return response.data;
};
