import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    // Get all newsletter subscriptions
    const { data: subscriptions, error } = await supabase
      .from('newsletter_subscriptions')
      .select('id, email, is_active, created_at, unsubscribed_at, source')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching subscriptions:', error)
      return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 500 })
    }

    return NextResponse.json({
      count: subscriptions?.length || 0,
      subscriptions: subscriptions || []
    })

  } catch (error) {
    console.error('Error in newsletter list API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 