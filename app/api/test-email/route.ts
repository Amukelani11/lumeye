import { NextRequest, NextResponse } from "next/server"
import { EmailService } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const { email, type, quantity = 1 } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    console.log('Testing email sending to:', email, 'Type:', type, 'Quantity:', quantity)

    let result

    switch (type) {
      case 'abandoned_cart':
        result = await EmailService.sendAbandonedCartEmail({
          customerEmail: email,
          cartItems: [{
            name: 'Lumeye Under Eye Serum',
            quantity: quantity,
            price: 159.00
          }],
          totalValue: 159.00 * quantity,
          recoveryUrl: `${process.env.NEXT_PUBLIC_YOCO_BASE_URL || 'http://localhost:3000'}/cart?session=test-session`
        })
        break

      case 'checkout_abandonment':
        result = await EmailService.sendCheckoutAbandonmentEmail({
          customerEmail: email,
          checkoutItems: [{
            name: 'Lumeye Under Eye Serum',
            quantity: quantity,
            price: 159.00
          }],
          totalValue: 159.00 * quantity,
          recoveryUrl: `${process.env.NEXT_PUBLIC_YOCO_BASE_URL || 'http://localhost:3000'}/checkout?session=test-session`
        })
        break

      case 'failed_payment':
        result = await EmailService.sendFailedPaymentEmail({
          customerEmail: email,
          totalAmount: 159.00 * quantity,
          items: [{
            name: 'Lumeye Under Eye Serum',
            quantity: quantity,
            price: 159.00
          }],
          paymentMethod: 'Credit Card',
          retryUrl: `${process.env.NEXT_PUBLIC_YOCO_BASE_URL || 'http://localhost:3000'}/checkout`,
          errorMessage: 'Payment was declined. Please check your card details and try again.'
        })
        break

      default:
        return NextResponse.json({ error: 'Invalid email type' }, { status: 400 })
    }

    if (result.success) {
      console.log('Test email sent successfully')
      return NextResponse.json({ 
        success: true, 
        message: 'Test email sent successfully',
        type 
      })
    } else {
      console.error('Test email failed:', result.error)
      return NextResponse.json({ 
        success: false, 
        error: result.error,
        type 
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Error in test email API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 