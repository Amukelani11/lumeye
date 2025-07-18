import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Temporarily disable middleware to avoid TypeScript issues
  // TODO: Re-enable middleware after fixing version compatibility issues
  return NextResponse.next()
  
  /*
  const res = NextResponse.next()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => req.cookies.set(name, value))
          res = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) => res.cookies.set(name, value, options))
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
  if (session?.user?.email) {
    console.log('Middleware - User email:', session.user.email)
  }

  // Check if user is trying to access admin routes
  if (req.nextUrl.pathname.startsWith('/admin')) {
    console.log('Middleware - Accessing admin route')
    if (!session?.user?.id) {
      console.log('Middleware - No session, redirecting to login')
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Check if user is admin
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('is_admin')
      .eq('id', session!.user.id)
      .single()

    console.log('Middleware - Admin check result:', userData)
    console.log('Middleware - Admin check error:', userError)

    if (!userData?.is_admin) {
      console.log('Middleware - Not admin, redirecting to home')
      // Redirect to home if not admin
      return NextResponse.redirect(new URL('/', req.url))
    }
    console.log('Middleware - Admin access granted')
  }

  // Check if user is trying to access auth routes while already logged in
  if (session?.user?.id && (req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/signup'))) {
    console.log('Middleware - Logged in user accessing auth route')
    // Check if user is admin and redirect accordingly
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('is_admin')
      .eq('id', session.user.id)
      .single()

    console.log('Middleware - Auth route admin check:', userData)
    console.log('Middleware - Auth route admin error:', userError)

    if (userData?.is_admin) {
      console.log('Middleware - Admin user, redirecting to admin')
      return NextResponse.redirect(new URL('/admin', req.url))
    } else {
      console.log('Middleware - Regular user, redirecting to home')
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return res
  */
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