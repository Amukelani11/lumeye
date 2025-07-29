import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const { action, page, email, cartValue, items } = await request.json()
    
    // Get or create visitor session ID
    const cookieStore = await cookies()
    let sessionId = cookieStore.get('visitor_session')?.value
    
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }

    const now = new Date().toISOString()
    
    console.log('Tracking visitor activity:', {
      sessionId,
      action,
      page,
      email: email ? 'provided' : 'not provided',
      cartValue,
      itemsCount: items?.length || 0
    })
    
    // Test database connection and table existence
    const { data: testData, error: testError } = await supabase
      .from('visitor_tracking')
      .select('count')
      .limit(1)
    
    if (testError) {
      console.error('Database tables not found. Please run the SQL scripts in Supabase:', {
        error: testError,
        details: testError?.message || testError?.details || testError?.hint || JSON.stringify(testError) || 'Unknown error',
        action: 'Please run fix_all_schema_issues.sql in your Supabase SQL Editor'
      })
      
      // Return success to prevent frontend errors, but log the issue
      const response = NextResponse.json({ success: true, sessionId, note: 'Tracking tables not found' })
      response.cookies.set('visitor_session', sessionId, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      })
      return response
    }
    
    console.log('Database connection test successful')
    
    // Track visitor activity
    const { error: trackingError } = await supabase
      .from('visitor_tracking')
      .insert({
        session_id: sessionId,
        action: action, // 'page_view', 'cart_add', 'checkout_start', 'purchase', 'email_capture'
        page: page,
        email: email || null,
        cart_value: cartValue || 0,
        items: items || [],
        timestamp: now,
        user_agent: request.headers.get('user-agent') || '',
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
      })

    if (trackingError) {
      console.error('Error tracking visitor:', {
        error: trackingError,
        sessionId,
        action,
        page,
        details: trackingError?.message || trackingError?.details || trackingError?.hint || JSON.stringify(trackingError) || 'Unknown error'
      })
    } else {
      console.log('Visitor tracking successful for session:', sessionId)
    }

    // Update live visitors table
    let status = 'browsing'
    if (action === 'cart_add') status = 'cart'
    if (action === 'checkout_start') status = 'checkout'
    if (action === 'purchase') status = 'purchased'

    // Format page name for better display
    let displayPage = page || 'Unknown'
    if (displayPage === '/') displayPage = 'Home'
    if (displayPage === '/product') displayPage = 'Product Page'
    if (displayPage === '/cart') displayPage = 'Shopping Cart'
    if (displayPage === '/checkout') displayPage = 'Checkout'
    if (displayPage === '/order-confirmation') displayPage = 'Order Confirmation'

    const { error: liveError } = await supabase
      .from('live_visitors')
      .upsert({
        session_id: sessionId,
        current_page: displayPage,
        email: email || null,
        cart_value: cartValue || 0,
        items: items || [],
        last_activity: now,
        status: status
      }, {
        onConflict: 'session_id'
      })

    if (liveError) {
      console.error('Error updating live visitors:', {
        error: liveError,
        sessionId,
        displayPage,
        status,
        details: liveError?.message || liveError?.details || liveError?.hint || JSON.stringify(liveError) || 'Unknown error'
      })
    } else {
      console.log('Live visitors update successful for session:', sessionId)
    }

    // Handle specific actions
    if (action === 'email_capture' && email) {
      // Store email for abandoned cart recovery
      const { error: emailError } = await supabase
        .from('abandoned_carts')
        .upsert({
          session_id: sessionId,
          email: email,
          cart_value: cartValue || 0,
          items: items || [],
          last_cart_activity: now,
          status: 'email_captured'
        }, {
          onConflict: 'session_id'
        })

      if (emailError) {
        console.error('Error storing abandoned cart email:', {
          error: emailError,
          sessionId,
          email,
          details: emailError?.message || emailError?.details || emailError?.hint || JSON.stringify(emailError) || 'Unknown error'
        })
      }
    }

    if (action === 'cart_add') {
      // Update cart abandonment tracking
      const { error: cartError } = await supabase
        .from('abandoned_carts')
        .upsert({
          session_id: sessionId,
          email: email || null,
          cart_value: cartValue || 0,
          items: items || [],
          last_cart_activity: now,
          status: 'cart_active'
        }, {
          onConflict: 'session_id'
        })

      if (cartError) {
        console.error('Error updating cart abandonment:', {
          error: cartError,
          sessionId,
          details: cartError?.message || cartError?.details || cartError?.hint || JSON.stringify(cartError) || 'Unknown error'
        })
      }
    }

    if (action === 'checkout_start') {
      // Update checkout abandonment tracking - using correct field names
      try {
        const { error: checkoutError } = await supabase
          .from('checkout_abandonments')
          .upsert({
            session_id: sessionId,
            email: email || null,
            cart_value: cartValue || 0,
            items: items || [],
            checkout_started_at: now,
            status: 'checkout_started'
          }, {
            onConflict: 'session_id'
          })

        if (checkoutError) {
          console.error('Error tracking checkout abandonment:', {
            error: checkoutError,
            sessionId,
            details: checkoutError?.message || checkoutError?.details || checkoutError?.hint || JSON.stringify(checkoutError) || 'Unknown error'
          })
          
          // Try alternative approach if cart_value column doesn't exist
          if (checkoutError.message && checkoutError.message.includes('cart_value')) {
            console.log('Attempting fallback checkout tracking without cart_value...')
            const { error: fallbackError } = await supabase
              .from('checkout_abandonments')
              .upsert({
                session_id: sessionId,
                email: email || null,
                items: items || [],
                checkout_started_at: now,
                status: 'checkout_started'
              }, {
                onConflict: 'session_id'
              })
            
            if (fallbackError) {
              console.error('Fallback checkout tracking also failed:', fallbackError)
            }
          }
        }
      } catch (error) {
        console.error('Exception in checkout tracking:', error)
      }
    }

    if (action === 'purchase') {
      // Mark as converted (remove from abandonment tracking)
      await supabase
        .from('abandoned_carts')
        .update({ status: 'converted', converted_at: now })
        .eq('session_id', sessionId)

      await supabase
        .from('checkout_abandonments')
        .update({ status: 'converted', converted_at: now })
        .eq('session_id', sessionId)
    }

    // Set session cookie
    const response = NextResponse.json({ success: true, sessionId })
    response.cookies.set('visitor_session', sessionId, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })

    return response

  } catch (error) {
    console.error('Visitor tracking error:', error)
    return NextResponse.json({ error: 'Failed to track visitor' }, { status: 500 })
  }
} 