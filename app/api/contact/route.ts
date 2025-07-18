import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'
import { EmailService } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await request.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Name, email, subject, and message are required' }, { status: 400 })
    }

    // Save to database
    const { error } = await supabase
      .from('contact_inquiries')
      .insert({
        name,
        email,
        phone,
        subject,
        message,
        status: 'open'
      })

    if (error) {
      console.error('Error creating contact inquiry:', error)
      return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 })
    }

    // Send notification email to admin
    await EmailService.sendContactInquiryNotification({
      name,
      email,
      phone,
      subject,
      message
    })

    // Send confirmation email to customer
    await EmailService.sendContactInquiryConfirmation({
      name,
      email,
      phone,
      subject,
      message
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in contact POST API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 