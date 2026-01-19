import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { lehlekaApi } from "../api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../_utils/utils";
import { refreshTokenCookies } from "../_utils/refreshTokenCookies";
import { setCookiesToResponse } from "../_utils/setCookiesToResponse";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    const body = await request.json();

    const res = await lehlekaApi.post("/tasks", body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
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

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const setCookie = await refreshTokenCookies();
    const cookie = setCookie ? setCookie.join(',') : cookieStore.toString(); 
    const apiRes = await lehlekaApi.get("/tasks", {
      headers: {
        Cookie: cookie,
      },
    });
    const response = setCookie ? setCookiesToResponse(setCookie, NextResponse.json(apiRes.data)) : NextResponse.json(apiRes.data);
    return response;
  } catch (err) {
    if (isAxiosError(err)) {
      return NextResponse.json(err.response?.data ?? { error: err.message }, {
        status: err.response?.status ?? 500,
      });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
