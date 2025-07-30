import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/database"
import { EmailService } from "@/lib/email"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const abandonmentId = params.id
    console.log('Sending checkout abandonment email for abandonment ID:', abandonmentId)

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

    if (!abandonment.email) {
      console.error('No email address available for abandonment:', abandonmentId)
      return NextResponse.json({ error: 'No email address available for this abandonment' }, { status: 400 })
    }

    console.log('Sending email to:', abandonment.email)

    // Generate recovery URL
    const recoveryUrl = `${process.env.NEXT_PUBLIC_YOCO_BASE_URL || 'http://localhost:3000'}/checkout?session=${abandonment.session_id}`

    // Send checkout abandonment email
    const emailResult = await EmailService.sendCheckoutAbandonmentEmail({
      customerEmail: abandonment.email,
      checkoutItems: Array.isArray(abandonment.items) ? abandonment.items.map((item: any) => ({
        name: item.name || item.product_name || 'Lumeye Product',
        quantity: item.quantity || 1,
        price: item.price || item.unit_price || 0,
        image: item.image || item.product_image
      })) : [],
      totalValue: abandonment.cart_value || 0,
      recoveryUrl: recoveryUrl
    })

    if (!emailResult.success) {
      console.error('Failed to send email:', emailResult.error)
      return NextResponse.json({ 
        error: 'Failed to send email', 
        details: emailResult.error 
      }, { status: 500 })
    }

    // Update email sent count and timestamp
    const { error: updateError } = await supabase
      .from('checkout_abandonments')
      .update({
        email_sent_count: (abandonment.email_sent_count || 0) + 1,
        email_sent_at: new Date().toISOString()
      })
      .eq('id', abandonmentId)

    if (updateError) {
      console.error('Error updating checkout abandonment:', updateError)
      // Don't fail the request if update fails
    }

    console.log('Checkout abandonment email sent successfully to:', abandonment.email)

    return NextResponse.json({ 
      success: true, 
      message: 'Checkout abandonment email sent successfully' 
    })
  } catch (error) {
    console.error('Error sending checkout abandonment email:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 