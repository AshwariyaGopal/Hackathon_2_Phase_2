import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("better-auth.session_token");
  const isAuthPage = request.nextUrl.pathname.startsWith("/login") || 
                     request.nextUrl.pathname.startsWith("/signup");
  const isTasksPage = request.nextUrl.pathname.startsWith("/tasks");

  if (isTasksPage && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow authenticated users to access login/signup pages
  // if (isAuthPage && sessionCookie) {
  //   return NextResponse.redirect(new URL("/tasks", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/tasks/:path*", "/login", "/signup"],
};
