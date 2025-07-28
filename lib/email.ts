import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface EmailData {
  to: string
  subject: string
  html: string
  from?: string
}

export interface OrderConfirmationData {
  orderNumber: string
  customerName: string
  customerEmail: string
  orderDate: string
  totalAmount: number
  trackingNumber: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  shippingAddress: {
    firstName: string
    lastName: string
    address: string
    city: string
    postalCode: string
    country: string
  }
}

export interface ContactInquiryData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface NewsletterSubscriptionData {
  email: string
  source?: string
}

export interface PasswordResetData {
  email: string
  resetToken: string
  resetUrl: string
}

export interface WelcomeEmailData {
  email: string
  name: string
}

export interface ShippingNotificationData {
  orderNumber: string
  customerName: string
  customerEmail: string
  trackingNumber: string
  trackingStatus: string
  estimatedDelivery: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  shippingAddress: {
    firstName: string
    lastName: string
    address: string
    city: string
    postalCode: string
    country: string
  }
}

export interface AbandonedCartData {
  customerEmail: string
  customerName?: string
  cartItems: Array<{
    name: string
    quantity: number
    price: number
    image?: string
  }>
  totalValue: number
  recoveryUrl: string
}

export interface CheckoutAbandonmentData {
  customerEmail: string
  customerName?: string
  checkoutItems: Array<{
    name: string
    quantity: number
    price: number
    image?: string
  }>
  totalValue: number
  recoveryUrl: string
}

export interface CheckoutAbandonmentReminderData {
  email: string
  cartValue: number
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  reminderType: 'first' | 'second'
}

export interface AdminSaleNotificationData {
  orderNumber: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  orderDate: string
  totalAmount: number
  paymentMethod: string
  paymentId: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  shippingAddress: {
    firstName: string
    lastName: string
    address: string
    city: string
    postalCode: string
    country: string
  }
  adminEmail: string
}

export class EmailService {
  private static fromEmail = process.env.RESEND_FROM_EMAIL || 'hello@lumeye.co.za'
  private static fromName = 'Lumeye'

