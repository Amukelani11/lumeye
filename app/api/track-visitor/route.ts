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
    const visitorData = {
      session_id: finalSessionId,
      page,
      action,
      user_agent: userAgent || '',
      referrer: referrer || '',
      ip_address: ipAddress,
      created_at: timestamp || new Date().toISOString(),
      // Store metadata as JSON if provided
      ...(metadata && { metadata: JSON.stringify(metadata) })
    }

    // Insert visitor tracking data with retry logic
    let retryCount = 0
    const maxRetries = 3

    while (retryCount < maxRetries) {
      try {
        const { error } = await supabase
          .from('visitor_tracking')
          .insert(visitorData)

        if (!error) {
          // Successfully inserted
          break
        }

        // If it's a unique constraint error, try updating instead
        if (error.code === '23505') {
          console.log('Visitor tracking record already exists, skipping duplicate')
          break
        }

        console.error(`Visitor tracking attempt ${retryCount + 1} failed:`, error)

        if (retryCount === maxRetries - 1) {
          throw error
        }

        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000))
        retryCount++

      } catch (insertError) {
        if (retryCount === maxRetries - 1) {
          throw insertError
        }
        retryCount++
      }
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