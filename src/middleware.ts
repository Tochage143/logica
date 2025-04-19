import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const pathname = req.nextUrl.pathname;

  // ✅ Allow both login and register routes
  const isPublicRoute =
    pathname.startsWith("/Auth/Login") || pathname.startsWith("/Auth/Register");

  // 👮‍♂️ User not logged in and trying to access protected route
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/Auth/Login", req.url));
  }

  // 🔄 Logged in user trying to access login/register
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
