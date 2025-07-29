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

    // Get abandoned carts that need first reminder (1 hour after abandonment)
    const { data: firstReminders, error: firstError } = await supabase
      .from('abandoned_carts')
      .select('*')
      .eq('is_recovered', false)
      .gte('abandoned_at', oneHourAgo.toISOString())
      .lt('abandoned_at', new Date(oneHourAgo.getTime() + 5 * 60 * 1000).toISOString()) // Within 5 minute window
      .is('first_reminder_sent', null)

    if (firstError) {
      console.error('Error fetching first abandoned cart reminders:', firstError)
      return NextResponse.json({ error: 'Failed to fetch first reminders' }, { status: 500 })
    }

    // Get abandoned carts that need second reminder (2 hours after abandonment)
    const { data: secondReminders, error: secondError } = await supabase
      .from('abandoned_carts')
      .select('*')
      .eq('is_recovered', false)
      .gte('abandoned_at', twoHoursAgo.toISOString())
      .lt('abandoned_at', new Date(twoHoursAgo.getTime() + 5 * 60 * 1000).toISOString()) // Within 5 minute window
      .eq('first_reminder_sent', true)
      .is('second_reminder_sent', null)

    if (secondError) {
      console.error('Error fetching second abandoned cart reminders:', secondError)
      return NextResponse.json({ error: 'Failed to fetch second reminders' }, { status: 500 })
    }

    let emailsSent = 0
    let errors = []

    // Send first reminders for abandoned carts
    for (const cart of firstReminders || []) {
      try {
        if (cart.email) {
          // Generate recovery URL
          const recoveryUrl = `${process.env.NEXT_PUBLIC_YOCO_BASE_URL || 'http://localhost:3000'}/cart?session=${cart.session_id}`

          await EmailService.sendAbandonedCartEmail({
            customerEmail: cart.email,
            cartItems: Array.isArray(cart.cart_data) ? cart.cart_data.map((item: any) => ({
              name: item.product_name || item.name || 'Lumeye Under Eye Serum',
              quantity: item.quantity || 1,
              price: item.unit_price || item.price || 0,
              image: item.product_image || item.image
            })) : [],
            totalValue: cart.total_value || 0,
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

          emailsSent++
          console.log(`Sent first abandoned cart reminder to ${cart.email}`)
        }
      } catch (error) {
        console.error(`Error sending first abandoned cart reminder to ${cart.email}:`, error)
        errors.push(`First reminder to ${cart.email}: ${error}`)
      }
    }

    // Send second reminders for abandoned carts
    for (const cart of secondReminders || []) {
      try {
        if (cart.email) {
          // Generate recovery URL
          const recoveryUrl = `${process.env.NEXT_PUBLIC_YOCO_BASE_URL || 'http://localhost:3000'}/cart?session=${cart.session_id}`

          await EmailService.sendAbandonedCartEmail({
            customerEmail: cart.email,
            cartItems: Array.isArray(cart.cart_data) ? cart.cart_data.map((item: any) => ({
              name: item.product_name || item.name || 'Lumeye Under Eye Serum',
              quantity: item.quantity || 1,
              price: item.unit_price || item.price || 0,
              image: item.product_image || item.image
            })) : [],
            totalValue: cart.total_value || 0,
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

          emailsSent++
          console.log(`Sent second abandoned cart reminder to ${cart.email}`)
        }
      } catch (error) {
        console.error(`Error sending second abandoned cart reminder to ${cart.email}:`, error)
        errors.push(`Second reminder to ${cart.email}: ${error}`)
      }
    }

    return NextResponse.json({
      success: true,
      emailsSent,
      firstRemindersSent: firstReminders?.length || 0,
      secondRemindersSent: secondReminders?.length || 0,
      errors: errors.length > 0 ? errors : undefined,
      timestamp: now.toISOString()
    })

  } catch (error) {
    console.error('Abandoned cart reminders cron Error:', error)
    return NextResponse.json(
      { error: 'Failed to process abandoned cart reminders' },
      { status: 500 }
    )
  }
} 