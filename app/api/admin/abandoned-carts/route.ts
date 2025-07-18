import { NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function GET() {
  try {
    // Fetch abandoned carts
    const { data: abandonedCarts, error: abandonedCartsError } = await supabase
      .from('abandoned_carts')
      .select('*')
      .order('abandoned_at', { ascending: false })

    if (abandonedCartsError) {
      console.error('Error fetching abandoned carts:', abandonedCartsError)
      return NextResponse.json({ error: 'Failed to fetch abandoned carts' }, { status: 500 })
    }

    return NextResponse.json({ abandonedCarts: abandonedCarts || [] })
  } catch (error) {
    console.error('Error in abandoned carts API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 