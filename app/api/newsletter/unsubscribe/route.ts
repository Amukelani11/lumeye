import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Check if subscription exists
    const { data: subscription, error: checkError } = await supabase
      .from('newsletter_subscriptions')
      .select('id, is_active')
      .eq('email', email)
      .maybeSingle()

    if (checkError) {
      console.error('Error checking subscription:', checkError)
      return NextResponse.json({ error: 'Failed to check subscription' }, { status: 500 })
    }

    if (!subscription) {
      return NextResponse.json({ error: 'Email not found in subscriptions' }, { status: 404 })
    }

    if (!subscription.is_active) {
      return NextResponse.json({ error: 'Email already unsubscribed' }, { status: 400 })
    }

    // Unsubscribe
    const { error } = await supabase
      .from('newsletter_subscriptions')
      .update({ 
        is_active: false, 
        unsubscribed_at: new Date().toISOString()
      })
      .eq('id', subscription.id)

    if (error) {
      console.error('Error unsubscribing:', error)
      return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Successfully unsubscribed' })

  } catch (error) {
    console.error('Error in newsletter unsubscribe API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 