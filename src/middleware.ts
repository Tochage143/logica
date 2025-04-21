import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const pathname = req.nextUrl.pathname;

  // ✅ Define public routes
  const isPublicRoute =
    pathname === "/" ||
    pathname.startsWith("/Auth") 
 

  // 🔐 Redirect unauthenticated users away from protected routes
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/Auth", req.url));
  }

  // 🔄 Redirect authenticated users trying to access login, register, or root
  if (token && (pathname === "/" || pathname.startsWith("/Auth/"))) {
    return NextResponse.redirect(new URL("/Editor", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
