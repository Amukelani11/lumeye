import { NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function GET() {
  try {
    // Fetch abandoned carts with proper data structure
    const { data: abandonedCarts, error: abandonedCartsError } = await supabase
      .from('abandoned_carts')
      .select('*')
      .order('last_cart_activity', { ascending: false })

    if (abandonedCartsError) {
      console.error('Error fetching abandoned carts:', abandonedCartsError)
      return NextResponse.json({ error: 'Failed to fetch abandoned carts' }, { status: 500 })
    }

    // Transform the data to match the expected format
    const transformedCarts = (abandonedCarts || []).map(cart => ({
      id: cart.id,
      session_id: cart.session_id,
      email: cart.email,
      cart_data: cart.items || [],
      total_value: cart.cart_value || 0,
      items_count: cart.items ? (Array.isArray(cart.items) ? cart.items.length : 1) : 0,
      abandoned_at: cart.last_cart_activity,
      recovered_at: cart.converted_at,
      email_sent_at: cart.captured_at,
      email_sent_count: cart.email ? 1 : 0,
      is_recovered: cart.status === 'converted',
      status: cart.status
    }))

    return NextResponse.json({ abandonedCarts: transformedCarts })
  } catch (error) {
    console.error('Error in abandoned carts API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 