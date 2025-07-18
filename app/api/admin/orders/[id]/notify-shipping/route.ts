import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/database"
import { EmailService } from "@/lib/email"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id

    // Fetch order details
    const { data: order, error: orderError } = await supabase
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
      .eq('id', orderId)
      .single()

    if (orderError || !order) {
      console.error('Error fetching order:', orderError)
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    const shippingAddress = order.order_addresses?.find((addr: any) => addr.type === 'shipping')
    
    if (!shippingAddress) {
      return NextResponse.json({ error: 'Shipping address not found' }, { status: 400 })
    }

    // Send shipping notification
    await EmailService.sendShippingNotification({
      orderNumber: order.order_number,
      customerName: `${shippingAddress.first_name} ${shippingAddress.last_name}`,
      customerEmail: order.email,
      trackingNumber: order.tracking_number || 'TBD',
      trackingStatus: order.tracking_status || 'shipped',
      estimatedDelivery: '3-5 business days',
      items: order.order_items?.map((item: any) => ({
        name: item.product_snapshot?.name || 'Lumeye Under Eye Serum',
        quantity: item.quantity,
        price: item.unit_price
      })) || [],
      shippingAddress: {
        firstName: shippingAddress.first_name,
        lastName: shippingAddress.last_name,
        address: shippingAddress.address_line_1,
        city: shippingAddress.city,
        postalCode: shippingAddress.postal_code,
        country: shippingAddress.country || 'South Africa'
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Shipping notification sent successfully' 
    })
  } catch (error) {
    console.error('Error sending shipping notification:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 