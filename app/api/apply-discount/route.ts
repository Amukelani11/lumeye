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
    const validDiscountCodes = ['WELCOME10', '50OFF']
    
    if (!validDiscountCodes.includes(discountCode.toUpperCase())) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid discount code' 
      })
    }

    // For WELCOME10 and 50OFF, allow any email to use it (one-time use per email)
    if (discountCode.toUpperCase() === 'WELCOME10' || discountCode.toUpperCase() === '50OFF') {
      // Check if this email has already used this discount (only mark as used after checkout completion)
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

      // Only block if discount was actually used in a completed checkout
      if (emailCapture && emailCapture.discount_applied && emailCapture.order_completed) {
        return NextResponse.json({ 
          success: false, 
          error: 'Discount code has already been used' 
        })
      }

      // If email doesn't exist in captures, create a new record with discount reserved
      if (!emailCapture) {
        const { data: newCapture, error: createError } = await supabase
          .from('email_captures')
          .insert({
            email: email.toLowerCase(),
            discount_code: discountCode.toUpperCase(),
            discount_applied: false, // Don't mark as applied yet
            discount_reserved: true, // Mark as reserved for this session
            reserved_at: new Date().toISOString(),
            source: 'manual_entry'
          })
          .select()
          .single()

        if (createError) {
          console.error('Error creating email capture:', createError)
          return NextResponse.json({ error: 'Failed to apply discount' }, { status: 500 })
        }
      } else {
        // Update existing record to reserve the discount for this session
        const { error: updateError } = await supabase
          .from('email_captures')
          .update({ 
            discount_reserved: true,
            reserved_at: new Date().toISOString()
          })
          .eq('id', emailCapture.id)

        if (updateError) {
          console.error('Error reserving discount:', updateError)
          return NextResponse.json({ error: 'Failed to apply discount' }, { status: 500 })
        }
      }
    } else {
      // For other discount codes, check if this email has this discount available
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

      // Only block if discount was actually used in a completed checkout
      if (emailCapture.discount_applied && emailCapture.order_completed) {
        return NextResponse.json({ 
          success: false, 
          error: 'Discount code has already been used' 
        })
      }

      // Reserve the discount for this session
      const { error: updateError } = await supabase
        .from('email_captures')
        .update({ 
          discount_reserved: true,
          reserved_at: new Date().toISOString()
        })
        .eq('id', emailCapture.id)

      if (updateError) {
        console.error('Error reserving discount:', updateError)
        return NextResponse.json({ error: 'Failed to apply discount' }, { status: 500 })
      }
    }

    // Calculate discount amount based on code
    let discountAmount
    if (discountCode.toUpperCase() === 'WELCOME10') {
      discountAmount = 0.10 // 10%
    } else if (discountCode.toUpperCase() === '50OFF') {
      discountAmount = 0.50 // 50%
    } else {
      discountAmount = 0.10 // Default to 10%
    }

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