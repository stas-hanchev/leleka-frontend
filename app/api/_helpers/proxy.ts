import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api/api';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { isAxiosError } from 'axios';

export async function proxyRequest(req: NextRequest, backendPath: string) {
  try {
    const method = req.method;
    const body =
      method !== 'GET' && method !== 'HEAD'
        ? await req.json().catch(() => undefined)
        : undefined;

    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    const headers: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      headers[key] = value;
    });

    if (accessToken || refreshToken) {
      headers['Cookie'] = `accessToken=${accessToken ?? ''}; refreshToken=${refreshToken ?? ''}`;
    }

    const apiRes = await api.request({
      url: backendPath,
      method,
      data: body,
      headers,
    });

    const setCookie = apiRes.headers['set-cookie'];
    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);

        const options: Record<string, string | Date | number | undefined> = {
          path: parsed.Path ?? '/',
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
        };

        if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options);
        if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options);
      }
    }

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { message: error.message, data: error.response?.data },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
