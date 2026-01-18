import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';
import { lehlekaApi } from '../../api';

export async function PATCH(req: Request) {
  try {
    const cookieStore = await cookies();
    const body = await req.json();

    const { data } = await lehlekaApi.patch('/users/current', body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return NextResponse.json(err.response?.data ?? { error: err.message }, {
        status: err.response?.status ?? 500,
      });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const { data } = await lehlekaApi.get('/users/current',
      {
        headers: {
        Cookie: cookieStore.toString(),
      }
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