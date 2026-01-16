import { Task } from '@/types/task';
import { NextServer } from './api';
import axios from 'axios';

export interface TasksResponce {
  tasks: Task[];
  totalCount?: number;
  totalPages?: number;
  page?: number;
}

export interface CreateTaskBody {
  name: string;
  date: string;
}

export async function fetchTasks(): Promise<TasksResponce> {
  try {
    const res = await NextServer.get('/api/tasks');

    return {
      tasks: res.data.data || [],
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return { tasks: [] };
    }
    throw error;
  }
}

export async function createTask(body: CreateTaskBody): Promise<Task> {
  const res = await NextServer.post('/api/tasks', body);

  if (res.status !== 201) {
    throw new Error('Не вдалося створити завдання');
  }

  return res.data.data;
}

export async function updateTaskStatus(
  taskId: string,
  isDone: boolean
): Promise<Task> {
  const res = await NextServer.patch(`/api/tasks/${taskId}/status`, { isDone });

  if (res.status !== 200) {
    throw new Error('Не вдалося оновити статус завдання');
  }

  return res.data.data;
}
