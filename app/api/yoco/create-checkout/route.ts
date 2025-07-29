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

    if (!amount || amount < 200) { // Minimum R2.00 in cents
      return NextResponse.json({ 
        error: 'Amount is required and must be at least R2.00 (200 cents)' 
      }, { status: 400 })
    }

    const secretKey = process.env.YOCO_SECRET_KEY
    if (!secretKey) {
      console.error('YOCO_SECRET_KEY is not set in environment variables')
      return NextResponse.json({ 
        error: 'Payment system configuration error' 
      }, { status: 500 })
    }

    const checkoutId = `checkout_${Date.now()}`
    
    // Get the base URL from environment or construct from request
    let baseUrl = process.env.NEXT_PUBLIC_YOCO_BASE_URL
    if (!baseUrl) {
      // Fallback: construct from request headers
      const protocol = request.headers.get('x-forwarded-proto') || 'http'
      const host = request.headers.get('host') || 'localhost:3000'
      baseUrl = `${protocol}://${host}`
    }
    
    // Clean and validate the base URL
    baseUrl = baseUrl.replace(/\/$/, '') // Remove trailing slash
    
    // Ensure the base URL is valid
    try {
      new URL(baseUrl)
    } catch (error) {
      console.error('Invalid base URL:', baseUrl)
      return NextResponse.json({ 
        error: 'Invalid base URL configuration' 
      }, { status: 500 })
    }
    
    // Construct URLs with proper encoding
    const cancelUrlFinal = cancelUrl || `${baseUrl}/checkout?payment_status=cancelled&checkout_id=${encodeURIComponent(checkoutId)}`
    const successUrlFinal = successUrl || `${baseUrl}/order-confirmation?checkout_id=${encodeURIComponent(checkoutId)}`
    
    const checkoutData = {
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      cancelUrl: cancelUrlFinal,
      successUrl: successUrlFinal,
      metadata: {
        ...metadata,
        checkoutId: checkoutId,
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

    console.log('Creating Yoco checkout with data:', {
      amount: checkoutData.amount,
      currency: checkoutData.currency,
      lineItems: checkoutData.lineItems,
      baseUrl: baseUrl,
      cancelUrl: cancelUrlFinal,
      successUrl: successUrlFinal
    })

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