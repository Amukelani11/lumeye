import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'

const CODE_PREFIX = 'SAVE10'
const DISCOUNT_PERCENTAGE = 10

export async function POST(request: NextRequest) {
  try {
    const { code, email } = await request.json()

    if (!code) {
      return NextResponse.json({ error: 'Discount code is required' }, { status: 400 })
    }

    // Normalize code (remove spaces, convert to uppercase)
    const normalizedCode = code.trim().toUpperCase()

    // Check if code matches our format
    if (!normalizedCode.startsWith(CODE_PREFIX)) {
      return NextResponse.json({
        valid: false,
        error: 'Invalid discount code'
      })
    }

    // Check database for code validation (optional - codes work even if not in DB yet)
    try {
      const { data: dbCode, error: dbError } = await supabase
        .from('discount_codes')
        .select('*')
        .eq('code', normalizedCode)
        .eq('is_used', false)
        .single()

      // If code exists in DB and is used, reject
      if (dbCode && dbCode.is_used) {
        return NextResponse.json({
          valid: false,
          error: 'This discount code has already been used'
        })
      }

      // If code exists in DB and is expired
      if (dbCode && dbCode.expires_at) {
        const expiresAt = new Date(dbCode.expires_at)
        if (expiresAt < new Date()) {
          return NextResponse.json({
            valid: false,
            error: 'This discount code has expired'
          })
        }
      }
    } catch (dbErr) {
      // If table doesn't exist or query fails, still allow code if it matches format
      console.log('Discount code validation (non-critical):', dbErr)
    }

    // Code is valid if it matches the format
    return NextResponse.json({
      valid: true,
      discountPercentage: DISCOUNT_PERCENTAGE,
      code: normalizedCode
    })
  } catch (error) {
    console.error('Error validating discount code:', error)
    return NextResponse.json(
      { error: 'Failed to validate discount code' },
      { status: 500 }
    )
  }
}

