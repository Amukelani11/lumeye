/**
 * Facebook Conversions API Service
 * Sends server-side events to Facebook for better attribution and tracking
 */

interface PurchaseEventData {
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
  currency: string
  value: number
  items: Array<{
    product_id?: string
    sku?: string
    item_name: string
    quantity: number
    price: number
  }>
  orderId: string
  orderNumber?: string
}

interface FacebookEventData {
  event_name: string
  event_time: number
  event_id?: string
  action_source: string
  user_data?: {
    em?: string[] // email (hashed)
    ph?: string[] // phone (hashed)
    fn?: string[] // first name (hashed)
    ln?: string[] // last name (hashed)
    ct?: string[] // city (hashed)
    st?: string[] // state (hashed)
    zp?: string[] // zip code (hashed)
    country?: string[] // country (hashed)
  }
  custom_data?: {
    currency: string
    value: number
    content_ids?: string[]
    contents?: Array<{
      id?: string
      quantity: number
      item_price: number
    }>
    num_items?: number
    order_id?: string
  }
  test_event_code?: string
}

// Hash function for PII data (SHA-256)
async function hashData(data: string): Promise<string> {
  if (!data) return ''
  const encoder = new TextEncoder()
  const dataBuffer = encoder.encode(data.toLowerCase().trim())
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export class FacebookConversionsAPI {
  private pixelId: string
  private accessToken: string
  private testEventCode: string | null
  private apiVersion: string = 'v21.0'

  constructor() {
    this.pixelId = process.env.FACEBOOK_PIXEL_ID || '1355100322913889'
    this.accessToken = process.env.FACEBOOK_ACCESS_TOKEN || ''
    // Test event code for testing server events
    this.testEventCode = process.env.FACEBOOK_TEST_EVENT_CODE || 'TEST83486'
    
    if (!this.accessToken) {
      console.warn('FACEBOOK_ACCESS_TOKEN not set. Server-side events will not be sent.')
    }
  }

  /**
   * Send Purchase event to Facebook Conversions API
   */
  async sendPurchaseEvent(data: PurchaseEventData): Promise<boolean> {
    if (!this.accessToken) {
      console.log('Facebook Conversions API: Access token not set, skipping event')
      return false
    }

    try {
      // Hash PII data
      const hashedUserData: any = {}
      
      if (data.email) {
        hashedUserData.em = [await hashData(data.email)]
      }
      if (data.phone) {
        hashedUserData.ph = [await hashData(data.phone)]
      }
      if (data.firstName) {
        hashedUserData.fn = [await hashData(data.firstName)]
      }
      if (data.lastName) {
        hashedUserData.ln = [await hashData(data.lastName)]
      }
      if (data.city) {
        hashedUserData.ct = [await hashData(data.city)]
      }
      if (data.zipCode) {
        hashedUserData.zp = [await hashData(data.zipCode)]
      }
      if (data.country) {
        hashedUserData.country = [await hashData(data.country)]
      }

      // Prepare event data
      const eventData: FacebookEventData = {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        event_id: `${data.orderId}_${Date.now()}`, // Unique event ID to prevent duplicates
        action_source: 'website',
        user_data: Object.keys(hashedUserData).length > 0 ? hashedUserData : undefined,
        custom_data: {
          currency: data.currency,
          value: data.value,
          content_ids: data.items.map(item => item.product_id || item.sku || item.item_name),
          contents: data.items.map(item => ({
            id: item.product_id || item.sku,
            quantity: item.quantity,
            item_price: item.price
          })),
          num_items: data.items.reduce((sum, item) => sum + item.quantity, 0),
          order_id: data.orderNumber || data.orderId
        }
      }

      // Prepare request body with test_event_code at root level (Facebook requirement)
      const requestBody: any = {
        data: [eventData],
        access_token: this.accessToken
      }

      // Add test_event_code to request body if test mode is enabled
      // This should be at the root level, not inside event data
      if (this.testEventCode && (process.env.NODE_ENV !== 'production' || process.env.FACEBOOK_USE_TEST_EVENT_CODE === 'true')) {
        requestBody.test_event_code = this.testEventCode
      }

      // Send to Facebook Conversions API
      const response = await fetch(
        `https://graph.facebook.com/${this.apiVersion}/${this.pixelId}/events`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        }
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Facebook Conversions API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        })
        return false
      }

      const result = await response.json()
      console.log('Facebook Conversions API: Purchase event sent successfully', {
        events_received: result.events_received,
        messages: result.messages
      })

      return true
    } catch (error) {
      console.error('Facebook Conversions API: Error sending purchase event:', error)
      return false
    }
  }

  /**
   * Send InitiateCheckout event
   */
  async sendInitiateCheckoutEvent(data: {
    email?: string
    currency: string
    value: number
    items: Array<{
      product_id?: string
      item_name: string
      quantity: number
      price: number
    }>
  }): Promise<boolean> {
    if (!this.accessToken) {
      return false
    }

    try {
      const hashedUserData: any = {}
      if (data.email) {
        hashedUserData.em = [await hashData(data.email)]
      }

      const eventData: FacebookEventData = {
        event_name: 'InitiateCheckout',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        user_data: Object.keys(hashedUserData).length > 0 ? hashedUserData : undefined,
        custom_data: {
          currency: data.currency,
          value: data.value,
          content_ids: data.items.map(item => item.product_id || item.item_name),
          contents: data.items.map(item => ({
            id: item.product_id,
            quantity: item.quantity,
            item_price: item.price
          }))
        }
      }

      // Prepare request body with test_event_code at root level
      const requestBody: any = {
        data: [eventData],
        access_token: this.accessToken
      }

      // Add test_event_code to request body if test mode is enabled
      if (this.testEventCode && (process.env.NODE_ENV !== 'production' || process.env.FACEBOOK_USE_TEST_EVENT_CODE === 'true')) {
        requestBody.test_event_code = this.testEventCode
      }

      const response = await fetch(
        `https://graph.facebook.com/${this.apiVersion}/${this.pixelId}/events`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        }
      )

      return response.ok
    } catch (error) {
      console.error('Facebook Conversions API: Error sending InitiateCheckout event:', error)
      return false
    }
  }
}

export const facebookConversions = new FacebookConversionsAPI()

