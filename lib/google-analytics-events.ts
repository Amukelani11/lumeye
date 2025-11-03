/**
 * Google Analytics Events Utility
 * Client-side event tracking for Google Analytics 4 (GA4)
 */

declare global {
  interface Window {
    dataLayer: any[]
    gtag: (
      command: string,
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
  }
}

/**
 * Check if Google Analytics is loaded
 */
function isGALoaded(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function'
}

/**
 * AddToCart - Track when a user adds items to cart
 */
export function trackAddToCart(data: {
  currency?: string
  value?: number
  items?: Array<{
    item_id?: string
    item_name?: string
    quantity?: number
    price?: number
  }>
}) {
  if (!isGALoaded()) {
    console.warn('Google Analytics not loaded')
    return
  }

  window.gtag('event', 'add_to_cart', {
    currency: data.currency || 'ZAR',
    value: data.value,
    items: data.items,
  })
}

/**
 * BeginCheckout - Track when user starts checkout
 */
export function trackBeginCheckout(data: {
  currency?: string
  value?: number
  items?: Array<{
    item_id?: string
    item_name?: string
    quantity?: number
    price?: number
  }>
}) {
  if (!isGALoaded()) {
    console.warn('Google Analytics not loaded')
    return
  }

  window.gtag('event', 'begin_checkout', {
    currency: data.currency || 'ZAR',
    value: data.value,
    items: data.items,
  })
}

/**
 * Purchase - Track completed purchase
 */
export function trackPurchase(data: {
  currency?: string
  value: number
  transaction_id?: string
  items?: Array<{
    item_id?: string
    item_name?: string
    quantity?: number
    price?: number
  }>
}) {
  if (!isGALoaded()) {
    console.warn('Google Analytics not loaded')
    return
  }

  window.gtag('event', 'purchase', {
    currency: data.currency || 'ZAR',
    value: data.value,
    transaction_id: data.transaction_id,
    items: data.items,
  })
}

