import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/database"
import { EmailService } from "@/lib/email"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status, trackingNumber, location, description } = await request.json()
    const orderId = params.id

    // Update order tracking status
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .update({
        tracking_status: status,
        tracking_number: trackingNumber,
        shipping_status: status,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)
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
      .single()

    if (orderError) {
      console.error('Error updating order:', orderError)
      return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
    }

    // Insert tracking update record
    const { error: trackingError } = await supabase
      .from('order_tracking_updates')
      .insert({
        order_id: orderId,
        tracking_status: status,
        tracking_number: trackingNumber,
        location: location,
        description: description
      })

    if (trackingError) {
      console.error('Error creating tracking update:', trackingError)
      // Don't fail the request if tracking update fails
    }

    // If status is 'shipped' or 'in_transit', send shipping notification
    if (status === 'shipped' || status === 'in_transit') {
      try {
        const shippingAddress = order.order_addresses?.find((addr: any) => addr.type === 'shipping')
        
        if (shippingAddress) {
          await EmailService.sendShippingNotification({
            orderNumber: order.order_number,
            customerName: `${shippingAddress.first_name} ${shippingAddress.last_name}`,
            customerEmail: order.email,
            trackingNumber: trackingNumber,
            trackingStatus: status,
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
        }
      } catch (emailError) {
        console.error('Error sending shipping notification:', emailError)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({ 
      success: true, 
      order: {
        id: order.id,
        tracking_status: status,
        tracking_number: trackingNumber
      }
    })
  } catch (error) {
    console.error('Error in tracking update API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 