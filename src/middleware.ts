import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value
  const isLoginPage = request.nextUrl.pathname === '/admin/login'

  // If there's no token and we're not on the login page, redirect to login
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // If there is a token, try to verify it
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_key_change_me')
      await jwtVerify(token, secret)
      
      // If token is valid and we're on the login page, redirect to dashboard
      if (isLoginPage) {
        return NextResponse.redirect(new URL('/admin', request.url))
      }
    } catch (e) {
      // If token is invalid and we're not on the login page, redirect to login
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.delete('admin_token')
      return !isLoginPage ? response : NextResponse.next()
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
