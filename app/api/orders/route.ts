import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { EmailService } from '@/lib/email'
import { getAdminUsers } from '@/lib/admin'

// Function to generate tracking number
function generateTrackingNumber(): string {
  const prefix = 'LUM'
  const timestamp = Date.now().toString().slice(-8)
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}${timestamp}${random}`
}

export async function POST(request: NextRequest) {
  try {
    const { 
      email, 
      phone, 
      shippingAddress, 
      paymentMethod,
      paymentId,
      paymentAmount,
      notes,
      items
    } = await request.json()

    if (!email || !shippingAddress || !items || items.length === 0) {
      return NextResponse.json({ error: 'Email, shipping address, and items are required' }, { status: 400 })
    }

    // Calculate totals from the provided items
    const subtotal = items.reduce((sum: number, item: any) => sum + (Number(item.unit_price) * item.quantity), 0)
    const shippingCost = 0 // Free shipping for all orders
    const taxAmount = 0 // No VAT as requested
    const discountAmount = 0
    const totalAmount = subtotal + shippingCost + taxAmount - discountAmount

    // Validate that the payment amount matches the calculated total
    if (Math.abs(paymentAmount - totalAmount) > 0.01) {
      return NextResponse.json({ error: 'Payment amount does not match order total' }, { status: 400 })
    }

    // Generate order number and tracking number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    const trackingNumber = generateTrackingNumber()

    // Create Supabase client with service role key
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    
    if (!supabaseServiceKey) {
      console.error('SUPABASE_SERVICE_ROLE_KEY is not set')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        email,
        phone,
        status: 'pending',
        payment_status: 'pending',
        shipping_status: 'pending',
        subtotal,
        shipping_cost: shippingCost,
        tax_amount: taxAmount,
        discount_amount: discountAmount,
        total_amount: totalAmount,
        currency: 'ZAR',
        tracking_number: trackingNumber,
        notes: notes || `Payment pending via ${paymentMethod}. Payment ID: ${paymentId}`
      })
      .select()
      .single()

    if (orderError) {
      console.error('Error creating order:', orderError)
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }

    // Create order items
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: null, // Set to null since we don't have proper UUIDs in guest checkout
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.unit_price * item.quantity,
      product_snapshot: {
        name: item.name || 'Lumeye Under Eye Serum',
        price: item.unit_price,
        images: item.images || []
      }
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      console.error('Error creating order items:', itemsError)
      return NextResponse.json({ error: 'Failed to create order items' }, { status: 500 })
    }

    // Create shipping address
    const { error: addressError } = await supabase
      .from('order_addresses')
      .insert({
        order_id: order.id,
        type: 'shipping',
        first_name: shippingAddress.first_name,
        last_name: shippingAddress.last_name,
        address_line_1: shippingAddress.address_line_1,
        city: shippingAddress.city,
        postal_code: shippingAddress.postal_code,
        country: shippingAddress.country || 'ZA'
      })

    if (addressError) {
      console.error('Error creating order address:', addressError)
      return NextResponse.json({ error: 'Failed to create order address' }, { status: 500 })
    }

    // Create payment record
    const { error: paymentError } = await supabase
      .from('payments')
      .insert({
        order_id: order.id,
        payment_method: paymentMethod,
        payment_id: paymentId,
        amount: paymentAmount,
        currency: 'ZAR',
        status: 'pending',
        transaction_id: null
      })

    if (paymentError) {
      console.error('Error creating payment record:', paymentError)
      // Don't fail the order creation if payment record creation fails
    }

    // Send order confirmation email with tracking number
    try {
      await EmailService.sendOrderConfirmation({
        orderNumber: order.order_number,
        customerName: `${shippingAddress.first_name} ${shippingAddress.last_name}`,
        customerEmail: email,
        orderDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        totalAmount: order.total_amount,
        trackingNumber: trackingNumber,
        items: items.map((item: any) => ({
          name: item.name || 'Lumeye Under Eye Serum',
          quantity: item.quantity,
          price: item.unit_price
        })),
        shippingAddress: {
          firstName: shippingAddress.first_name,
          lastName: shippingAddress.last_name,
          address: shippingAddress.address_line_1,
          city: shippingAddress.city,
          postalCode: shippingAddress.postal_code,
          country: shippingAddress.country || 'South Africa'
        }
      })
    } catch (emailError) {
      console.error('Error sending order confirmation email:', emailError)
      // Don't fail the order creation if email fails
    }

    // Send admin notification for new sale
    try {
      const adminUsers = await getAdminUsers()
      
      if (adminUsers.length > 0) {
        // Send notification to all admin users
        const adminNotificationPromises = adminUsers.map(adminUser => 
          EmailService.sendAdminSaleNotification({
            orderNumber: order.order_number,
            customerName: `${shippingAddress.first_name} ${shippingAddress.last_name}`,
            customerEmail: email,
            customerPhone: phone,
            orderDate: new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            totalAmount: order.total_amount,
            paymentMethod: paymentMethod,
            paymentId: paymentId,
            items: items.map((item: any) => ({
              name: item.name || 'Lumeye Under Eye Serum',
              quantity: item.quantity,
              price: item.unit_price
            })),
            shippingAddress: {
              firstName: shippingAddress.first_name,
              lastName: shippingAddress.last_name,
              address: shippingAddress.address_line_1,
              city: shippingAddress.city,
              postalCode: shippingAddress.postal_code,
              country: shippingAddress.country || 'South Africa'
            },
            adminEmail: adminUser.email
          })
        )

        await Promise.all(adminNotificationPromises)
        console.log(`Admin sale notifications sent to ${adminUsers.length} admin users`)
      } else {
        console.log('No admin users found to send sale notification')
      }
    } catch (adminEmailError) {
      console.error('Error sending admin sale notification:', adminEmailError)
      // Don't fail the order creation if admin email fails
    }

    return NextResponse.json({ 
      success: true, 
      order: {
        id: order.id,
        order_number: order.order_number,
        total_amount: order.total_amount,
        status: order.status,
        tracking_number: trackingNumber
      }
    })
  } catch (error) {
    console.error('Error in orders POST API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 