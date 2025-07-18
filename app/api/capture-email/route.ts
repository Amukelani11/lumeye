import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { email, sessionId, cartData } = await request.json()

    if (!email || !sessionId) {
      return NextResponse.json({ error: 'Email and session ID are required' }, { status: 400 })
    }

    // Check if there's an existing abandoned cart for this session
    const { data: existingCart, error: existingError } = await supabase
      .from('abandoned_carts')
      .select('*')
      .eq('session_id', sessionId)
      .single()

    if (existingCart) {
      // Update existing abandoned cart with email
      const { error: updateError } = await supabase
        .from('abandoned_carts')
        .update({
          email: email,
          updated_at: new Date().toISOString()
        })
        .eq('session_id', sessionId)

      if (updateError) {
        console.error('Error updating abandoned cart:', updateError)
      }
    } else {
      // Create new abandoned cart record
      const { error: insertError } = await supabase
        .from('abandoned_carts')
        .insert({
          session_id: sessionId,
          email: email,
          cart_data: cartData || [],
          total_value: 0,
          items_count: 0
        })

      if (insertError) {
        console.error('Error creating abandoned cart:', insertError)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in capture email API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 