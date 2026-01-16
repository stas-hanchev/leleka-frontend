import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function POST() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('sessionId')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!sessionId || !refreshToken) {
    return NextResponse.json({ error: 'Missing session cookies' }, { status: 401 });
  }

  // ВАЖЛИВО: у тебе на Express це '/auth/refresh' (без /api)
  const res = await fetch(`${BACKEND_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      Cookie: `sessionId=${sessionId}; refreshToken=${refreshToken}`,
    },
  });

  const text = await res.text();
  const nextRes = new NextResponse(text, { status: res.status });

  // Прокидуємо Set-Cookie назад в браузер
  // (якщо бек віддає кілька cookies, Node fetch може злипати їх в один рядок —
  // але найчастіше працює і так, якщо бек коректно шле)
  const setCookie = res.headers.get('set-cookie');
  if (setCookie) {
    nextRes.headers.append('set-cookie', setCookie);
  }

  return nextRes;
}