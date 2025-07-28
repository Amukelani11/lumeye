import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const { email, source = 'popup', discountCode = 'WELCOME10' } = await request.json()
    
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    // Get or create visitor session ID
    const cookieStore = await cookies()
    let sessionId = cookieStore.get('visitor_session')?.value
    
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }

    const now = new Date().toISOString()

    // Store email capture
    const { error: captureError } = await supabase
      .from('email_captures')
      .upsert({
        email: email.toLowerCase(),
        session_id: sessionId,
        discount_code: discountCode,
        source: source,
        created_at: now,
        updated_at: now
      }, {
        onConflict: 'email'
      })

    if (captureError) {
      console.error('Error storing email capture:', captureError)
      return NextResponse.json({ error: 'Failed to capture email' }, { status: 500 })
    }

    // Also track in visitor tracking
    const { error: trackingError } = await supabase
      .from('visitor_tracking')
      .insert({
        session_id: sessionId,
        action: 'email_capture',
        page: request.headers.get('referer') || '/',
        email: email.toLowerCase(),
        timestamp: now,
        user_agent: request.headers.get('user-agent') || '',
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
      })

    if (trackingError) {
      console.error('Error tracking email capture:', trackingError)
    }

    // Set session cookie
    const response = NextResponse.json({ 
      success: true, 
      discountCode,
      message: 'Email captured successfully'
    })
    
    response.cookies.set('visitor_session', sessionId, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })

    return response

  } catch (error) {
    console.error('Email capture error:', error)
    return NextResponse.json({ error: 'Failed to capture email' }, { status: 500 })
  }
} 