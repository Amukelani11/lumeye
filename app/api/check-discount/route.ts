import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const { email, discountCode } = await request.json()
    
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    // If a specific discount code is provided, validate it
    if (discountCode) {
      // For now, we'll support WELCOME10 as a valid discount code
      const validDiscountCodes = ['WELCOME10']
      
      if (!validDiscountCodes.includes(discountCode.toUpperCase())) {
        return NextResponse.json({ 
          hasDiscount: false, 
          error: 'Invalid discount code' 
        })
      }

      // For WELCOME10, allow any email to use it (one-time use per email)
      if (discountCode.toUpperCase() === 'WELCOME10') {
        // Check if this email has already used this discount
        const { data: emailCapture, error } = await supabase
          .from('email_captures')
          .select('*')
          .eq('email', email.toLowerCase())
          .eq('discount_code', discountCode.toUpperCase())
          .single()

        if (error && error.code !== 'PGRST116') {
          console.error('Error checking discount:', error)
          return NextResponse.json({ error: 'Failed to check discount' }, { status: 500 })
        }

        // If email doesn't exist in captures, they can use the discount
        // If email exists but discount not applied, they can use it
        const hasDiscount = !emailCapture || !emailCapture.discount_applied

        return NextResponse.json({
          hasDiscount,
          discountCode: hasDiscount ? discountCode.toUpperCase() : null
        })
      }

      // For other discount codes, check if this email has already used this discount
      const { data: emailCapture, error } = await supabase
        .from('email_captures')
        .select('*')
        .eq('email', email.toLowerCase())
        .eq('discount_code', discountCode.toUpperCase())
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking discount:', error)
        return NextResponse.json({ error: 'Failed to check discount' }, { status: 500 })
      }

      const hasDiscount = !!emailCapture && !emailCapture.discount_applied

      return NextResponse.json({
        hasDiscount,
        discountCode: hasDiscount ? discountCode.toUpperCase() : null
      })
    }

    // If no specific discount code, check if email has any available discount
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