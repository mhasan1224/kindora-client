
import { NextRequest, NextResponse } from "next/server";

const privateRoutes = [
  "/profile",
  "/create-event",
  "/manage-events",
  "/my-joined-events",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPrivateRoute = privateRoutes.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!isPrivateRoute) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get(
    "better-auth.session_token"
  );

  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackURL", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/create-event/:path*",
    "/manage-events/:path*",
    "/my-joined-events/:path*",
  ],
};
