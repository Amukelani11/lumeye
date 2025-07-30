import { NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function GET() {
  try {
    // Fetch checkout abandonments
    const { data: checkoutAbandonments, error: checkoutAbandonmentsError } = await supabase
      .from('checkout_abandonments')
      .select('*')
      .order('checkout_started_at', { ascending: false })

    if (checkoutAbandonmentsError) {
      console.error('Error fetching checkout abandonments:', checkoutAbandonmentsError)
      return NextResponse.json({ error: 'Failed to fetch checkout abandonments' }, { status: 500 })
    }

    // Map database fields to expected interface
    const mappedAbandonments = (checkoutAbandonments || []).map(abandonment => ({
      id: abandonment.id,
      session_id: abandonment.session_id,
      email: abandonment.email || 'No email',
      checkout_data: abandonment.items || [],
      total_value: abandonment.cart_value || 0,
      items_count: Array.isArray(abandonment.items) ? abandonment.items.length : 0,
      abandoned_at: abandonment.checkout_started_at,
      recovered_at: abandonment.converted_at || null,
      email_sent_at: null, // Not implemented yet
      email_sent_count: 0, // Not implemented yet
      is_recovered: abandonment.status === 'converted' || !!abandonment.converted_at
    }))

    return NextResponse.json({ checkoutAbandonments: mappedAbandonments })
  } catch (error) {
    console.error('Error in checkout abandonments API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 