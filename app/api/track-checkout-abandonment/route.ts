import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const { sessionId, email, checkoutItems, totalValue, formData } = await request.json()

    if (!sessionId || !email) {
      return NextResponse.json({ error: 'Session ID and email are required' }, { status: 400 })
    }

    // Check if checkout abandonment already exists
    const { data: existingCheckout } = await supabase
      .from('checkout_abandonments')
      .select('id')
      .eq('session_id', sessionId)
      .eq('is_recovered', false)
      .single()

    const checkoutData = {
      session_id: sessionId,
      email: email,
      checkout_data: checkoutItems || [],
      items: checkoutItems || [], // Keep for backward compatibility
      total_value: totalValue || 0,
      cart_value: totalValue || 0,
      items_count: checkoutItems ? checkoutItems.length : 0,
      abandoned_at: new Date().toISOString(),
      checkout_started_at: new Date().toISOString(),
      is_recovered: false,
      email_sent_count: 0,
      metadata: formData ? JSON.stringify(formData) : null
    }

    if (existingCheckout) {
      // Update existing checkout abandonment
      const { error } = await supabase
        .from('checkout_abandonments')
        .update(checkoutData)
        .eq('id', existingCheckout.id)

      if (error) {
        console.error('Error updating checkout abandonment:', error)
        return NextResponse.json({ error: 'Failed to update checkout' }, { status: 500 })
      }
    } else {
      // Insert new checkout abandonment
      const { error } = await supabase
        .from('checkout_abandonments')
        .insert(checkoutData)

      if (error) {
        console.error('Error creating checkout abandonment:', error)
        return NextResponse.json({ error: 'Failed to track checkout' }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking checkout abandonment:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

