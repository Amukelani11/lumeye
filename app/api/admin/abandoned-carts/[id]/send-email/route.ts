import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/database"
import { EmailService } from "@/lib/email"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cartId = params.id

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
      return NextResponse.json({ error: 'No email address available for this cart' }, { status: 400 })
    }

    // Generate recovery URL
    const recoveryUrl = `${process.env.NEXT_PUBLIC_YOCO_BASE_URL || 'http://localhost:3000'}/cart?session=${cart.session_id}`

    // Send abandoned cart email
    await EmailService.sendAbandonedCartEmail({
      customerEmail: cart.email,
      cartItems: Array.isArray(cart.cart_data) ? cart.cart_data.map((item: any) => ({
        name: item.product_name || 'Lumeye Under Eye Serum',
        quantity: item.quantity,
        price: item.unit_price,
        image: item.product_image
      })) : [],
      totalValue: cart.total_value,
      recoveryUrl: recoveryUrl
    })

    // Update email sent count and timestamp
    const { error: updateError } = await supabase
      .from('abandoned_carts')
      .update({
        email_sent_count: cart.email_sent_count + 1,
        email_sent_at: new Date().toISOString()
      })
      .eq('id', cartId)

    if (updateError) {
      console.error('Error updating abandoned cart:', updateError)
      // Don't fail the request if update fails
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Abandoned cart email sent successfully' 
    })
  } catch (error) {
    console.error('Error sending abandoned cart email:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 