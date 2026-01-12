import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("better-auth.session_token");
  const isAuthPage = request.nextUrl.pathname.startsWith("/login") || 
                     request.nextUrl.pathname.startsWith("/signup");
  const isTasksPage = request.nextUrl.pathname.startsWith("/tasks");

  if (isTasksPage && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Create the response object
  const response = NextResponse.next();

  // Define a relaxed CSP to fix blocking issues
  // Note: We include 'unsafe-inline' and 'unsafe-eval' to support Next.js 16+ hydration and third-party scripts.
  const csp = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self';
    connect-src 'self' *;
  `.replace(/\s{2,}/g, ' ').trim();

  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  // Apply to all routes to ensure CSP is set, excluding static assets
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
