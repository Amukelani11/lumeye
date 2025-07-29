import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/database"
import { EmailService } from "@/lib/email"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const emailCaptureId = params.id

    // Fetch email capture details
    const { data: emailCapture, error: emailError } = await supabase
      .from('email_captures')
      .select('*')
      .eq('id', emailCaptureId)
      .single()

    if (emailError || !emailCapture) {
      console.error('Error fetching email capture:', emailError)
      return NextResponse.json({ error: 'Email capture not found' }, { status: 404 })
    }

    // Get request body for additional data
    const body = await request.json()
    const { items, totalAmount, paymentMethod, errorMessage } = body

    // Generate retry URL
    const retryUrl = `${process.env.NEXT_PUBLIC_YOCO_BASE_URL || 'http://localhost:3000'}/checkout`

    // Send failed payment email
    await EmailService.sendFailedPaymentEmail({
      customerEmail: emailCapture.email,
      customerName: emailCapture.metadata?.customerName,
      orderNumber: emailCapture.metadata?.orderNumber,
      totalAmount: totalAmount || 0,
      items: items || [{
        name: 'Lumeye Under Eye Serum',
        quantity: 1,
        price: totalAmount || 0
      }],
      paymentMethod: paymentMethod || 'Credit Card',
      retryUrl: retryUrl,
      errorMessage: errorMessage
    })

    // Update email capture with failed payment sent status
    const { error: updateError } = await supabase
      .from('email_captures')
      .update({
        metadata: {
          ...emailCapture.metadata,
          failed_payment_email_sent: true,
          failed_payment_email_sent_at: new Date().toISOString()
        }
      })
      .eq('id', emailCaptureId)

    if (updateError) {
      console.error('Error updating email capture:', updateError)
      // Don't fail the request if update fails
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Failed payment email sent successfully' 
    })
  } catch (error) {
    console.error('Error sending failed payment email:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 