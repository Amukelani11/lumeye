import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    // Clean up discount reservations that are older than 24 hours and haven't been completed
    const twentyFourHoursAgo = new Date()
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24)

    const { data: expiredReservations, error: selectError } = await supabase
      .from('email_captures')
      .select('id, email, discount_code')
      .eq('discount_reserved', true)
      .eq('order_completed', false)
      .lt('reserved_at', twentyFourHoursAgo.toISOString())

    if (selectError) {
      console.error('Error finding expired reservations:', selectError)
      return NextResponse.json({ error: 'Failed to find expired reservations' }, { status: 500 })
    }

    if (expiredReservations && expiredReservations.length > 0) {
      // Remove the reservation status from expired discounts
      const { error: updateError } = await supabase
        .from('email_captures')
        .update({
          discount_reserved: false,
          reserved_at: null
        })
        .eq('discount_reserved', true)
        .eq('order_completed', false)
        .lt('reserved_at', twentyFourHoursAgo.toISOString())

      if (updateError) {
        console.error('Error cleaning up expired reservations:', updateError)
        return NextResponse.json({ error: 'Failed to cleanup expired reservations' }, { status: 500 })
      }

      console.log(`Cleaned up ${expiredReservations.length} expired discount reservations`)
      
      return NextResponse.json({
        success: true,
        cleanedCount: expiredReservations.length,
        message: `Cleaned up ${expiredReservations.length} expired discount reservations`
      })
    }

    return NextResponse.json({
      success: true,
      cleanedCount: 0,
      message: 'No expired reservations found'
    })

  } catch (error) {
    console.error('Cleanup expired discounts error:', error)
    return NextResponse.json({ error: 'Failed to cleanup expired discounts' }, { status: 500 })
  }
} 