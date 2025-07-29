import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const checkoutId = searchParams.get('checkout_id')

    if (!checkoutId) {
      return NextResponse.json({ error: 'Checkout ID is required' }, { status: 400 })
    }

    // Find order by checkout ID
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select(`
        id,
        order_number,
        status,
        payment_status,
        total_amount,
        created_at,
        updated_at
      `)
      .eq('payment_id', checkoutId)
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.order_number,
        status: order.status,
        paymentStatus: order.payment_status,
        totalAmount: order.total_amount,
        createdAt: order.created_at,
        updatedAt: order.updated_at
      }
    })

  } catch (error) {
    console.error('Error checking payment status:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 