import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const {
      page,
      action,
      sessionId,
      userAgent,
      referrer,
      timestamp,
      metadata
    } = await request.json()

    if (!page || !action) {
      return NextResponse.json({ error: 'Page and action are required' }, { status: 400 })
    }

    // Generate session ID if not provided
    const finalSessionId = sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Get client IP address
    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0] ||
                     request.headers.get('x-real-ip') ||
                     request.headers.get('cf-connecting-ip') ||
                     'unknown'

    // Prepare visitor tracking data
    const now = new Date().toISOString()
    const visitorData = {
      session_id: finalSessionId,
      page,
      action,
      user_agent: userAgent || '',
      referrer: referrer || '',
      ip_address: ipAddress,
      created_at: timestamp || now,
      last_seen_at: now, // Set last_seen_at on creation
      // Store metadata as JSON if provided
      ...(metadata && { metadata: JSON.stringify(metadata) })
    }

    // Insert new visitor tracking record for each page view
    try {
      const { error: insertError } = await supabase
        .from('visitor_tracking')
        .insert(visitorData)

      if (insertError && insertError.code !== '23505') {
        console.error('Error inserting visitor tracking:', insertError)
      }

      // Also update last_seen_at for all records of this session (for active visitor counting)
      await supabase
        .from('visitor_tracking')
        .update({ last_seen_at: new Date().toISOString() })
        .eq('session_id', finalSessionId)
    } catch (error) {
      console.error('Error tracking visitor:', error)
      // Don't fail the request if tracking fails
    }

    return NextResponse.json({
      success: true,
      sessionId: finalSessionId,
      timestamp: visitorData.created_at
    })

  } catch (error) {
    console.error('Error in visitor tracking:', error)

    // Don't fail the request if tracking fails - it's not critical
    return NextResponse.json({
      success: true,
      error: 'Tracking failed but request continued',
      timestamp: new Date().toISOString()
    })
  }
} 