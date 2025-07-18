import { NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function GET() {
  try {
    // Fetch orders with order items and shipping addresses
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          product_id,
          quantity,
          unit_price,
          total_price,
          product_snapshot
        ),
        order_addresses (
          first_name,
          last_name,
          address_line_1,
          city,
          postal_code,
          country
        )
      `)
      .order('created_at', { ascending: false })

    if (ordersError) {
      console.error('Error fetching orders:', ordersError)
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
    }

    // Transform the data to match the expected format
    const transformedOrders = orders?.map(order => ({
      id: order.id,
      order_number: order.order_number,
      email: order.email,
      status: order.status,
      shipping_status: order.shipping_status,
      tracking_status: order.tracking_status || 'pending',
      tracking_number: order.tracking_number,
      total_amount: order.total_amount,
      created_at: order.created_at,
      shipped_at: order.shipped_at,
      delivered_at: order.delivered_at,
      items: order.order_items || [],
      shipping_address: order.order_addresses?.find((addr: any) => addr.type === 'shipping') || null
    })) || []

    return NextResponse.json({ orders: transformedOrders })
  } catch (error) {
    console.error('Error in admin orders API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 