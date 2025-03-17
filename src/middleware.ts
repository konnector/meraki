import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/auth/signin', '/auth/signup']
  
  // If the URL contains an access_token, let the request through
  // This handles the OAuth callback with hash fragments
  if (req.url.includes('access_token=')) {
    return res
  }

  // Allow access to public routes
  if (publicRoutes.includes(req.nextUrl.pathname)) {
    // If user is signed in and trying to access auth pages, redirect to /sheets
    if (session && req.nextUrl.pathname.startsWith('/auth/')) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    return res
  }

  // Handle auth callback route
  if (req.nextUrl.pathname === '/auth/callback') {
    return res
  }

  // If user is not signed in and trying to access protected routes
  if (!session) {
    // Only redirect to signin if not already on an auth page
    if (!req.nextUrl.pathname.startsWith('/auth/')) {
      const redirectUrl = new URL('/auth/signin', req.url)
      redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }
    return res
  }

  // If user is signed in and trying to access protected routes, allow access
  if (session && (
    req.nextUrl.pathname === '/sheets' || 
    req.nextUrl.pathname === '/dashboard' ||
    req.nextUrl.pathname.startsWith('/sheets/')
  )) {
    return res
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - public images
     */
    '/((?!_next/static|_next/image|favicon.ico|public/|images/).*)',
  ],
} 