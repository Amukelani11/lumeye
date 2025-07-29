import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'
import { EmailService } from '@/lib/email'
import { getAdminUsers } from '@/lib/admin'
import crypto from 'crypto'

// Function to generate tracking number
function generateTrackingNumber(): string {
  const prefix = 'LUM'
  const timestamp = Date.now().toString().slice(-8)
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}${timestamp}${random}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-yoco-signature')

    // Verify webhook signature (you should implement this with your webhook secret)
    // const expectedSignature = crypto
    //   .createHmac('sha256', process.env.YOCO_WEBHOOK_SECRET || '')
    //   .update(body)
    //   .digest('hex')
    
    // if (signature !== expectedSignature) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    // }

    const event = JSON.parse(body)
    console.log('Received Yoco webhook event:', event)

    // Handle payment.succeeded event
    if (event.type === 'payment.succeeded') {
      const payment = event.data
      console.log('Payment succeeded:', payment)

      // Get checkout details to extract metadata
      const checkoutResponse = await fetch(`https://payments.yoco.com/api/checkouts/${payment.checkoutId}`, {
        headers: {
          'Authorization': `Bearer ${process.env.YOCO_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      })

      if (!checkoutResponse.ok) {
        console.error('Failed to fetch checkout details')
        return NextResponse.json({ error: 'Failed to fetch checkout details' }, { status: 500 })
      }

      const checkoutData = await checkoutResponse.json()
      const metadata = checkoutData.metadata || {}
      
      console.log('Checkout metadata:', metadata)

      // Check if order already exists
      const { data: existingOrder } = await supabase
        .from('orders')
        .select('*')
        .eq('payment_id', payment.checkoutId)
        .single()

      if (existingOrder) {
        console.log('Order already exists, updating status:', existingOrder.id)
        
        // Update order status
        const { error: updateError } = await supabase
          .from('orders')
          .update({
            status: 'confirmed',
            payment_status: 'completed',
            updated_at: new Date().toISOString()
          })
          .eq('id', existingOrder.id)

        if (updateError) {
          console.error('Error updating order:', updateError)
          return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
        }
      } else {
        // Create new order
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        const trackingNumber = generateTrackingNumber()

        // Calculate totals from line items
        const lineItems = checkoutData.lineItems || []
        const subtotal = lineItems.reduce((sum: number, item: any) => {
          return sum + (item.pricingDetails.price * item.quantity / 100) // Convert from cents
        }, 0)
        const shippingCost = subtotal >= 250 ? 0 : 50
        const totalAmount = subtotal + shippingCost

        // Create order
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert({
            order_number: orderNumber,
            email: metadata.email || 'unknown@email.com',
            phone: metadata.phone || '',
            status: 'confirmed',
            payment_status: 'completed',
            shipping_status: 'pending',
            subtotal,
            shipping_cost: shippingCost,
            tax_amount: 0,
            discount_amount: 0,
            total_amount: totalAmount,
            currency: 'ZAR',
            tracking_number: trackingNumber,
            payment_id: payment.checkoutId,
            notes: `Payment completed via Yoco. Payment ID: ${payment.id}`
          })
          .select()
          .single()

        if (orderError) {
          console.error('Error creating order:', orderError)
          return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
        }

        // Create order items
        const orderItems = lineItems.map((item: any) => ({
          order_id: order.id,
          product_id: null,
          quantity: item.quantity,
          unit_price: item.pricingDetails.price / 100, // Convert from cents
          total_price: (item.pricingDetails.price * item.quantity) / 100,
          product_snapshot: {
            name: item.displayName || 'Lumeye Under Eye Serum',
            price: item.pricingDetails.price / 100,
            images: []
          }
        }))

        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems)

        if (itemsError) {
          console.error('Error creating order items:', itemsError)
        }

        // Create shipping address
        const { error: addressError } = await supabase
          .from('shipping_addresses')
          .insert({
            order_id: order.id,
            first_name: metadata.firstName || '',
            last_name: metadata.lastName || '',
            address: metadata.address || '',
            city: metadata.city || '',
            postal_code: metadata.postalCode || '',
            country: 'South Africa'
          })

        if (addressError) {
          console.error('Error creating shipping address:', addressError)
        }

        // Send confirmation email
        try {
          await EmailService.sendOrderConfirmation({
            orderNumber: order.orderNumber,
            customerName: `${metadata.firstName || ''} ${metadata.lastName || ''}`.trim() || 'Customer',
            customerEmail: metadata.email || 'unknown@email.com',
            orderDate: new Date().toISOString(),
            totalAmount: order.totalAmount,
            trackingNumber: order.trackingNumber,
            items: lineItems.map((item: any) => ({
              name: item.displayName || 'Lumeye Under Eye Serum',
              quantity: item.quantity,
              price: item.pricingDetails.price / 100,
              productType: item.displayName?.toLowerCase().includes('glowsmile') ? 'glowsmile' : 'eye_serum'
            })),
            shippingAddress: {
              firstName: metadata.firstName || '',
              lastName: metadata.lastName || '',
              address: metadata.address || '',
              city: metadata.city || '',
              postalCode: metadata.postalCode || '',
              country: 'South Africa'
            }
          })

          // Send admin notifications
          const adminUsers = await getAdminUsers()
          for (const admin of adminUsers) {
            await EmailService.sendAdminSaleNotification({
              orderNumber: order.orderNumber,
              customerName: `${metadata.firstName || ''} ${metadata.lastName || ''}`.trim() || 'Customer',
              customerEmail: metadata.email || 'unknown@email.com',
              customerPhone: metadata.phone || '',
              orderDate: new Date().toISOString(),
              totalAmount: order.totalAmount,
              paymentMethod: 'Yoco',
              paymentId: payment.id,
              items: lineItems.map((item: any) => ({
                name: item.displayName || 'Lumeye Under Eye Serum',
                quantity: item.quantity,
                price: item.pricingDetails.price / 100
              })),
              shippingAddress: {
                firstName: metadata.firstName || '',
                lastName: metadata.lastName || '',
                address: metadata.address || '',
                city: metadata.city || '',
                postalCode: metadata.postalCode || '',
                country: 'South Africa'
              },
              adminEmail: admin.email
            })
          }
          console.log(`Admin sale notifications sent to ${adminUsers.length} admin users`)

          // Mark any reserved discounts as actually used since order is completed
          if (metadata.email) {
            const { data: emailCaptures, error: discountError } = await supabase
              .from('email_captures')
              .select('*')
              .eq('email', metadata.email.toLowerCase())
              .eq('discount_reserved', true)

            if (discountError) {
              console.error('Error checking for reserved discounts:', discountError)
            } else if (emailCaptures && emailCaptures.length > 0) {
              // Mark all reserved discounts as actually used
              const { error: updateDiscountError } = await supabase
                .from('email_captures')
                .update({
                  discount_applied: true,
                  discount_reserved: false,
                  applied_at: new Date().toISOString(),
                  order_completed: true,
                  completed_at: new Date().toISOString()
                })
                .eq('email', metadata.email.toLowerCase())
                .eq('discount_reserved', true)

              if (updateDiscountError) {
                console.error('Error marking discounts as used:', updateDiscountError)
              } else {
                console.log(`Marked ${emailCaptures.length} discount(s) as used for email: ${metadata.email}`)
              }
            }
          }
        } catch (emailError) {
          console.error('Error sending emails:', emailError)
        }

        console.log('Order created successfully:', order.id)
      }

      // Update live visitor status to purchased
      const { error: liveVisitorError } = await supabase
        .from('live_visitors')
        .update({
          status: 'purchased',
          last_activity: new Date().toISOString()
        })
        .eq('session_id', payment.checkoutId)

      if (liveVisitorError) {
        console.error('Error updating live visitor status:', liveVisitorError)
      }

      // Note: Cart clearing will be handled on the client side when user is redirected to order confirmation
    }

    // Handle payment.failed event
    if (event.type === 'payment.failed') {
      const payment = event.data
      console.log('Payment failed:', payment)

      // Find order by checkout ID
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('payment_id', payment.checkoutId)
        .single()

      if (orderError || !order) {
        console.error('Order not found for checkout ID:', payment.checkoutId)
        return NextResponse.json({ error: 'Order not found' }, { status: 404 })
      }

      // Update order status
      const { error: updateError } = await supabase
        .from('orders')
        .update({
          status: 'cancelled',
          payment_status: 'failed',
          updated_at: new Date().toISOString()
        })
        .eq('id', order.id)

      if (updateError) {
        console.error('Error updating order:', updateError)
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
      }

      console.log('Order marked as failed:', order.id)
    }

    // Handle checkout.cancelled event
    if (event.type === 'checkout.cancelled') {
      const checkout = event.data
      console.log('Checkout cancelled:', checkout)

      // Find order by checkout ID
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('payment_id', checkout.id)
        .single()

      if (orderError || !order) {
        console.error('Order not found for checkout ID:', checkout.id)
        return NextResponse.json({ error: 'Order not found' }, { status: 404 })
      }

      // Update order status
      const { error: updateError } = await supabase
        .from('orders')
        .update({
          status: 'cancelled',
          payment_status: 'failed',
          updated_at: new Date().toISOString()
        })
        .eq('id', order.id)

      if (updateError) {
        console.error('Error updating order:', updateError)
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
      }

      console.log('Order marked as cancelled:', order.id)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
} 