import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const { email, discountCode } = await request.json()
    
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    if (!discountCode) {
      return NextResponse.json({ error: 'Discount code is required' }, { status: 400 })
    }

    // Validate discount code
    const validDiscountCodes = ['WELCOME10']
    
    if (!validDiscountCodes.includes(discountCode.toUpperCase())) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid discount code' 
      })
    }

    // Check if this email has this discount available
    const { data: emailCapture, error: checkError } = await supabase
      .from('email_captures')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('discount_code', discountCode.toUpperCase())
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking discount:', checkError)
      return NextResponse.json({ error: 'Failed to check discount' }, { status: 500 })
    }

    if (!emailCapture) {
      return NextResponse.json({ 
        success: false, 
        error: 'Discount code not available for this email' 
      })
    }

    if (emailCapture.discount_applied) {
      return NextResponse.json({ 
        success: false, 
        error: 'Discount code has already been used' 
      })
    }

    // Mark discount as applied
    const { error: updateError } = await supabase
      .from('email_captures')
      .update({ 
        discount_applied: true,
        applied_at: new Date().toISOString()
      })
      .eq('id', emailCapture.id)

    if (updateError) {
      console.error('Error applying discount:', updateError)
      return NextResponse.json({ error: 'Failed to apply discount' }, { status: 500 })
    }

    // Calculate discount amount (10% for WELCOME10)
    const discountAmount = 0.10 // 10%

    return NextResponse.json({
      success: true,
      discountCode: discountCode.toUpperCase(),
      discountAmount,
      message: 'Discount applied successfully'
    })

  } catch (error) {
    console.error('Apply discount error:', error)
    return NextResponse.json({ error: 'Failed to apply discount' }, { status: 500 })
  }
} 