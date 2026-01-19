import { NextResponse } from 'next/server';
import { lehlekaApi } from '../../../api';
import { cookies } from 'next/headers';
import { logErrorResponse } from '../../../_utils/utils';
import { isAxiosError } from 'axios';
import { refreshTokenCookies } from '@/app/api/_utils/refreshTokenCookies';
import { setCookiesToResponse } from '@/app/api/_utils/setCookiesToResponse';

type Props = {
  params: Promise<{ taskId: string }>;
};

export async function PATCH(request: Request, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const setCookie = await refreshTokenCookies();
    const cookie = setCookie ? setCookie.join(',') : cookieStore.toString(); 
    

    const { taskId } = await params;
    const body = await request.json();

    const payload = typeof body === 'boolean' ? { isDone: body } : body;

    const apiRes = await lehlekaApi.patch(`/tasks/${taskId}/status`, payload, {
      headers: {
        Cookie: cookie,
      },
    });
    const response = setCookie ? setCookiesToResponse(setCookie, NextResponse.json(apiRes.data)) : NextResponse.json(apiRes.data);
    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 500 }
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
