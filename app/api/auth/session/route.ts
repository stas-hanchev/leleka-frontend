import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { lehlekaApi } from '../../api';
import { isAxiosError } from 'axios';


export async function GET() {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Запит до бекенду "who am I"
    const apiRes = await lehlekaApi.get('auth/me', {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    });

    return NextResponse.json(apiRes.data, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
