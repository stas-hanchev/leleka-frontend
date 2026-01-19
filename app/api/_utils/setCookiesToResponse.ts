import { NextResponse } from "next/server";

export function setCookiesToResponse(cookie: string[], nextRes: NextResponse) {
    if (cookie) {
        const cookiesArray = Array.isArray(cookie) ? cookie : [cookie];
        cookiesArray.forEach((cookie) => {
          nextRes.headers.append('set-cookie', cookie);
        });
    }

    return nextRes;
}