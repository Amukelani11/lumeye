import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/database"
import { EmailService } from "@/lib/email"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const abandonmentId = params.id

    // Fetch checkout abandonment details
    const { data: abandonment, error: abandonmentError } = await supabase
      .from('checkout_abandonments')
      .select('*')
      .eq('id', abandonmentId)
      .single()

    if (abandonmentError || !abandonment) {
      console.error('Error fetching checkout abandonment:', abandonmentError)
      return NextResponse.json({ error: 'Checkout abandonment not found' }, { status: 404 })
    }

    // Generate recovery URL
    const recoveryUrl = `${process.env.NEXT_PUBLIC_YOCO_BASE_URL || 'http://localhost:3000'}/checkout?session=${abandonment.session_id}`

    // Send checkout abandonment email
    await EmailService.sendCheckoutAbandonmentEmail({
      customerEmail: abandonment.email,
      checkoutItems: Array.isArray(abandonment.checkout_data) ? abandonment.checkout_data.map((item: any) => ({
        name: item.product_name || 'Lumeye Under Eye Serum',
        quantity: item.quantity,
        price: item.unit_price,
        image: item.product_image
      })) : [],
      totalValue: abandonment.total_value,
      recoveryUrl: recoveryUrl
    })

    // Update email sent count and timestamp
    const { error: updateError } = await supabase
      .from('checkout_abandonments')
      .update({
        email_sent_count: abandonment.email_sent_count + 1,
        email_sent_at: new Date().toISOString()
      })
      .eq('id', abandonmentId)

    if (updateError) {
      console.error('Error updating checkout abandonment:', updateError)
      // Don't fail the request if update fails
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Checkout abandonment email sent successfully' 
    })
  } catch (error) {
    console.error('Error sending checkout abandonment email:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 