import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, isValidToken } from "@/lib/adminAuth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Login page and login API are always reachable.
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  const authed = await isValidToken(req.cookies.get(ADMIN_COOKIE)?.value);
  if (authed) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
