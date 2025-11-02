import { NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function GET() {
  try {
    // Fetch checkout abandonments - checkouts that haven't been converted in last 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    
    const { data: checkoutAbandonments, error: checkoutAbandonmentsError } = await supabase
      .from('checkout_abandonments')
      .select('*')
      .or(`abandoned_at.gte.${oneDayAgo},abandoned_at.is.null`)
      .eq('is_recovered', false)
      .order('abandoned_at', { ascending: false })
      .limit(100)

    if (checkoutAbandonmentsError) {
      console.error('Error fetching checkout abandonments:', checkoutAbandonmentsError)
      return NextResponse.json({ error: 'Failed to fetch checkout abandonments' }, { status: 500 })
    }

    // Format the data to match frontend expectations
    const formattedAbandonments = (checkoutAbandonments || []).map((abandonment: any) => ({
      id: abandonment.id.toString(),
      session_id: abandonment.session_id || '',
      email: abandonment.email || '',
      checkout_data: abandonment.checkout_data || abandonment.items || [],
      total_value: parseFloat(abandonment.total_value || abandonment.cart_value || 0),
      items_count: abandonment.items_count || (abandonment.items ? (Array.isArray(abandonment.items) ? abandonment.items.length : 0) : 0),
      abandoned_at: abandonment.abandoned_at || abandonment.checkout_started_at || abandonment.created_at,
      recovered_at: abandonment.recovered_at || abandonment.converted_at || null,
      email_sent_at: abandonment.email_sent_at || 
                     (abandonment.first_reminder_sent_at ? abandonment.first_reminder_sent_at : null) ||
                     (abandonment.second_reminder_sent_at ? abandonment.second_reminder_sent_at : null) || null,
      email_sent_count: abandonment.email_sent_count || 
                        ((abandonment.first_reminder_sent ? 1 : 0) + (abandonment.second_reminder_sent ? 1 : 0)),
      is_recovered: abandonment.is_recovered || (abandonment.converted_at ? true : false) || false
    }))

    return NextResponse.json({ checkoutAbandonments: formattedAbandonments })
  } catch (error) {
    console.error('Error in checkout abandonments API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 