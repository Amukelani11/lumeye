import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Middleware temporarily disabled due to TypeScript compatibility issues
  // TODO: Re-enable when Supabase auth helpers are updated for Next.js 15
  return NextResponse.next()

  const res = NextResponse.next()

  // Check if required environment variables are available
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.log('Middleware - Supabase environment variables not configured')
    return res
  }

  // Create a Supabase client configured to use cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          res.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          res.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log('Middleware - Path:', req.nextUrl.pathname)
  console.log('Middleware - Session exists:', !!session)

  // Middleware authentication logic temporarily disabled
  // TODO: Re-enable when Supabase auth helpers are compatible with Next.js 15
  /*
  if (session) {
    console.log('Middleware - User email:', session.user?.email || 'No email')

    // Check if user is trying to access admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
      // Admin route protection logic
    }

    // Check if user is trying to access auth routes while already logged in
    if (req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/signup')) {
      // Auth route redirect logic
    }
  }
  */

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
} 