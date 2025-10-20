import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { 
      amount, 
      currency = 'ZAR',
      cancelUrl,
      successUrl,
      failureUrl,
      metadata,
      lineItems 
    } = await request.json()

    if (!amount || amount < 2) { // Minimum R2.00 in rand
      return NextResponse.json({
        error: 'Amount is required and must be at least R2.00'
      }, { status: 400 })
    }

    const secretKey = process.env.YOCO_SECRET_KEY
    if (!secretKey) {
      console.error('YOCO_SECRET_KEY is not set in environment variables')
      return NextResponse.json({ 
        error: 'Payment system configuration error' 
      }, { status: 500 })
    }

    const checkoutData = {
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      cancelUrl: cancelUrl || `${process.env.NEXT_PUBLIC_YOCO_BASE_URL || 'http://localhost:3000'}/checkout`,
      successUrl: successUrl || `${process.env.NEXT_PUBLIC_YOCO_BASE_URL || 'http://localhost:3000'}/order-confirmation`,
      failureUrl: failureUrl || `${process.env.NEXT_PUBLIC_YOCO_BASE_URL || 'http://localhost:3000'}/checkout`,
      metadata: {
        ...metadata,
        checkoutId: `checkout_${Date.now()}`,
        paymentFacilitator: 'yoco-online-checkout'
      },
      lineItems: lineItems ? lineItems.map((item: any) => ({
        displayName: item.name,
        quantity: item.quantity,
        pricingDetails: {
          price: item.unitPrice
        }
      })) : []
    }

    const response = await fetch('https://payments.yoco.com/api/checkouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${secretKey}`,
        'Idempotency-Key': `checkout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      },
      body: JSON.stringify(checkoutData)
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Yoco checkout creation failed:', errorData)
      return NextResponse.json({ 
        error: 'Failed to create checkout',
        details: errorData 
      }, { status: response.status })
    }

    const checkoutResult = await response.json()

    return NextResponse.json({
      success: true,
      checkout: checkoutResult
    })

  } catch (error) {
    console.error('Error creating Yoco checkout:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
} 