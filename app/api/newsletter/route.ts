import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseService } from '@/lib/database'
import { EmailService } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email, source } = await request.json()

    console.log('Newsletter subscription attempt:', { email, source })

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Use service role client to bypass RLS
    const client = supabaseService || supabase
    
    // First, try to find existing subscription
    const { data: existing, error: checkError } = await client
      .from('newsletter_subscriptions')
      .select('id, is_active')
      .eq('email', email)
      .maybeSingle()

    console.log('Existing subscription check:', { existing, checkError })

    if (checkError) {
      console.error('Error checking existing subscription:', checkError)
      return NextResponse.json({ error: 'Failed to check subscription status' }, { status: 500 })
    }

    let isNewSubscription = true

    if (existing) {
      if (existing.is_active) {
        return NextResponse.json({ error: 'Email already subscribed' }, { status: 400 })
      } else {
        // Reactivate existing subscription
        console.log('Reactivating existing subscription for:', email)
        const { error: updateError } = await supabase
          .from('newsletter_subscriptions')
          .update({ 
            is_active: true, 
            unsubscribed_at: null 
          })
          .eq('id', existing.id)

        if (updateError) {
          console.error('Error reactivating subscription:', updateError)
          return NextResponse.json({ error: 'Failed to reactivate subscription' }, { status: 500 })
        }

        isNewSubscription = false
      }
    } else {
      // Create new subscription
      console.log('Creating new subscription for:', email)
      const { error: insertError } = await supabase
        .from('newsletter_subscriptions')
        .insert({
          email,
          source,
          is_active: true
        })

      if (insertError) {
        console.error('Error creating newsletter subscription:', insertError)
        
        // If it's a duplicate key error, try to find and reactivate
        if (insertError.code === '23505') {
          console.log('Duplicate key error, attempting to find and reactivate...')
          const { data: duplicateCheck } = await supabase
            .from('newsletter_subscriptions')
            .select('id, is_active')
            .eq('email', email)
            .maybeSingle()
          
          if (duplicateCheck) {
            if (duplicateCheck.is_active) {
              return NextResponse.json({ error: 'Email already subscribed' }, { status: 400 })
            } else {
              const { error: reactivateError } = await supabase
                .from('newsletter_subscriptions')
                .update({ 
                  is_active: true, 
                  unsubscribed_at: null 
                })
                .eq('id', duplicateCheck.id)
              
              if (reactivateError) {
                console.error('Error reactivating duplicate subscription:', reactivateError)
                return NextResponse.json({ error: 'Failed to reactivate subscription' }, { status: 500 })
              }
              
              isNewSubscription = false
            }
          } else {
            return NextResponse.json({ error: 'Email already subscribed' }, { status: 400 })
          }
        } else {
          return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
        }
      }
    }

    // Send welcome email
    const emailResult = await EmailService.sendNewsletterWelcome({ email, source })
    
    if (!emailResult.success) {
      console.error('Failed to send newsletter welcome email:', emailResult.error)
      // Still return success for subscription, but log the email failure
      return NextResponse.json({ 
        success: true, 
        message: isNewSubscription ? 'Subscribed successfully, but welcome email failed to send' : 'Reactivated successfully, but welcome email failed to send'
      })
    }

    return NextResponse.json({ 
      success: true, 
      message: isNewSubscription ? 'Successfully subscribed!' : 'Successfully reactivated!'
    })

  } catch (error) {
    console.error('Error in newsletter POST API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 