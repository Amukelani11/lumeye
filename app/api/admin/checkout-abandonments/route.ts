import { NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function GET() {
  try {
    // Fetch checkout abandonments
    const { data: checkoutAbandonments, error: checkoutAbandonmentsError } = await supabase
      .from('checkout_abandonments')
      .select('*')
      .order('abandoned_at', { ascending: false })

    if (checkoutAbandonmentsError) {
      console.error('Error fetching checkout abandonments:', checkoutAbandonmentsError)
      return NextResponse.json({ error: 'Failed to fetch checkout abandonments' }, { status: 500 })
    }

    return NextResponse.json({ checkoutAbandonments: checkoutAbandonments || [] })
  } catch (error) {
    console.error('Error in checkout abandonments API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 