import { NextServer } from './api';

export const logout = async (): Promise<void> => {
  await NextServer.post('/api/auth/logout');
};
