import { NextRequest, NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { NextServer } from '../../api/api';
import { BLOCKED_RESPONSE_HEADERS } from '@/lib/constants/constants';

const BLOCKED_RESPONSE_HEADERS_SET = new Set(BLOCKED_RESPONSE_HEADERS);

export async function proxyRequest(req: NextRequest, backendPath?: string): Promise<NextResponse> {
  try {
   
    if (!backendPath) backendPath = '/';
    if (!backendPath.startsWith('/')) backendPath = '/' + backendPath;

    console.log('[Proxy] backendPath:', backendPath);

    const method = req.method;

   
    const body =
      method !== 'GET' && method !== 'HEAD'
        ? await req.json().catch(() => undefined)
        : undefined;

    
    const headers: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      headers[key] = value;
    });

    
    const apiRes = await NextServer.request({
      url: backendPath,
      method,
      data: body,
      headers,
    });

  
    const responseHeaders: Record<string, string> = {};
    Object.entries(apiRes.headers).forEach(([key, value]) => {
      const lowerKey = key.toLowerCase();
      if (typeof value === 'string' && !BLOCKED_RESPONSE_HEADERS_SET.has(lowerKey)) {
        responseHeaders[key] = value;
      }
    });

   
    return NextResponse.json(apiRes.data, {
      status: apiRes.status,
      headers: responseHeaders,
    });

  } catch (error: unknown) {
    console.error('[Proxy] Error:', error);

    if (isAxiosError(error)) {
      return NextResponse.json(
        {
          message: 'Proxy error',
          data: error.response?.data,
        },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { message: 'Internal Server Error', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
