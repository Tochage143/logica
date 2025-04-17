import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/Login", // Redirect to login page if not authenticated
  },
});

export const config = {
  matcher: ["/((?!auth/Login|auth/Register).*)"], // Protect all routes except Login & Register
};