  static async sendEmail(data: EmailData) {
    try {
      // Check if Resend API key is configured
      if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY is not configured')
        return { 
          success: false, 
          error: 'Email service not configured. Please set RESEND_API_KEY environment variable.' 
        }
      }

      const result = await resend.emails.send({
        from: data.from || `${this.fromName} <${this.fromEmail}>`,
        to: data.to,
        subject: data.subject,
        html: data.html,
      })
      
      console.log('Email sent successfully:', { to: data.to, subject: data.subject })
      return { success: true, data: result }
    } catch (error) {
      console.error('Email sending failed:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  static async sendOrderConfirmation(data: OrderConfirmationData) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation - Lumeye</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ec4899, #be185d); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .tracking-info { background: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0284c7; }
          .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .total { font-weight: bold; font-size: 18px; margin-top: 20px; padding-top: 20px; border-top: 2px solid #ec4899; }
          .button { display: inline-block; background: #ec4899; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Order Confirmed!</h1>
            <p>Thank you for your purchase, ${data.customerName}!</p>
          </div>
          
          <div class="content">
            <div class="tracking-info">
              <h3>📦 Your Tracking Information</h3>
              <p><strong>Tracking Number:</strong> ${data.trackingNumber}</p>
              <p><strong>Order Number:</strong> ${data.orderNumber}</p>
              <p>You can track your order using the tracking number above. We'll send you updates as your order progresses!</p>
            </div>

            <div class="order-details">
              <h3>📋 Order Details</h3>
              <p><strong>Order Date:</strong> ${data.orderDate}</p>
              <p><strong>Order Number:</strong> ${data.orderNumber}</p>
              
              <h4>Items Ordered:</h4>
              ${data.items.map(item => `
                <div class="item">
                  <span>${item.name} (Qty: ${item.quantity})</span>
                  <span>R${item.price.toFixed(2)}</span>
                </div>
              `).join('')}
              
              <div class="total">
                <div class="item">
                  <span>Total Amount:</span>
                  <span>R${data.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div class="order-details">
              <h3>🚚 Shipping Address</h3>
              <p>
                ${data.shippingAddress.firstName} ${data.shippingAddress.lastName}<br>
                ${data.shippingAddress.address}<br>
                ${data.shippingAddress.city}, ${data.shippingAddress.postalCode}<br>
                ${data.shippingAddress.country}
              </p>
            </div>

            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_YOCO_BASE_URL || 'http://localhost:3000'}" class="button">Continue Shopping</a>
            </div>

            <div class="footer">
              <p>If you have any questions about your order, please contact us at hello@lumeye.co.za</p>
              <p>Thank you for choosing Lumeye! 💖</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    return this.sendEmail({
      to: data.customerEmail,
      subject: `Order Confirmed - ${data.orderNumber} | Lumeye`,
      html
    })
  }

  static async sendContactInquiryNotification(data: ContactInquiryData) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Inquiry - Lumeye</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #ec4899; color: white; padding: 20px; text-align: center; border-radius: 8px; }
            .content { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .field { margin: 15px 0; }
            .label { font-weight: bold; color: #374151; }
            .message { background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #ec4899; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Inquiry</h1>
            </div>
            
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div>${data.name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email:</div>
                <div>${data.email}</div>
              </div>
              
              ${data.phone ? `
                <div class="field">
                  <div class="label">Phone:</div>
                  <div>${data.phone}</div>
                </div>
              ` : ''}
              
              <div class="field">
                <div class="label">Subject:</div>
                <div>${data.subject}</div>
              </div>
              
              <div class="field">
                <div class="label">Message:</div>
                <div class="message">${data.message}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    return this.sendEmail({
      to: process.env.RESEND_ADMIN_EMAIL || 'hello@lumeye.co.za',
      subject: `New Contact Inquiry: ${data.subject}`,
      html
    })
  }

  static async sendContactInquiryConfirmation(data: ContactInquiryData) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank you for contacting Lumeye</title>
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
              <h1>Thank you for contacting us!</h1>
            </div>
            
            <div class="content">
              <p>Hi ${data.name},</p>
              
              <p>We've received your message and will get back to you within 24 hours.</p>
              
              <p><strong>Your inquiry details:</strong></p>
              <ul>
                <li><strong>Subject:</strong> ${data.subject}</li>
                <li><strong>Message:</strong> ${data.message}</li>
              </ul>
              
              <p>In the meantime, you might find answers to common questions in our <a href="https://lumeye.co.za/faq">FAQ section</a>.</p>
              
              <p>Best regards,<br>The Lumeye Team</p>
            </div>
            
            <div class="footer">
              <p>&copy; 2024 Lumeye. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `

    return this.sendEmail({
      to: data.email,
      subject: 'Thank you for contacting Lumeye',
      html
    })
  }

  static async sendNewsletterWelcome(data: NewsletterSubscriptionData) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Lumeye Newsletter</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ec4899, #be185d); color: white; padding: 30px; text-align: center; border-radius: 10px; }
            .content { background: #f9fafb; padding: 30px; border-radius: 10px; margin: 20px 0; }
            .button { display: inline-block; background: #ec4899; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Lumeye! ✨</h1>
              <p>You're now subscribed to our newsletter</p>
            </div>
            
            <div class="content">
              <p>Thank you for subscribing to our newsletter! You'll be the first to know about:</p>
              
              <ul>
                <li>🎁 Exclusive offers and discounts</li>
                <li>💡 Skincare tips and advice</li>
                <li>🌟 New product launches</li>
                <li>📱 Behind-the-scenes content</li>
              </ul>
              
              <a href="https://lumeye.co.za" class="button">Shop Now</a>
              
              <p>Transform tired eyes in just 60 seconds with our premium under-eye serum!</p>
            </div>
            
            <div class="footer">
              <p>&copy; 2024 Lumeye. All rights reserved.</p>
              <p><a href="mailto:hello@lumeye.co.za">Unsubscribe</a> | <a href="https://lumeye.co.za/privacy">Privacy Policy</a></p>
            </div>
          </div>
        </body>
      </html>
    `

    return this.sendEmail({
      to: data.email,
      subject: 'Welcome to Lumeye Newsletter! ✨',
      html
    })
  }

  static async sendPasswordReset(data: PasswordResetData) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password - Lumeye</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ec4899, #be185d); color: white; padding: 30px; text-align: center; border-radius: 10px; }
            .content { background: #f9fafb; padding: 30px; border-radius: 10px; margin: 20px 0; }
            .button { display: inline-block; background: #ec4899; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Reset Your Password</h1>
            </div>
            
            <div class="content">
              <p>You requested to reset your password for your Lumeye account.</p>
              
              <p>Click the button below to reset your password:</p>
              
              <a href="${data.resetUrl}" class="button">Reset Password</a>
              
              <p>This link will expire in 1 hour for security reasons.</p>
              
              <p>If you didn't request this password reset, please ignore this email.</p>
            </div>
            
            <div class="footer">
              <p>&copy; 2024 Lumeye. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `

    return this.sendEmail({
      to: data.email,
      subject: 'Reset Your Lumeye Password',
      html
    })
  }

  static async sendWelcomeEmail(data: WelcomeEmailData) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Lumeye!</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ec4899, #be185d); color: white; padding: 30px; text-align: center; border-radius: 10px; }
            .content { background: #f9fafb; padding: 30px; border-radius: 10px; margin: 20px 0; }
            .button { display: inline-block; background: #ec4899; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Lumeye! 🎉</h1>
              <p>Your account has been created successfully</p>
            </div>
            
            <div class="content">
              <p>Hi ${data.name},</p>
              
              <p>Welcome to Lumeye! We're excited to have you as part of our community.</p>
              
              <p>With your account, you can:</p>
              <ul>
                <li>📦 Track your orders</li>
                <li>💳 Save payment methods</li>
                <li>📧 Get exclusive offers</li>
                <li>⭐ Write product reviews</li>
              </ul>
              
              <a href="https://lumeye.co.za/product" class="button">Shop Now</a>
              
              <p>Transform tired eyes in just 60 seconds with our premium under-eye serum!</p>
            </div>
            
            <div class="footer">
              <p>&copy; 2024 Lumeye. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `

    return this.sendEmail({
      to: data.email,
      subject: 'Welcome to Lumeye! 🎉',
      html
    })
  }

  static async sendShippingNotification(data: ShippingNotificationData) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Order Has Been Shipped! - Lumeye</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ec4899, #be185d); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .tracking-info { background: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0284c7; }
          .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .button { display: inline-block; background: #ec4899; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚚 Your Order Has Been Shipped!</h1>
            <p>Great news, ${data.customerName}!</p>
          </div>
          
          <div class="content">
            <div class="tracking-info">
              <h3>📦 Tracking Information</h3>
              <p><strong>Order Number:</strong> ${data.orderNumber}</p>
              <p><strong>Tracking Number:</strong> ${data.trackingNumber}</p>
              <p><strong>Status:</strong> ${data.trackingStatus}</p>
              <p><strong>Estimated Delivery:</strong> ${data.estimatedDelivery}</p>
              <p>You can track your order in real-time using the tracking number above!</p>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>📋 Order Summary</h3>
              ${data.items.map(item => `
                <div class="item">
                  <span>${item.name} (Qty: ${item.quantity})</span>
                  <span>R${item.price.toFixed(2)}</span>
                </div>
              `).join('')}
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>🚚 Shipping Address</h3>
              <p>
                ${data.shippingAddress.firstName} ${data.shippingAddress.lastName}<br>
                ${data.shippingAddress.address}<br>
                ${data.shippingAddress.city}, ${data.shippingAddress.postalCode}<br>
                ${data.shippingAddress.country}
              </p>
            </div>

            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_YOCO_BASE_URL || 'http://localhost:3000'}/track-order" class="button">Track Your Order</a>
            </div>

            <div class="footer">
              <p>If you have any questions about your shipment, please contact us at hello@lumeye.co.za</p>
              <p>Thank you for choosing Lumeye! 💖</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    return this.sendEmail({
      to: data.customerEmail,
      subject: `Your Order Has Been Shipped! - ${data.orderNumber} | Lumeye`,
      html
    })
  }

  static async sendAbandonedCartEmail(data: AbandonedCartData) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Don't Forget Your Cart! - Lumeye</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ec4899, #be185d); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .cart-items { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .item { display: flex; align-items: center; padding: 10px 0; border-bottom: 1px solid #eee; }
          .item:last-child { border-bottom: none; }
          .item-image { width: 60px; height: 60px; background: #f3f4f6; border-radius: 8px; margin-right: 15px; }
          .item-details { flex: 1; }
          .item-price { font-weight: bold; color: #ec4899; }
          .total { font-weight: bold; font-size: 18px; margin-top: 20px; padding-top: 20px; border-top: 2px solid #ec4899; text-align: right; }
          .button { display: inline-block; background: #ec4899; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🛒 Don't Forget Your Cart!</h1>
            <p>Hi ${data.customerName || 'there'}!</p>
          </div>
          
          <div class="content">
            <p>We noticed you left some amazing products in your cart! Don't let them get away - complete your purchase and start your journey to brighter, more beautiful eyes.</p>
            
            <div class="cart-items">
              <h3>Your Cart Items:</h3>
              ${data.cartItems.map(item => `
                <div class="item">
                  <div class="item-image"></div>
                  <div class="item-details">
                    <div><strong>${item.name}</strong></div>
                    <div>Quantity: ${item.quantity}</div>
                  </div>
                  <div class="item-price">R${item.price.toFixed(2)}</div>
                </div>
              `).join('')}
              <div class="total">
                <strong>Total: R${data.totalValue.toFixed(2)}</strong>
              </div>
            </div>

            <div style="text-align: center;">
              <a href="${data.recoveryUrl}" class="button">Complete Your Purchase</a>
            </div>

            <p style="text-align: center; color: #666; font-size: 14px;">
              This link will expire in 24 hours. Don't miss out on these amazing products!
            </p>
          </div>

          <div class="footer">
            <p>If you have any questions, please contact us at hello@lumeye.co.za</p>
            <p>Thank you for choosing Lumeye! 💖</p>
          </div>
        </div>
      </body>
      </html>
    `

    return this.sendEmail({
      to: data.customerEmail,
      subject: '🛒 Don\'t Forget Your Cart! - Complete Your Purchase',
      html
    })
  }

  static async sendCheckoutAbandonmentEmail(data: CheckoutAbandonmentData) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Complete Your Checkout - Lumeye</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ec4899, #be185d); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .checkout-items { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .item { display: flex; align-items: center; padding: 10px 0; border-bottom: 1px solid #eee; }
          .item:last-child { border-bottom: none; }
          .item-image { width: 60px; height: 60px; background: #f3f4f6; border-radius: 8px; margin-right: 15px; }
          .item-details { flex: 1; }
          .item-price { font-weight: bold; color: #ec4899; }
          .total { font-weight: bold; font-size: 18px; margin-top: 20px; padding-top: 20px; border-top: 2px solid #ec4899; text-align: right; }
          .button { display: inline-block; background: #ec4899; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💳 Complete Your Checkout!</h1>
            <p>Hi ${data.customerName || 'there'}!</p>
          </div>
          
          <div class="content">
            <p>You're so close to getting your amazing Lumeye products! We noticed you started the checkout process but didn't complete it. Don't let these products slip away!</p>
            
            <div class="checkout-items">
              <h3>Your Order Summary:</h3>
              ${data.checkoutItems.map(item => `
                <div class="item">
                  <div class="item-image"></div>
                  <div class="item-details">
                    <div><strong>${item.name}</strong></div>
                    <div>Quantity: ${item.quantity}</div>
                  </div>
                  <div class="item-price">R${item.price.toFixed(2)}</div>
                </div>
              `).join('')}
              <div class="total">
                <strong>Total: R${data.totalValue.toFixed(2)}</strong>
              </div>
            </div>

            <div style="text-align: center;">
              <a href="${data.recoveryUrl}" class="button">Complete Your Order</a>
            </div>

            <p style="text-align: center; color: #666; font-size: 14px;">
              Secure checkout with multiple payment options available. This link will expire in 24 hours.
            </p>
          </div>

          <div class="footer">
            <p>If you have any questions, please contact us at hello@lumeye.co.za</p>
            <p>Thank you for choosing Lumeye! 💖</p>
          </div>
        </div>
      </body>
      </html>
    `

    return this.sendEmail({
      to: data.customerEmail,
      subject: '💳 Complete Your Checkout - Your Order Awaits!',
      html
    })
  }

  static async sendAdminSaleNotification(data: AdminSaleNotificationData) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Sale Notification - Lumeye</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 700px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .sale-alert { background: #fef3c7; border: 2px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
          .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .customer-info { background: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0284c7; }
          .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .total { font-weight: bold; font-size: 20px; margin-top: 20px; padding-top: 20px; border-top: 3px solid #10b981; color: #059669; }
          .button { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .highlight { background: #fef3c7; padding: 10px; border-radius: 5px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💰 New Sale Alert!</h1>
            <p>A new order has been placed on Lumeye</p>
          </div>
          
          <div class="content">
            <div class="sale-alert">
              <h2>🎉 Order #${data.orderNumber}</h2>
              <p><strong>Total Amount: R${data.totalAmount.toFixed(2)}</strong></p>
              <p>Order Date: ${data.orderDate}</p>
            </div>

            <div class="customer-info">
              <h3>👤 Customer Information</h3>
              <p><strong>Name:</strong> ${data.customerName}</p>
              <p><strong>Email:</strong> ${data.customerEmail}</p>
              ${data.customerPhone ? `<p><strong>Phone:</strong> ${data.customerPhone}</p>` : ''}
            </div>

            <div class="order-details">
              <h3>📦 Order Items</h3>
              ${data.items.map(item => `
                <div class="item">
                  <span>${item.name} (Qty: ${item.quantity})</span>
                  <span>R${item.price.toFixed(2)}</span>
                </div>
              `).join('')}
              
              <div class="total">
                <div class="item">
                  <span>Total Amount:</span>
                  <span>R${data.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div class="order-details">
              <h3>💳 Payment Information</h3>
              <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
              <p><strong>Payment ID:</strong> ${data.paymentId}</p>
              <p><strong>Status:</strong> <span style="color: #10b981; font-weight: bold;">Completed</span></p>
            </div>

            <div class="order-details">
              <h3>🚚 Shipping Address</h3>
              <p>
                ${data.shippingAddress.firstName} ${data.shippingAddress.lastName}<br>
                ${data.shippingAddress.address}<br>
                ${data.shippingAddress.city}, ${data.shippingAddress.postalCode}<br>
                ${data.shippingAddress.country}
              </p>
            </div>

            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_YOCO_BASE_URL || 'http://localhost:3000'}/admin/orders" class="button">View Order in Admin Panel</a>
            </div>

            <div class="highlight">
              <p><strong>Next Steps:</strong></p>
              <ul>
                <li>✅ Process the order in your admin panel</li>
                <li>📦 Prepare the shipment</li>
                <li>🚚 Update tracking information</li>
                <li>📧 Send shipping confirmation to customer</li>
              </ul>
            </div>

            <div class="footer">
              <p>This is an automated notification from your Lumeye e-commerce system.</p>
              <p>Order processed at ${new Date().toLocaleString('en-US', { timeZone: 'Africa/Johannesburg' })}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    return this.sendEmail({
      to: data.adminEmail,
      subject: `💰 New Sale Alert - Order #${data.orderNumber} - R${data.totalAmount.toFixed(2)}`,
      html
    })
  }

  static async sendCheckoutAbandonmentReminder(data: CheckoutAbandonmentReminderData) {
    const isFirstReminder = data.reminderType === 'first'
    const subject = isFirstReminder 
      ? "Don't forget to complete your order! 🛒" 
      : "Your cart is waiting for you! ⏰"
    
    const urgencyText = isFirstReminder 
      ? "We noticed you started checking out but didn't complete your purchase. Your items are still in your cart!"
      : "It's been a while since you started checking out. Your items are still waiting for you!"
    
    const ctaText = isFirstReminder ? "Complete Your Order" : "Finish Your Purchase"
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Complete Your Order</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ec4899, #be185d); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
          .cart-items { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .item:last-child { border-bottom: none; }
          .total { font-weight: bold; font-size: 1.2em; color: #ec4899; }
          .btn { display: inline-block; background: #ec4899; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: bold; font-size: 1.1em; }
          .urgency { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${isFirstReminder ? '🛒' : '⏰'} ${isFirstReminder ? 'Complete Your Order' : 'Your Cart is Waiting!'}</h1>
            <p>Don't miss out on your Lumeye products</p>
          </div>
          <div class="content">
            <div class="urgency">
              <h3>${isFirstReminder ? 'Quick Reminder' : 'Final Reminder'}</h3>
              <p>${urgencyText}</p>
            </div>
            
            <h3>Your Cart Items</h3>
            <div class="cart-items">
              ${data.items.map(item => `
                <div class="item">
                  <span>${item.name} x${item.quantity}</span>
                  <span>R${item.price.toFixed(2)}</span>
                </div>
              `).join('')}
              
              <div class="total">
                <div class="item">
                  <span>Total Value:</span>
                  <span>R${data.cartValue.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/checkout" class="btn">${ctaText}</a>
            </div>
            
            <p style="text-align: center; color: #666; font-size: 0.9em;">
              This link will take you directly to checkout with your items already in your cart.
            </p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            
            <p style="color: #666; font-size: 0.9em;">
              If you have any questions, please don't hesitate to contact us at hello@lumeye.co.za
            </p>
          </div>
        </div>
      </body>
      </html>
    `
    
    return this.sendEmail({
      to: data.email,
      subject,
      html
    })
  }
} 