import { NextRequest, NextResponse } from 'next/server';
import { checkServerSession } from './lib/api/serverApi';

const privateRoutes = [
  '/auth/logout',
  '/diaries',
  '/tasks',
  '/users/current',
  '/users/avatar',
  '/weeks/dashboard',
  '/weeks/',
];

const publicRoutes = [
  '/auth/register',
  '/auth/login',
  '/auth/refresh',
  '/auth/request-reset-email',
  '/auth/reset-password',
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // ✅ accessToken є — пускаємо
  if (accessToken) {
    if (isPublicRoute) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // ❌ accessToken нема, але є refreshToken → пробуємо refresh
  if (!accessToken && refreshToken) {
    try {
      const apiRes = await checkServerSession(); // ← бек повертає set-cookie

      const response = isPublicRoute
        ? NextResponse.redirect(new URL('/', request.url))
        : NextResponse.next();

      const setCookie = apiRes.headers['set-cookie'];
      if (setCookie) {
        const cookiesArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        cookiesArray.forEach((cookie) => {
          response.headers.append('set-cookie', cookie);
        });
      }

      return response;
    } catch {
      // refresh не вдався
      if (isPrivateRoute) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }
      return NextResponse.next();
    }
  }

  // ❌ ні access, ні refresh
  if (isPrivateRoute) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/auth/:path*',
    '/diaries/:path*',
    '/tasks/:path*',
    '/users/current',
    '/users/avatar',
    '/weeks/:path*',
  ],
};
