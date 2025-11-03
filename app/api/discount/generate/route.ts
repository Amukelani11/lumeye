import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'

const DISCOUNT_PERCENTAGE = 10
const CODE_PREFIX = 'SAVE10'

export async function POST(request: NextRequest) {
  try {
    const { email, sessionId, cartItems, totalValue } = await request.json()

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    // Generate unique discount code
    const timestamp = Date.now().toString(36).toUpperCase()
    const random = Math.random().toString(36).substr(2, 4).toUpperCase()
    const discountCode = `${CODE_PREFIX}-${timestamp}-${random}`

    // Store discount code in database (optional, for tracking)
    try {
      const { error: dbError } = await supabase
        .from('discount_codes')
        .insert({
          code: discountCode,
          email: email,
          discount_percentage: DISCOUNT_PERCENTAGE,
          session_id: sessionId,
          is_used: false,
          created_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
        })

      if (dbError) {
        console.error('Error storing discount code:', dbError)
        // Continue anyway - code is still valid
      }
    } catch (dbErr) {
      console.error('Database error (non-critical):', dbErr)
      // Continue - discount code is still valid
    }

    return NextResponse.json({
      success: true,
      discountCode,
      discountPercentage: DISCOUNT_PERCENTAGE,
      message: 'Discount code generated successfully'
    })
  } catch (error) {
    console.error('Error generating discount code:', error)
    return NextResponse.json(
      { error: 'Failed to generate discount code' },
      { status: 500 }
    )
  }
}

