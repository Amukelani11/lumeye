"use client"

import { useEffect, useRef, useCallback } from 'react'
import { usePathname } from 'next/navigation'

interface TrackingData {
  sessionId: string
  page: string
  action: string
  userAgent: string
  referrer: string
  timestamp: string
  metadata?: Record<string, any>
}

interface VisitorTrackingOptions {
  enableInteractionTracking?: boolean
  enableFormTracking?: boolean
  enableScrollTracking?: boolean
  retryAttempts?: number
  retryDelay?: number
}

const DEFAULT_OPTIONS: Required<VisitorTrackingOptions> = {
  enableInteractionTracking: true,
  enableFormTracking: true,
  enableScrollTracking: false,
  retryAttempts: 3,
  retryDelay: 1000,
}

export function useVisitorTracking(options: VisitorTrackingOptions = {}) {
  const opts = { ...DEFAULT_OPTIONS, ...options }
  const pathname = usePathname()
  const sessionIdRef = useRef<string>()
  const lastTrackedPageRef = useRef<string>()
  const retryTimeoutRef = useRef<NodeJS.Timeout>()
  const isOnlineRef = useRef(true)

  // Generate or retrieve session ID
  const getSessionId = useCallback((): string => {
    if (!sessionIdRef.current) {
      // Try to get from localStorage first
      const stored = localStorage.getItem('lumeye-session-id')
      if (stored) {
        sessionIdRef.current = stored
      } else {
        // Generate new session ID
        sessionIdRef.current = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        localStorage.setItem('lumeye-session-id', sessionIdRef.current)
      }
    }
    return sessionIdRef.current
  }, [])

  // Track visitor data
  const trackVisitor = useCallback(async (data: Omit<TrackingData, 'sessionId' | 'userAgent' | 'referrer' | 'timestamp'>) => {
    const trackingData: TrackingData = {
      ...data,
      sessionId: getSessionId(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
    }

    // Check if we're online
    if (!navigator.onLine) {
      isOnlineRef.current = false
      // Store for later when we come back online
      storeOfflineTracking(trackingData)
      return
    }

    try {
      const response = await fetch('/api/track-visitor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trackingData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Clear any stored offline data for this session
      clearOfflineTracking(trackingData.sessionId)

    } catch (error) {
      console.error('Visitor tracking failed:', error)

      // Store for retry later
      storeOfflineTracking(trackingData)

      // If this is a network error and we have retries left, schedule a retry
      if (opts.retryAttempts > 0) {
        scheduleRetry(trackingData)
      }
    }
  }, [getSessionId, opts.retryAttempts])

  // Store tracking data for offline/retry scenarios
  const storeOfflineTracking = useCallback((data: TrackingData) => {
    try {
      const offlineData = JSON.parse(localStorage.getItem('lumeye-offline-tracking') || '[]')
      offlineData.push(data)

      // Keep only last 50 offline events to prevent localStorage bloat
      if (offlineData.length > 50) {
        offlineData.splice(0, offlineData.length - 50)
      }

      localStorage.setItem('lumeye-offline-tracking', JSON.stringify(offlineData))
    } catch (error) {
      console.error('Failed to store offline tracking data:', error)
    }
  }, [])

  // Clear offline tracking for a session
  const clearOfflineTracking = useCallback((sessionId: string) => {
    try {
      const offlineData = JSON.parse(localStorage.getItem('lumeye-offline-tracking') || '[]')
      const filteredData = offlineData.filter((item: TrackingData) => item.sessionId !== sessionId)
      localStorage.setItem('lumeye-offline-tracking', JSON.stringify(filteredData))
    } catch (error) {
      console.error('Failed to clear offline tracking data:', error)
    }
  }, [])

  // Schedule a retry for failed tracking
  const scheduleRetry = useCallback((data: TrackingData) => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current)
    }

    retryTimeoutRef.current = setTimeout(async () => {
      try {
        await trackVisitor({
          page: data.page,
          action: data.action,
          metadata: data.metadata,
        })
      } catch (error) {
        console.error('Retry failed:', error)
      }
    }, opts.retryDelay)
  }, [trackVisitor, opts.retryDelay])

  // Track page views
  useEffect(() => {
    if (!pathname || pathname === lastTrackedPageRef.current) return

    lastTrackedPageRef.current = pathname

    trackVisitor({
      page: pathname,
      action: 'page_view',
      metadata: {
        title: document.title,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
      },
    })
  }, [pathname, trackVisitor])

  // Track user interactions
  useEffect(() => {
    if (!opts.enableInteractionTracking) return

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const element = target.closest('button, a, input, select, textarea')

      if (element) {
        trackVisitor({
          page: pathname,
          action: 'interaction',
          metadata: {
            element: element.tagName.toLowerCase(),
            elementText: element.textContent?.slice(0, 100) || '',
            elementId: element.id || '',
            elementClass: element.className || '',
          },
        })
      }
    }

    const handleFormSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement

      trackVisitor({
        page: pathname,
        action: 'form_submit',
        metadata: {
          formId: form.id || '',
          formClass: form.className || '',
          formAction: form.action || '',
        },
      })
    }

    document.addEventListener('click', handleClick, true)
    document.addEventListener('submit', handleFormSubmit, true)

    return () => {
      document.removeEventListener('click', handleClick, true)
      document.removeEventListener('submit', handleFormSubmit, true)
    }
  }, [pathname, trackVisitor, opts.enableInteractionTracking])

  // Track scroll depth
  useEffect(() => {
    if (!opts.enableScrollTracking) return

    let maxScrollDepth = 0

    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )

      if (scrollPercentage > maxScrollDepth && scrollPercentage % 25 === 0) {
        maxScrollDepth = scrollPercentage

        trackVisitor({
          page: pathname,
          action: 'scroll',
          metadata: {
            scrollDepth: scrollPercentage,
          },
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname, trackVisitor, opts.enableScrollTracking])

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      isOnlineRef.current = true

      // Retry any offline tracking data
      try {
        const offlineData = JSON.parse(localStorage.getItem('lumeye-offline-tracking') || '[]')
        if (offlineData.length > 0) {
          console.log(`Retrying ${offlineData.length} offline tracking events`)

          offlineData.forEach(async (data: TrackingData) => {
            try {
              await trackVisitor({
                page: data.page,
                action: data.action,
                metadata: data.metadata,
              })
            } catch (error) {
              console.error('Offline retry failed:', error)
            }
          })
        }
      } catch (error) {
        console.error('Failed to process offline data:', error)
      }
    }

    const handleOffline = () => {
      isOnlineRef.current = false
      console.log('Visitor tracking: Going offline')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [trackVisitor])

  // Track page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      trackVisitor({
        page: pathname,
        action: document.hidden ? 'page_hidden' : 'page_visible',
        metadata: {
          visibilityState: document.visibilityState,
        },
      })
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [pathname, trackVisitor])

  // Custom tracking function for manual events
  const trackEvent = useCallback((action: string, metadata?: Record<string, any>) => {
    trackVisitor({
      page: pathname,
      action,
      metadata,
    })
  }, [pathname, trackVisitor])

  return {
    trackEvent,
    sessionId: getSessionId(),
    isOnline: isOnlineRef.current,
  }
}
