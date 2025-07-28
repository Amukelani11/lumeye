import { NextResponse } from "next/server"
import { supabase } from "@/lib/database"
import { EmailService } from "@/lib/email"

export async function POST() {
  try {

    const now = new Date()
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000)

    // Get checkout abandonments that need first reminder (1 hour after checkout start)
    const { data: firstReminders, error: firstError } = await supabase
      .from('checkout_abandonments')
      .select('*')
      .eq('status', 'checkout_started')
      .gte('checkout_started_at', oneHourAgo.toISOString())
      .lt('checkout_started_at', new Date(oneHourAgo.getTime() + 5 * 60 * 1000).toISOString()) // Within 5 minute window
      .is('first_reminder_sent', null)

    if (firstError) {
      console.error('Error fetching first reminders:', firstError)
      return NextResponse.json({ error: 'Failed to fetch first reminders' }, { status: 500 })
    }

    // Get checkout abandonments that need second reminder (2 hours after checkout start)
    const { data: secondReminders, error: secondError } = await supabase
      .from('checkout_abandonments')
      .select('*')
      .eq('status', 'checkout_started')
      .gte('checkout_started_at', twoHoursAgo.toISOString())
      .lt('checkout_started_at', new Date(twoHoursAgo.getTime() + 5 * 60 * 1000).toISOString()) // Within 5 minute window
      .eq('first_reminder_sent', true)
      .is('second_reminder_sent', null)

    if (secondError) {
      console.error('Error fetching second reminders:', secondError)
      return NextResponse.json({ error: 'Failed to fetch second reminders' }, { status: 500 })
    }

    let emailsSent = 0
    let errors = []

    // Send first reminders
    for (const abandonment of firstReminders || []) {
      try {
        if (abandonment.email) {
          await EmailService.sendCheckoutAbandonmentReminder({
            email: abandonment.email,
            cartValue: abandonment.cart_value,
            items: abandonment.items || [],
            reminderType: 'first'
          })

          // Mark first reminder as sent
          await supabase
            .from('checkout_abandonments')
            .update({ 
              first_reminder_sent: true,
              first_reminder_sent_at: now.toISOString()
            })
            .eq('id', abandonment.id)

          emailsSent++
        }
      } catch (error) {
        console.error(`Error sending first reminder to ${abandonment.email}:`, error)
        errors.push(`First reminder to ${abandonment.email}: ${error}`)
      }
    }

    // Send second reminders
    for (const abandonment of secondReminders || []) {
      try {
        if (abandonment.email) {
          await EmailService.sendCheckoutAbandonmentReminder({
            email: abandonment.email,
            cartValue: abandonment.cart_value,
            items: abandonment.items || [],
            reminderType: 'second'
          })

          // Mark second reminder as sent
          await supabase
            .from('checkout_abandonments')
            .update({ 
              second_reminder_sent: true,
              second_reminder_sent_at: now.toISOString()
            })
            .eq('id', abandonment.id)

          emailsSent++
        }
      } catch (error) {
        console.error(`Error sending second reminder to ${abandonment.email}:`, error)
        errors.push(`Second reminder to ${abandonment.email}: ${error}`)
      }
    }

    return NextResponse.json({
      success: true,
      emailsSent,
      firstRemindersSent: firstReminders?.length || 0,
      secondRemindersSent: secondReminders?.length || 0,
      errors: errors.length > 0 ? errors : undefined
    })

  } catch (error) {
    console.error('Checkout reminders API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process checkout reminders' },
      { status: 500 }
    )
  }
} 