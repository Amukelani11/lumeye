import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/database"
import { EmailService } from "@/lib/email"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cartId = params.id
    console.log('Sending abandoned cart email for cart ID:', cartId)

    // Check email service configuration first
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json({ 
        error: 'Email service not configured', 
        details: 'Please set RESEND_API_KEY environment variable on your server',
        config: {
          resendApiKey: false,
          resendFromEmail: process.env.RESEND_FROM_EMAIL || 'Not set',
          nodeEnv: process.env.NODE_ENV || 'Not set'
        }
      }, { status: 500 })
    }

    // Fetch abandoned cart details
    const { data: cart, error: cartError } = await supabase
      .from('abandoned_carts')
      .select('*')
      .eq('id', cartId)
      .single()

    if (cartError || !cart) {
      console.error('Error fetching abandoned cart:', cartError)
      return NextResponse.json({ error: 'Abandoned cart not found' }, { status: 404 })
    }

    if (!cart.email) {
      console.error('No email address available for cart:', cartId)
      return NextResponse.json({ error: 'No email address available for this cart' }, { status: 400 })
    }

    console.log('Sending email to:', cart.email)

    // Generate recovery URL
    const recoveryUrl = `${process.env.NEXT_PUBLIC_YOCO_BASE_URL || 'http://localhost:3000'}/cart?session=${cart.session_id}`

    // Send abandoned cart email
    const emailResult = await EmailService.sendAbandonedCartEmail({
      customerEmail: cart.email,
      cartItems: Array.isArray(cart.items) ? cart.items.map((item: any) => ({
        name: item.name || item.product_name || 'Lumeye Product',
        quantity: item.quantity || 1,
        price: item.price || item.unit_price || 0,
        image: item.image || item.product_image
      })) : [],
      totalValue: cart.cart_value || 0,
      recoveryUrl: recoveryUrl
    })

    if (!emailResult.success) {
      console.error('Failed to send email:', emailResult.error)
      return NextResponse.json({ 
        error: 'Failed to send email', 
        details: emailResult.error,
        config: {
          resendApiKey: !!process.env.RESEND_API_KEY,
          resendFromEmail: process.env.RESEND_FROM_EMAIL || 'Not set',
          nodeEnv: process.env.NODE_ENV || 'Not set'
        }
      }, { status: 500 })
    }

    // Update email sent count and timestamp
    const { error: updateError } = await supabase
      .from('abandoned_carts')
      .update({
        email_sent_count: (cart.email_sent_count || 0) + 1,
        email_sent_at: new Date().toISOString()
      })
      .eq('id', cartId)

    if (updateError) {
      console.error('Error updating abandoned cart:', updateError)
      // Don't fail the request if update fails
    }

    console.log('Abandoned cart email sent successfully to:', cart.email)

    return NextResponse.json({ 
      success: true, 
      message: 'Abandoned cart email sent successfully' 
    })
  } catch (error) {
    console.error('Error sending abandoned cart email:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
      config: {
        resendApiKey: !!process.env.RESEND_API_KEY,
        resendFromEmail: process.env.RESEND_FROM_EMAIL || 'Not set',
        nodeEnv: process.env.NODE_ENV || 'Not set'
      }
    }, { status: 500 })
  }
} 