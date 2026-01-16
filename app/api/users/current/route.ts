import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { serverApi } from '@/lib/api/serverApi';
import axios from 'axios';

export async function PATCH(req: Request) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    const formData = await req.formData();

    const { data } = await serverApi.patch('/api/users/avatar', formData, {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
      // Content-Type не ставимо вручну для FormData
    });

    return NextResponse.json(data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return NextResponse.json(
        err.response?.data ?? { error: err.message },
        { status: err.response?.status ?? 500 }
      );
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}