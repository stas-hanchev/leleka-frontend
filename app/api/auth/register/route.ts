import { NextRequest, NextResponse } from 'next/server';
import { NextServer } from '@/lib/api/api';
import { isAxiosError } from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiRes = await NextServer.post('/auth/register', body);

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error: unknown) {
    console.error(error);

    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.message || error.message },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}
