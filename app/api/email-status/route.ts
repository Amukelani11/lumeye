import { NextResponse } from "next/server"

export async function GET() {
  try {
    const config = {
      resendApiKey: !!process.env.RESEND_API_KEY,
      resendFromEmail: process.env.RESEND_FROM_EMAIL || 'Not set',
      resendAdminEmail: process.env.RESEND_ADMIN_EMAIL || 'Not set',
      baseUrl: process.env.NEXT_PUBLIC_YOCO_BASE_URL || 'Not set',
      nodeEnv: process.env.NODE_ENV || 'Not set',
      timestamp: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      config,
      message: config.resendApiKey 
        ? 'Email service is configured correctly' 
        : 'Email service is not configured. Please set RESEND_API_KEY environment variable.'
    })
  } catch (error) {
    console.error('Error checking email status:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to check email configuration' 
    }, { status: 500 })
  }
} 