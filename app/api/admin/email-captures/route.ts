import { NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function GET() {
  try {
    // Fetch emails from multiple sources
    const emailCaptures: any[] = []
    const stats = {
      total: 0,
      fromDiscount: 0,
      fromCheckout: 0,
      fromNewsletter: 0,
      fromAbandonedCart: 0,
      today: 0,
      thisWeek: 0,
      thisMonth: 0
    }

    // 1. Fetch emails from abandoned_carts table
    const { data: abandonedCarts, error: abandonedCartsError } = await supabase
      .from('abandoned_carts')
      .select('email, session_id, captured_at, status, last_cart_activity')
      .not('email', 'is', null)

    if (!abandonedCartsError && abandonedCarts) {
      abandonedCarts.forEach(cart => {
        if (cart.email) {
          emailCaptures.push({
            id: `abandoned_${cart.session_id}`,
            email: cart.email,
            source: 'abandoned_cart',
            session_id: cart.session_id,
            created_at: cart.captured_at || cart.last_cart_activity,
            status: cart.status
          })
          stats.fromAbandonedCart++
        }
      })
    }

    // 2. Fetch emails from newsletter table (if it exists)
    try {
      const { data: newsletterEmails, error: newsletterError } = await supabase
        .from('newsletter_subscribers')
        .select('email, created_at')

      if (!newsletterError && newsletterEmails) {
        newsletterEmails.forEach(subscriber => {
          emailCaptures.push({
            id: `newsletter_${subscriber.email}`,
            email: subscriber.email,
            source: 'newsletter',
            created_at: subscriber.created_at
          })
          stats.fromNewsletter++
        })
      }
    } catch (error) {
      // Newsletter table might not exist, continue
    }

    // 3. Fetch emails from visitor_tracking table (checkout and discount popup actions)
    const { data: visitorTracking, error: visitorTrackingError } = await supabase
      .from('visitor_tracking')
      .select('session_id, email, action, timestamp')
      .not('email', 'is', null)
      .in('action', ['email_capture', 'checkout_start'])

    if (!visitorTrackingError && visitorTracking) {
      visitorTracking.forEach(track => {
        if (track.email) {
          const source = track.action === 'email_capture' ? 'discount_popup' : 'checkout'
          emailCaptures.push({
            id: `tracking_${track.session_id}_${track.timestamp}`,
            email: track.email,
            source: source,
            session_id: track.session_id,
            created_at: track.timestamp
          })
          
          if (source === 'discount_popup') {
            stats.fromDiscount++
          } else {
            stats.fromCheckout++
          }
        }
      })
    }

    // 4. Fetch emails from email_captures table (if it exists)
    try {
      const { data: emailCapturesData, error: emailCapturesError } = await supabase
        .from('email_captures')
        .select('*')

      if (!emailCapturesError && emailCapturesData) {
        emailCapturesData.forEach(capture => {
          emailCaptures.push({
            id: `capture_${capture.id}`,
            email: capture.email,
            source: capture.source || 'unknown',
            session_id: capture.session_id,
            created_at: capture.created_at,
            metadata: capture.metadata
          })
          
          // Update stats based on source
          switch (capture.source) {
            case 'discount_popup':
              stats.fromDiscount++
              break
            case 'checkout':
              stats.fromCheckout++
              break
            case 'newsletter':
              stats.fromNewsletter++
              break
            case 'abandoned_cart':
              stats.fromAbandonedCart++
              break
          }
        })
      }
    } catch (error) {
      // email_captures table might not exist, continue
    }

    // Remove duplicates based on email and source
    const uniqueEmails = emailCaptures.filter((email, index, self) => 
      index === self.findIndex(e => e.email === email.email && e.source === email.source)
    )

    // Sort by created_at (newest first)
    uniqueEmails.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    // Calculate time-based stats
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(today.getFullYear(), now.getMonth() - 1, now.getDate())

    uniqueEmails.forEach(email => {
      const emailDate = new Date(email.created_at)
      
      if (emailDate >= today) {
        stats.today++
      }
      if (emailDate >= weekAgo) {
        stats.thisWeek++
      }
      if (emailDate >= monthAgo) {
        stats.thisMonth++
      }
    })

    stats.total = uniqueEmails.length

    return NextResponse.json({ 
      emailCaptures: uniqueEmails,
      stats: stats
    })
  } catch (error) {
    console.error('Error in email captures API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 