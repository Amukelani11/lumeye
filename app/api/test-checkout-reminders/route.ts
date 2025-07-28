import { NextResponse } from "next/server"
import { supabase } from "@/lib/database"
import { EmailService } from "@/lib/email"

export async function POST() {
  try {
    const now = new Date()
    
    // Get recent checkout abandonments for testing (last 24 hours)
    const { data: abandonments, error } = await supabase
      .from('checkout_abandonments')
      .select('*')
      .eq('status', 'checkout_started')
      .gte('checkout_started_at', new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString())
      .order('checkout_started_at', { ascending: false })
      .limit(5)

    if (error) {
      console.error('Error fetching test abandonments:', error)
      return NextResponse.json({ error: 'Failed to fetch abandonments' }, { status: 500 })
    }

    let emailsSent = 0
    let errors = []

    // Send test reminders to recent abandonments
    for (const abandonment of abandonments || []) {
      try {
        if (abandonment.email) {
          // Determine reminder type based on time elapsed
          const timeElapsed = now.getTime() - new Date(abandonment.checkout_started_at).getTime()
          const hoursElapsed = timeElapsed / (1000 * 60 * 60)
          
          let reminderType: 'first' | 'second' = 'first'
          if (hoursElapsed >= 2 && !abandonment.second_reminder_sent) {
            reminderType = 'second'
          } else if (hoursElapsed >= 1 && !abandonment.first_reminder_sent) {
            reminderType = 'first'
          } else {
            continue // Skip if already sent or too early
          }

          await EmailService.sendCheckoutAbandonmentReminder({
            email: abandonment.email,
            cartValue: abandonment.cart_value,
            items: abandonment.items || [],
            reminderType
          })

          // Mark reminder as sent
          if (reminderType === 'first') {
            await supabase
              .from('checkout_abandonments')
              .update({ 
                first_reminder_sent: true,
                first_reminder_sent_at: now.toISOString()
              })
              .eq('id', abandonment.id)
          } else {
            await supabase
              .from('checkout_abandonments')
              .update({ 
                second_reminder_sent: true,
                second_reminder_sent_at: now.toISOString()
              })
              .eq('id', abandonment.id)
          }

          emailsSent++
          console.log(`Sent ${reminderType} reminder to ${abandonment.email}`)
        }
      } catch (error) {
        console.error(`Error sending test reminder to ${abandonment.email}:`, error)
        errors.push(`Test reminder to ${abandonment.email}: ${error}`)
      }
    }

    return NextResponse.json({
      success: true,
      emailsSent,
      totalAbandonments: abandonments?.length || 0,
      errors: errors.length > 0 ? errors : undefined,
      timestamp: now.toISOString()
    })

  } catch (error) {
    console.error('Test checkout reminders Error:', error)
    return NextResponse.json(
      { error: 'Failed to process test checkout reminders' },
      { status: 500 }
    )
  }
} 