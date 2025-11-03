/**
 * Facebook Pixel Events Utility
 * Client-side event tracking for Meta Pixel
 */

declare global {
  interface Window {
    fbq: (
      command: string,
      eventName: string,
      eventData?: Record<string, any>,
      eventID?: string
    ) => void
  }
}

/**
 * Check if Facebook Pixel is loaded
 */
function isPixelLoaded(): boolean {
  return typeof window !== 'undefined' && typeof window.fbq === 'function'
}

/**
 * ViewContent - Track when a user views a product page
 */
export function trackViewContent(data: {
  content_name?: string
  content_ids?: string[]
  content_type?: string
  value?: number
  currency?: string
}) {
  if (!isPixelLoaded()) {
    console.warn('Facebook Pixel not loaded')
    return
  }

  window.fbq('track', 'ViewContent', {
    content_name: data.content_name,
    content_ids: data.content_ids,
    content_type: data.content_type || 'product',
    value: data.value,
    currency: data.currency || 'ZAR',
  })
}

/**
 * AddToCart - Track when a user adds items to cart
 */
export function trackAddToCart(data: {
  content_name?: string
  content_ids?: string[]
  content_type?: string
  value?: number
  currency?: string
  contents?: Array<{
    id?: string
    quantity?: number
    item_price?: number
  }>
}) {
  if (!isPixelLoaded()) {
    console.warn('Facebook Pixel not loaded')
    return
  }

  window.fbq('track', 'AddToCart', {
    content_name: data.content_name,
    content_ids: data.content_ids,
    content_type: data.content_type || 'product',
    value: data.value,
    currency: data.currency || 'ZAR',
    contents: data.contents,
  })
}

/**
 * InitiateCheckout - Track when user starts checkout
 */
export function trackInitiateCheckout(data: {
  content_name?: string
  content_ids?: string[]
  content_type?: string
  value?: number
  currency?: string
  num_items?: number
  contents?: Array<{
    id?: string
    quantity?: number
    item_price?: number
  }>
}) {
  if (!isPixelLoaded()) {
    console.warn('Facebook Pixel not loaded')
    return
  }

  window.fbq('track', 'InitiateCheckout', {
    content_name: data.content_name,
    content_ids: data.content_ids,
    content_type: data.content_type || 'product',
    value: data.value,
    currency: data.currency || 'ZAR',
    num_items: data.num_items,
    contents: data.contents,
  })
}

/**
 * Purchase - Track completed purchase (client-side)
 */
export function trackPurchase(data: {
  content_name?: string
  content_ids?: string[]
  content_type?: string
  value: number
  currency?: string
  num_items?: number
  contents?: Array<{
    id?: string
    quantity?: number
    item_price?: number
  }>
  order_id?: string
}) {
  if (!isPixelLoaded()) {
    console.warn('Facebook Pixel not loaded')
    return
  }

  window.fbq('track', 'Purchase', {
    content_name: data.content_name,
    content_ids: data.content_ids,
    content_type: data.content_type || 'product',
    value: data.value,
    currency: data.currency || 'ZAR',
    num_items: data.num_items,
    contents: data.contents,
    order_id: data.order_id,
  })
}

/**
 * Search - Track search queries (if implemented)
 */
export function trackSearch(data: {
  search_string?: string
  content_ids?: string[]
  content_type?: string
  contents?: Array<{
    id?: string
    quantity?: number
  }>
}) {
  if (!isPixelLoaded()) {
    console.warn('Facebook Pixel not loaded')
    return
  }

  window.fbq('track', 'Search', {
    search_string: data.search_string,
    content_ids: data.content_ids,
    content_type: data.content_type || 'product',
    contents: data.contents,
  })
}

/**
 * AddToWishlist - Track when items are added to wishlist (if implemented)
 */
export function trackAddToWishlist(data: {
  content_name?: string
  content_ids?: string[]
  content_type?: string
  value?: number
  currency?: string
}) {
  if (!isPixelLoaded()) {
    console.warn('Facebook Pixel not loaded')
    return
  }

  window.fbq('track', 'AddToWishlist', {
    content_name: data.content_name,
    content_ids: data.content_ids,
    content_type: data.content_type || 'product',
    value: data.value,
    currency: data.currency || 'ZAR',
  })
}

/**
 * CompleteRegistration - Track when user completes registration (if implemented)
 */
export function trackCompleteRegistration(data: {
  content_name?: string
  status?: boolean
}) {
  if (!isPixelLoaded()) {
    console.warn('Facebook Pixel not loaded')
    return
  }

  window.fbq('track', 'CompleteRegistration', {
    content_name: data.content_name,
    status: data.status || true,
  })
}

