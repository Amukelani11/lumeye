import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'
import crypto from 'crypto'

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
          status: 'confirmed',
          payment_status: 'completed',
          updated_at: new Date().toISOString()
        })
        .eq('id', order.id)

      if (updateError) {
        console.error('Error updating order:', updateError)
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
      }

      // Update payment record
      const { error: paymentUpdateError } = await supabase
        .from('payments')
        .update({
          status: 'completed',
          transaction_id: payment.id,
          updated_at: new Date().toISOString()
        })
        .eq('order_id', order.id)

      if (paymentUpdateError) {
        console.error('Error updating payment record:', paymentUpdateError)
        // Don't fail the webhook if payment record update fails
      }

      // Update live visitor status to purchased
      const { error: liveVisitorError } = await supabase
        .from('live_visitors')
        .update({
          status: 'purchased',
          last_activity: new Date().toISOString()
        })
        .eq('session_id', order.payment_id) // Use payment_id as session_id

      if (liveVisitorError) {
        console.error('Error updating live visitor status:', liveVisitorError)
        // Don't fail the webhook if live visitor update fails
      }

      console.log('Order updated successfully:', order.id)
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

      // Update payment record
      const { error: paymentUpdateError } = await supabase
        .from('payments')
        .update({
          status: 'failed',
          updated_at: new Date().toISOString()
        })
        .eq('order_id', order.id)

      if (paymentUpdateError) {
        console.error('Error updating payment record:', paymentUpdateError)
        // Don't fail the webhook if payment record update fails
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

      // Update payment record
      const { error: paymentUpdateError } = await supabase
        .from('payments')
        .update({
          status: 'failed',
          updated_at: new Date().toISOString()
        })
        .eq('order_id', order.id)

      if (paymentUpdateError) {
        console.error('Error updating payment record:', paymentUpdateError)
        // Don't fail the webhook if payment record update fails
      }

      console.log('Order marked as cancelled:', order.id)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
} 