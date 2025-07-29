import { NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function GET() {
  try {
    // Fetch abandoned carts with proper data structure
    const { data: abandonedCarts, error: abandonedCartsError } = await supabase
      .from('abandoned_carts')
      .select('*')
      .order('abandoned_at', { ascending: false })

    if (abandonedCartsError) {
      console.error('Error fetching abandoned carts:', abandonedCartsError)
      return NextResponse.json({ error: 'Failed to fetch abandoned carts' }, { status: 500 })
    }

    // Transform the data to match the expected format
    const transformedCarts = (abandonedCarts || []).map(cart => ({
      id: cart.id,
      session_id: cart.session_id,
      email: cart.email,
      cart_data: cart.cart_data || [],
      total_value: cart.total_value || 0,
      items_count: cart.items_count || 0,
      abandoned_at: cart.abandoned_at,
      recovered_at: cart.recovered_at,
      email_sent_at: cart.email_sent_at,
      email_sent_count: cart.email_sent_count || 0,
      is_recovered: cart.is_recovered || false
    }))

    return NextResponse.json({ abandonedCarts: transformedCarts })
  } catch (error) {
    console.error('Error in abandoned carts API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 