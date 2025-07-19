import { NextRequest, NextResponse } from 'next/server'
import { EmailService } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Test email configuration
    const configCheck = {
      resendApiKey: !!process.env.RESEND_API_KEY,
      fromEmail: process.env.RESEND_FROM_EMAIL || 'hello@lumeye.co.za',
      fromName: 'Lumeye'
    }

    // Send a test email
    const result = await EmailService.sendEmail({
      to: email,
      subject: 'Test Email from Lumeye',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Test Email - Lumeye</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ec4899, #be185d); color: white; padding: 30px; text-align: center; border-radius: 10px; }
            .content { background: #f9fafb; padding: 30px; border-radius: 10px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Test Email from Lumeye</h1>
              <p>If you received this, email is working! ✨</p>
            </div>
            
            <div class="content">
              <p>Hello!</p>
              <p>This is a test email to verify that the email service is working correctly.</p>
              <p>Configuration status:</p>
              <ul>
                <li>Resend API Key: ${configCheck.resendApiKey ? '✅ Configured' : '❌ Missing'}</li>
                <li>From Email: ${configCheck.fromEmail}</li>
                <li>From Name: ${configCheck.fromName}</li>
              </ul>
              <p>If you're seeing this email, everything is working perfectly! 🎉</p>
            </div>
            
            <div class="footer">
              <p>&copy; 2024 Lumeye. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    })

    return NextResponse.json({
      success: result.success,
      config: configCheck,
      error: result.error || null,
      message: result.success ? 'Test email sent successfully!' : 'Failed to send test email'
    })

  } catch (error) {
    console.error('Error in test email API:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 