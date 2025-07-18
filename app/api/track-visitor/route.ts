import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const { page, action, sessionId, userAgent, referrer } = await request.json()

    if (!page) {
      return NextResponse.json({ error: 'Page is required' }, { status: 400 })
    }

    // Create or update visitor session
    const visitorData = {
      session_id: sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      page,
      action: action || 'page_view',
      user_agent: userAgent || '',
      referrer: referrer || '',
      ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      created_at: new Date().toISOString()
    }

    // Insert visitor tracking data
    const { error } = await supabase
      .from('visitor_tracking')
      .insert(visitorData)

    if (error) {
      console.error('Error tracking visitor:', error)
      // Don't fail the request if tracking fails
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error in visitor tracking:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 