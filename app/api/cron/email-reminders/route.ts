import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/database"
import { EmailService } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    // Verify cron secret to ensure this is called by authorized cron service
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const now = new Date()
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000)

    let totalEmailsSent = 0
    let errors = []

    // ===== ABANDONED CART REMINDERS =====
    
    // Get abandoned carts that need first reminder (1 hour after abandonment)
    const { data: abandonedCartFirstReminders, error: abandonedCartFirstError } = await supabase
      .from('abandoned_carts')
      .select('*')
      .eq('status', 'cart_active')
      .gte('last_cart_activity', oneHourAgo.toISOString())
      .lt('last_cart_activity', new Date(oneHourAgo.getTime() + 5 * 60 * 1000).toISOString()) // Within 5 minute window
      .is('first_reminder_sent', null)

    if (abandonedCartFirstError) {
      console.error('Error fetching first abandoned cart reminders:', abandonedCartFirstError)
      errors.push('Failed to fetch first abandoned cart reminders')
    }

    // Get abandoned carts that need second reminder (2 hours after abandonment)
    const { data: abandonedCartSecondReminders, error: abandonedCartSecondError } = await supabase
      .from('abandoned_carts')
      .select('*')
      .eq('status', 'cart_active')
      .gte('last_cart_activity', twoHoursAgo.toISOString())
      .lt('last_cart_activity', new Date(twoHoursAgo.getTime() + 5 * 60 * 1000).toISOString()) // Within 5 minute window
      .eq('first_reminder_sent', true)
      .is('second_reminder_sent', null)

    if (abandonedCartSecondError) {
      console.error('Error fetching second abandoned cart reminders:', abandonedCartSecondError)
      errors.push('Failed to fetch second abandoned cart reminders')
    }

    // Send first reminders for abandoned carts
    for (const cart of abandonedCartFirstReminders || []) {
      try {
        if (cart.email) {
          // Generate recovery URL
          const recoveryUrl = `${process.env.NEXT_PUBLIC_YOCO_BASE_URL || 'http://localhost:3000'}/cart?session=${cart.session_id}`

          await EmailService.sendAbandonedCartEmail({
            customerEmail: cart.email,
            cartItems: Array.isArray(cart.items) ? cart.items.map((item: any) => ({
              name: item.product_name || item.name || 'Lumeye Under Eye Serum',
              quantity: item.quantity || 1,
              price: item.unit_price || item.price || 0,
              image: item.product_image || item.image
            })) : [],
            totalValue: cart.cart_value || 0,
            recoveryUrl: recoveryUrl
          })

          // Mark first reminder as sent
          await supabase
            .from('abandoned_carts')
            .update({ 
              first_reminder_sent: true,
              first_reminder_sent_at: now.toISOString(),
              email_sent_count: (cart.email_sent_count || 0) + 1
            })
            .eq('id', cart.id)

          totalEmailsSent++
          console.log(`Sent first abandoned cart reminder to ${cart.email}`)
        }
      } catch (error) {
        console.error(`Error sending first abandoned cart reminder to ${cart.email}:`, error)
        errors.push(`First abandoned cart reminder to ${cart.email}: ${error}`)
      }
    }

    // Send second reminders for abandoned carts
    for (const cart of abandonedCartSecondReminders || []) {
      try {
        if (cart.email) {
          // Generate recovery URL
          const recoveryUrl = `${process.env.NEXT_PUBLIC_YOCO_BASE_URL || 'http://localhost:3000'}/cart?session=${cart.session_id}`

          await EmailService.sendAbandonedCartEmail({
            customerEmail: cart.email,
            cartItems: Array.isArray(cart.items) ? cart.items.map((item: any) => ({
              name: item.product_name || item.name || 'Lumeye Under Eye Serum',
              quantity: item.quantity || 1,
              price: item.unit_price || item.price || 0,
              image: item.product_image || item.image
            })) : [],
            totalValue: cart.cart_value || 0,
            recoveryUrl: recoveryUrl
          })

          // Mark second reminder as sent
          await supabase
            .from('abandoned_carts')
            .update({ 
              second_reminder_sent: true,
              second_reminder_sent_at: now.toISOString(),
              email_sent_count: (cart.email_sent_count || 0) + 1
            })
            .eq('id', cart.id)

          totalEmailsSent++
          console.log(`Sent second abandoned cart reminder to ${cart.email}`)
        }
      } catch (error) {
        console.error(`Error sending second abandoned cart reminder to ${cart.email}:`, error)
        errors.push(`Second abandoned cart reminder to ${cart.email}: ${error}`)
      }
    }

    // ===== CHECKOUT ABANDONMENT REMINDERS =====
    
    // Get checkout abandonments that need first reminder (1 hour after checkout start)
    const { data: checkoutFirstReminders, error: checkoutFirstError } = await supabase
      .from('checkout_abandonments')
      .select('*')
      .eq('status', 'checkout_started')
      .gte('checkout_started_at', oneHourAgo.toISOString())
      .lt('checkout_started_at', new Date(oneHourAgo.getTime() + 5 * 60 * 1000).toISOString()) // Within 5 minute window
      .is('first_reminder_sent', null)

    if (checkoutFirstError) {
      console.error('Error fetching first checkout reminders:', checkoutFirstError)
      errors.push('Failed to fetch first checkout reminders')
    }

    // Get checkout abandonments that need second reminder (2 hours after checkout start)
    const { data: checkoutSecondReminders, error: checkoutSecondError } = await supabase
      .from('checkout_abandonments')
      .select('*')
      .eq('status', 'checkout_started')
      .gte('checkout_started_at', twoHoursAgo.toISOString())
      .lt('checkout_started_at', new Date(twoHoursAgo.getTime() + 5 * 60 * 1000).toISOString()) // Within 5 minute window
      .eq('first_reminder_sent', true)
      .is('second_reminder_sent', null)

    if (checkoutSecondError) {
      console.error('Error fetching second checkout reminders:', checkoutSecondError)
      errors.push('Failed to fetch second checkout reminders')
    }

    // Send first reminders for checkout abandonments
    for (const abandonment of checkoutFirstReminders || []) {
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

          totalEmailsSent++
          console.log(`Sent first checkout reminder to ${abandonment.email}`)
        }
      } catch (error) {
        console.error(`Error sending first checkout reminder to ${abandonment.email}:`, error)
        errors.push(`First checkout reminder to ${abandonment.email}: ${error}`)
      }
    }

    // Send second reminders for checkout abandonments
    for (const abandonment of checkoutSecondReminders || []) {
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

          totalEmailsSent++
          console.log(`Sent second checkout reminder to ${abandonment.email}`)
        }
      } catch (error) {
        console.error(`Error sending second checkout reminder to ${abandonment.email}:`, error)
        errors.push(`Second checkout reminder to ${abandonment.email}: ${error}`)
      }
    }

    return NextResponse.json({
      success: true,
      totalEmailsSent,
      abandonedCartFirstRemindersSent: abandonedCartFirstReminders?.length || 0,
      abandonedCartSecondRemindersSent: abandonedCartSecondReminders?.length || 0,
      checkoutFirstRemindersSent: checkoutFirstReminders?.length || 0,
      checkoutSecondRemindersSent: checkoutSecondReminders?.length || 0,
      errors: errors.length > 0 ? errors : undefined,
      timestamp: now.toISOString()
    })

  } catch (error) {
    console.error('Email reminders cron Error:', error)
    return NextResponse.json(
      { error: 'Failed to process email reminders' },
      { status: 500 }
    )
  }
} 