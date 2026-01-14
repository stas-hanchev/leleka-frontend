import { cookies } from 'next/headers';
import { NextServer } from './api';

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await NextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};
