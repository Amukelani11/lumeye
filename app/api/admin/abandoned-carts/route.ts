import { NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function GET() {
  try {
    // Fetch abandoned carts - carts that haven't been converted in last 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    
    const { data: abandonedCarts, error: abandonedCartsError } = await supabase
      .from('abandoned_carts')
      .select('*')
      .or(`abandoned_at.gte.${oneDayAgo},abandoned_at.is.null`)
      .eq('is_recovered', false)
      .order('abandoned_at', { ascending: false })
      .limit(100)

    if (abandonedCartsError) {
      console.error('Error fetching abandoned carts:', abandonedCartsError)
      return NextResponse.json({ error: 'Failed to fetch abandoned carts' }, { status: 500 })
    }

    // Format the data to match frontend expectations
    const formattedCarts = (abandonedCarts || []).map((cart: any) => ({
      id: cart.id.toString(),
      session_id: cart.session_id || '',
      email: cart.email || null,
      cart_data: cart.cart_data || cart.items || [],
      total_value: parseFloat(cart.total_value || cart.cart_value || 0),
      items_count: cart.items_count || (cart.items ? (Array.isArray(cart.items) ? cart.items.length : 0) : 0),
      abandoned_at: cart.abandoned_at || cart.last_cart_activity || cart.captured_at || cart.created_at,
      recovered_at: cart.recovered_at || cart.converted_at || null,
      email_sent_at: cart.email_sent_at || 
                     (cart.first_reminder_sent_at ? cart.first_reminder_sent_at : null) ||
                     (cart.second_reminder_sent_at ? cart.second_reminder_sent_at : null) || null,
      email_sent_count: cart.email_sent_count || 
                        ((cart.first_reminder_sent ? 1 : 0) + (cart.second_reminder_sent ? 1 : 0)),
      is_recovered: cart.is_recovered || (cart.converted_at ? true : false) || false
    }))

    return NextResponse.json({ abandonedCarts: formattedCarts })
  } catch (error) {
    console.error('Error in abandoned carts API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 