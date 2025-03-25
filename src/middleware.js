import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get("token");
    const { pathname } = req.nextUrl;

    // If user is logged in, prevent access to login and register pages
    if (token && ["/Auth/Login", "/Auth/Register"].includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // If user is not logged in, restrict access to protected pages
    if (!token && !["/Auth/Login", "/Auth/Register"].includes(pathname)) {
        return NextResponse.redirect(new URL("/Auth/Login", req.url));
    }

    return NextResponse.next();
}

// Apply middleware globally but control access inside the function
export const config = {
    matcher: ["/:path*"], // Applies middleware to all routes
};
