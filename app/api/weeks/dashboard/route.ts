import { cookies } from "next/headers";
import { lehlekaApi } from "../../api";
import { NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { refreshTokenCookies } from "../../_utils/refreshTokenCookies";
import { setCookiesToResponse } from "../../_utils/setCookiesToResponse";


export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const setCookie = await refreshTokenCookies();
    const cookie = setCookie ? setCookie.join(',') : cookieStore.toString(); 

    const apiRes = await lehlekaApi.get('/weeks/dashboard',{
      headers: {
        Cookie: cookie,
      }
    });
    const response = setCookie ? setCookiesToResponse(setCookie, NextResponse.json(apiRes.data)) : NextResponse.json(apiRes.data);
    return response;
  } catch (err) {
    if (isAxiosError(err)) {
      return NextResponse.json(
        err.response?.data ?? { error: err.message },
        { status: err.response?.status ?? 500 }
      );
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}