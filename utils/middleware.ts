import { NextRequest, NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'

const protectedRoutes = ['/', '/login', '/signup']

export default async function middleware(request: NextRequest) {
  try {
    const session = await auth()

    const isProtected = protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    )

    if (session && isProtected) {
      // const absoluteURL = new URL('/redirect', request.nextUrl.origin)
      // return NextResponse.redirect(absoluteURL.toString())
      const redirectUrl = new URL('/redirect', request.nextUrl.origin)
      return NextResponse.redirect(redirectUrl)
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)

    return NextResponse.error()
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
