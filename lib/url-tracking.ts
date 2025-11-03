/**
 * URL Parameter Tracking Utility
 * Captures and stores URL parameters (UTM, Facebook click IDs, etc.) for purchase attribution
 */

export interface TrackingParams {
  // UTM Parameters
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  
  // Facebook Parameters
  fbclid?: string
  
  // Google Parameters
  gclid?: string
  
  // Other common tracking parameters
  ref?: string
  source?: string
  campaign?: string
  
  // Custom parameters
  [key: string]: string | undefined
}

/**
 * Extract tracking parameters from URL
 */
export function extractTrackingParams(url?: string): TrackingParams {
  const params: TrackingParams = {}
  
  try {
    const urlString = url || (typeof window !== 'undefined' ? window.location.href : '')
    if (!urlString) return params
    
    const urlObj = new URL(urlString)
    const searchParams = urlObj.searchParams
    
    // UTM parameters
    if (searchParams.has('utm_source')) params.utm_source = searchParams.get('utm_source') || undefined
    if (searchParams.has('utm_medium')) params.utm_medium = searchParams.get('utm_medium') || undefined
    if (searchParams.has('utm_campaign')) params.utm_campaign = searchParams.get('utm_campaign') || undefined
    if (searchParams.has('utm_term')) params.utm_term = searchParams.get('utm_term') || undefined
    if (searchParams.has('utm_content')) params.utm_content = searchParams.get('utm_content') || undefined
    
    // Facebook Click ID
    if (searchParams.has('fbclid')) params.fbclid = searchParams.get('fbclid') || undefined
    
    // Google Click ID
    if (searchParams.has('gclid')) params.gclid = searchParams.get('gclid') || undefined
    
    // Other common parameters
    if (searchParams.has('ref')) params.ref = searchParams.get('ref') || undefined
    if (searchParams.has('source')) params.source = searchParams.get('source') || undefined
    if (searchParams.has('campaign')) params.campaign = searchParams.get('campaign') || undefined
    
    // Store first touch timestamp
    if (Object.keys(params).length > 0 && typeof window !== 'undefined') {
      const firstTouch = localStorage.getItem('tracking_first_touch')
      if (!firstTouch) {
        localStorage.setItem('tracking_first_touch', new Date().toISOString())
      }
    }
    
  } catch (error) {
    console.error('Error extracting tracking parameters:', error)
  }
  
  return params
}

/**
 * Get stored tracking parameters (from localStorage)
 */
export function getStoredTrackingParams(): TrackingParams | null {
  if (typeof window === 'undefined') return null
  
  try {
    const stored = localStorage.getItem('tracking_params')
    if (!stored) return null
    
    const params = JSON.parse(stored)
    // Merge with any new params from current URL
    const currentParams = extractTrackingParams()
    return { ...params, ...currentParams }
  } catch (error) {
    console.error('Error reading stored tracking parameters:', error)
    return null
  }
}

/**
 * Store tracking parameters in localStorage
 */
export function storeTrackingParams(params: TrackingParams): void {
  if (typeof window === 'undefined') return
  
  try {
    // Get existing params and merge
    const existing = getStoredTrackingParams() || {}
    const merged = { ...existing, ...params }
    
    // Only store if there are actual tracking params
    if (Object.keys(merged).length > 0) {
      localStorage.setItem('tracking_params', JSON.stringify(merged))
      localStorage.setItem('tracking_params_updated', new Date().toISOString())
    }
  } catch (error) {
    console.error('Error storing tracking parameters:', error)
  }
}

/**
 * Clear tracking parameters
 */
export function clearTrackingParams(): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem('tracking_params')
    localStorage.removeItem('tracking_params_updated')
    localStorage.removeItem('tracking_first_touch')
  } catch (error) {
    console.error('Error clearing tracking parameters:', error)
  }
}

/**
 * Get tracking parameters as URL query string
 */
export function getTrackingParamsAsQueryString(params?: TrackingParams): string {
  const trackingParams = params || getStoredTrackingParams() || {}
  const queryParams = new URLSearchParams()
  
  Object.entries(trackingParams).forEach(([key, value]) => {
    if (value) {
      queryParams.append(key, value)
    }
  })
  
  return queryParams.toString()
}

/**
 * Initialize tracking - should be called on page load
 */
export function initTracking(): void {
  if (typeof window === 'undefined') return
  
  // Extract current URL parameters
  const params = extractTrackingParams()
  
  // Store them if any found
  if (Object.keys(params).length > 0) {
    storeTrackingParams(params)
  }
}

