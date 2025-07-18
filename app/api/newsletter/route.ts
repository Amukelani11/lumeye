import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'
import { EmailService } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email, source } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Check if already subscribed
    const { data: existing } = await supabase
      .from('newsletter_subscriptions')
      .select('id, is_active')
      .eq('email', email)
      .single()

    if (existing) {
      if (existing.is_active) {
        return NextResponse.json({ error: 'Email already subscribed' }, { status: 400 })
      } else {
        // Reactivate subscription
        const { error } = await supabase
          .from('newsletter_subscriptions')
          .update({ 
            is_active: true, 
            unsubscribed_at: null 
          })
          .eq('id', existing.id)

        if (error) {
          console.error('Error reactivating subscription:', error)
          return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
        }

        // Send welcome back email
        await EmailService.sendNewsletterWelcome({ email, source })

        return NextResponse.json({ success: true })
      }
    }

    // Create new subscription
    const { error } = await supabase
      .from('newsletter_subscriptions')
      .insert({
        email,
        source,
        is_active: true
      })

    if (error) {
      console.error('Error creating newsletter subscription:', error)
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
    }

    // Send welcome email
    await EmailService.sendNewsletterWelcome({ email, source })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in newsletter POST API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 