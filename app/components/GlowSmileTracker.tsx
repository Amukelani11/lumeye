"use client"
import { useEffect } from 'react'
import { useVisitorTracking } from '../../hooks/useVisitorTracking'

export default function GlowSmileTracker() {
  const { trackActivity } = useVisitorTracking()

  useEffect(() => {
    trackActivity({ 
      action: 'page_view',
      page: 'GlowSmile Product Page'
    })
  }, [trackActivity])

  return null
} 