import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 })
    }

    // Check subscription status
    const { data: subscription, error } = await supabase
      .from('newsletter_subscriptions')
      .select('id, email, is_active, created_at, unsubscribed_at, source')
      .eq('email', email)
      .maybeSingle()

    if (error) {
      console.error('Error checking subscription:', error)
      return NextResponse.json({ error: 'Failed to check subscription' }, { status: 500 })
    }

    return NextResponse.json({
      subscribed: !!subscription && subscription.is_active,
      subscription: subscription || null
    })

  } catch (error) {
    console.error('Error in newsletter check API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 