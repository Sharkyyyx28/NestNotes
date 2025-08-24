import { getSessionCookie} from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const session = getSessionCookie(request);
    if (!session) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
}
export const config = {
  matcher: ["/dashboard/:path*"],
};