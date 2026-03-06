import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /admin routes (UI and API), but not /admin/login
  const isAdminApi = pathname.startsWith("/api/admin/articles");
  const isAdminUi = pathname.startsWith("/admin") && !pathname.startsWith("/admin/login");
  if (isAdminUi || isAdminApi) {
    const token = req.cookies.get("admin_token")?.value;
    if (token !== process.env.ADMIN_PASSWORD) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/articles/:path*"],
};
