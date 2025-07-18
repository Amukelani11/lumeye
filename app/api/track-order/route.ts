import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { orderNumber, email } = await request.json()

    if (!orderNumber || !email) {
      return NextResponse.json({ error: 'Order number and email are required' }, { status: 400 })
    }

    // Fetch order with tracking updates
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select(`
        *,
        order_tracking_updates (
          tracking_status,
          location,
          description,
          created_at
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
      .eq('order_number', orderNumber)
      .eq('email', email)
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: 'Order not found. Please check your order number and email address.' }, { status: 404 })
    }

    // Build tracking timeline
    const timeline = []
    const trackingUpdates = order.order_tracking_updates || []
    
    // Add order placement
    timeline.push({
      status: "Order Placed",
      date: new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      time: new Date(order.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      completed: true
    })

    // Add order confirmation
    if (order.status === 'confirmed' || order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered') {
      timeline.push({
        status: "Order Confirmed",
        date: new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        time: new Date(order.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        completed: true
      })
    }

    // Add tracking updates
    trackingUpdates.forEach((update: any, index: number) => {
      const isCurrent = index === trackingUpdates.length - 1
      timeline.push({
        status: update.tracking_status.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
        date: new Date(update.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        time: new Date(update.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        completed: true,
        current: isCurrent,
        location: update.location,
        description: update.description
      })
    })

    // Add future statuses if not delivered
    if (order.tracking_status !== 'delivered') {
      const futureStatuses = []
      
      if (!timeline.some(t => t.status === 'Packed') && order.tracking_status !== 'packed') {
        futureStatuses.push({ status: 'Packed', completed: false })
      }
      if (!timeline.some(t => t.status === 'Collected') && order.tracking_status !== 'collected') {
        futureStatuses.push({ status: 'Collected', completed: false })
      }
      if (!timeline.some(t => t.status === 'In Transit') && order.tracking_status !== 'in_transit') {
        futureStatuses.push({ status: 'In Transit', completed: false })
      }
      if (!timeline.some(t => t.status === 'Out For Delivery') && order.tracking_status !== 'out_for_delivery') {
        futureStatuses.push({ status: 'Out For Delivery', completed: false })
      }
      if (!timeline.some(t => t.status === 'Delivered')) {
        futureStatuses.push({ status: 'Delivered', completed: false })
      }

      futureStatuses.forEach(status => {
        timeline.push({
          ...status,
          date: 'Expected',
          time: 'Expected'
        })
      })
    }

    // Get shipping address
    const shippingAddress = order.order_addresses?.find((addr: any) => addr.type === 'shipping')

    // Calculate estimated delivery
    let estimatedDelivery = '3-5 business days'
    if (order.tracking_status === 'out_for_delivery') {
      estimatedDelivery = 'Today'
    } else if (order.tracking_status === 'in_transit') {
      estimatedDelivery = '1-2 business days'
    } else if (order.tracking_status === 'delivered') {
      estimatedDelivery = 'Delivered'
    }

    const trackingInfo = {
      orderNumber: order.order_number,
      status: order.tracking_status?.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'Pending',
      estimatedDelivery,
      trackingNumber: order.tracking_number || 'TBD',
      timeline,
      shippingAddress: shippingAddress ? {
        firstName: shippingAddress.first_name,
        lastName: shippingAddress.last_name,
        address: shippingAddress.address_line_1,
        city: shippingAddress.city,
        postalCode: shippingAddress.postal_code,
        country: shippingAddress.country || 'South Africa'
      } : null
    }

    return NextResponse.json({ trackingInfo })
  } catch (error) {
    console.error('Error in track order API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 