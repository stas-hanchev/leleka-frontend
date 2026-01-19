export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { lehlekaApi } from "../../api";
import { cookies } from "next/headers";
import { logErrorResponse } from "../../_utils/utils";
import { isAxiosError } from "axios";
import { refreshTokenCookies } from "../../_utils/refreshTokenCookies";
import { setCookiesToResponse } from "../../_utils/setCookiesToResponse";

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();

    const setCookie = await refreshTokenCookies();
    const cookie = setCookie ? setCookie.join(',') : cookieStore.toString(); 
    
    
    const formData = await request.formData();

    const apiRes = await lehlekaApi.patch("/users/avatar", formData, {
      headers: {
        Cookie: cookie,
        "Content-Type": "multipart/form-data",
      },
    });
    const response = setCookie ? setCookiesToResponse(setCookie, NextResponse.json(apiRes.data)) : NextResponse.json(apiRes.data);
    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
