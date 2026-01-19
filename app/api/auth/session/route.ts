import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { lehlekaApi } from '../../api';
import { isAxiosError } from 'axios';


export async function GET() {
  try {
    const cookieStore = await cookies();

    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const apiRes = await lehlekaApi.post('/auth/refresh', {}, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    const response = NextResponse.json(apiRes.data, { status: 200 });
    const setCookie = apiRes.headers['set-cookie'];

    if (setCookie) {
        const cookiesArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        cookiesArray.forEach((cookie) => {
          response.headers.append('set-cookie', cookie);
        });
    }
    
    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message || 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
