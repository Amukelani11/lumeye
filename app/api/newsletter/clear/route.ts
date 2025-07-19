import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'

export async function DELETE(request: NextRequest) {
  try {
    // Only allow in development
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 })
    }

    // Delete all newsletter subscriptions
    const { error } = await supabase
      .from('newsletter_subscriptions')
      .delete()
      .neq('id', 0) // Delete all records

    if (error) {
      console.error('Error clearing subscriptions:', error)
      return NextResponse.json({ error: 'Failed to clear subscriptions' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'All subscriptions cleared' })

  } catch (error) {
    console.error('Error in newsletter clear API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 