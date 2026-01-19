import { cookies } from "next/headers";
import { lehlekaApi } from "../../api";
import { NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";
import { refreshTokenCookies } from "../../_utils/refreshTokenCookies";
import { setCookiesToResponse } from "../../_utils/setCookiesToResponse";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const setCookie = await refreshTokenCookies();
    const cookie = setCookie ? setCookie.join(',') : cookieStore.toString(); 
    
    const { id } = await params;
    
    const apiRes = await lehlekaApi.get(`/weeks/${id}/baby`, {
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
        { status: error.status },
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
