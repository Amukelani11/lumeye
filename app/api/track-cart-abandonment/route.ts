import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const { sessionId, email, cartItems, totalValue } = await request.json()

    if (!sessionId || !cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: 'Session ID and cart items are required' }, { status: 400 })
    }

    // Check if cart already exists
    const { data: existingCart } = await supabase
      .from('abandoned_carts')
      .select('id')
      .eq('session_id', sessionId)
      .eq('is_recovered', false)
      .single()

    const cartData = {
      session_id: sessionId,
      email: email || null,
      cart_data: cartItems,
      items: cartItems, // Keep for backward compatibility
      total_value: totalValue || cartItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0),
      cart_value: totalValue || cartItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0),
      items_count: cartItems.length,
      abandoned_at: new Date().toISOString(),
      last_cart_activity: new Date().toISOString(),
      captured_at: new Date().toISOString(),
      is_recovered: false,
      email_sent_count: 0
    }

    if (existingCart) {
      // Update existing cart
      const { error } = await supabase
        .from('abandoned_carts')
        .update(cartData)
        .eq('id', existingCart.id)

      if (error) {
        console.error('Error updating abandoned cart:', error)
        return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 })
      }
    } else {
      // Insert new cart
      const { error } = await supabase
        .from('abandoned_carts')
        .insert(cartData)

      if (error) {
        console.error('Error creating abandoned cart:', error)
        return NextResponse.json({ error: 'Failed to track cart' }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking cart abandonment:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

