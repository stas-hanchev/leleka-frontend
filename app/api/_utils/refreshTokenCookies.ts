import { checkServerSession } from "@/lib/api/serverApi";
import { cookies } from "next/headers";

export async function refreshTokenCookies() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (!accessToken && refreshToken) {
    const res = await checkServerSession();
    const setCookie = res.headers["set-cookie"];

    return setCookie;
  }

  return null;
}
