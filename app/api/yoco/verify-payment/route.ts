import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { checkoutId } = await request.json()

    if (!checkoutId) {
      return NextResponse.json({ error: 'Checkout ID is required' }, { status: 400 })
    }

    const secretKey = process.env.YOCO_SECRET_KEY
    if (!secretKey) {
      console.error('YOCO_SECRET_KEY is not set in environment variables')
      return NextResponse.json({ 
        error: 'Payment system configuration error' 
      }, { status: 500 })
    }

    // Verify checkout status with Yoco API
    const response = await fetch(`https://payments.yoco.com/api/checkouts/${checkoutId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${secretKey}`
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Yoco checkout verification failed:', errorData)
      return NextResponse.json({ 
        error: 'Failed to verify payment',
        details: errorData 
      }, { status: response.status })
    }

    const checkoutData = await response.json()
    console.log('Yoco checkout data:', checkoutData)
    
    // Check if payment was successful
    // Yoco checkout statuses: 'pending', 'paid', 'cancelled', 'expired', 'failed'
    const isPaid = checkoutData.status === 'paid' || checkoutData.status === 'completed'
    const paymentId = checkoutData.payment?.id || checkoutData.id || checkoutId

    return NextResponse.json({
      success: true,
      isPaid,
      checkout: checkoutData,
      paymentId: paymentId
    })

  } catch (error) {
    console.error('Error verifying Yoco payment:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}

