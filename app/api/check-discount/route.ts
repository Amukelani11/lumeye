import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    // Check if email exists in email_captures table
    const { data: emailCapture, error } = await supabase
      .from('email_captures')
      .select('*')
      .eq('email', email.toLowerCase())
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      console.error('Error checking discount:', error)
      return NextResponse.json({ error: 'Failed to check discount' }, { status: 500 })
    }

    const hasDiscount = !!emailCapture && !emailCapture.discount_applied

    return NextResponse.json({
      hasDiscount,
      discountCode: hasDiscount ? emailCapture.discount_code : null
    })

  } catch (error) {
    console.error('Check discount error:', error)
    return NextResponse.json({ error: 'Failed to check discount' }, { status: 500 })
  }
} 