import { useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'

interface TrackingData {
  action: string
  page?: string
  email?: string
  cartValue?: number
  items?: any[]
}

export const useVisitorTracking = () => {
  const pathname = usePathname()

  const trackActivity = useCallback(async (data: TrackingData) => {
    try {
      await fetch('/api/track-visitor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          page: data.page || pathname
        })
      })
    } catch (error) {
      console.error('Failed to track activity:', error)
    }
  }, [pathname])

  // Track page views
  useEffect(() => {
    trackActivity({ action: 'page_view' })
  }, [pathname, trackActivity])

  return { trackActivity }
} 