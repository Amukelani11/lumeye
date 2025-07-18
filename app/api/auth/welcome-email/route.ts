import { NextRequest, NextResponse } from 'next/server'
import { EmailService } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    if (!email || !name) {
      return NextResponse.json({ error: 'Email and name are required' }, { status: 400 })
    }

    // Send welcome email
    const result = await EmailService.sendWelcomeEmail({
      email,
      name
    })

    if (!result.success) {
      console.error('Error sending welcome email:', result.error)
      return NextResponse.json({ error: 'Failed to send welcome email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in welcome email API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 