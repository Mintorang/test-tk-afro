import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip authentication for login API
    if (request.nextUrl.pathname === '/api/admin/auth/login') {
      return NextResponse.next();
    }

    // For admin API routes, check for Authorization header
    if (request.nextUrl.pathname.startsWith('/api/admin/')) {
      const authHeader = request.headers.get('authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }

      const token = authHeader.substring(7);
      try {
        jwt.verify(token, JWT_SECRET);
        return NextResponse.next();
      } catch (error) {
        return NextResponse.json(
          { error: 'Invalid token' },
          { status: 401 }
        );
      }
    }

    // For admin pages, check for admin_token cookie
    const adminToken = request.cookies.get('admin_token')?.value;
    if (!adminToken) {
      // Redirect to admin login if no token
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    try {
      jwt.verify(adminToken, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      // Clear invalid token and redirect to login
      const response = NextResponse.redirect(new URL('/admin', request.url));
      response.cookies.delete('admin_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
};