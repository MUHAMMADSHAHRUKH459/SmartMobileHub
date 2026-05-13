import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin-token");
  const isAdminPage = req.nextUrl.pathname.startsWith("/admin");
  const isAdminLogin = req.nextUrl.pathname === "/admin";

  if (isAdminPage && !isAdminLogin && !token) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (isAdminLogin && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};