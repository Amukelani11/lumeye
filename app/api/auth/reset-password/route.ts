import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'
import { EmailService } from '@/lib/email'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Check if user exists
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', email)
      .single()

    if (userError || !user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json({ success: true, message: 'If an account with this email exists, you will receive a password reset link.' })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    // Store reset token in database
    const { error: tokenError } = await supabase
      .from('password_reset_tokens')
      .upsert({
        user_id: user.id,
        token: resetToken,
        expires_at: resetTokenExpiry.toISOString()
      })

    if (tokenError) {
      console.error('Error storing reset token:', tokenError)
      return NextResponse.json({ error: 'Failed to process password reset request' }, { status: 500 })
    }

    // Generate reset URL
    const baseUrl = process.env.NEXT_PUBLIC_YOCO_BASE_URL || 'http://localhost:3000'
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`

    // Send password reset email
    try {
      await EmailService.sendPasswordReset({
        email: user.email,
        resetToken,
        resetUrl
      })
    } catch (emailError) {
      console.error('Error sending password reset email:', emailError)
      return NextResponse.json({ error: 'Failed to send password reset email' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'If an account with this email exists, you will receive a password reset link.' 
    })
  } catch (error) {
    console.error('Error in password reset API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 