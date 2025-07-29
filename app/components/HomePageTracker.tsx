"use client"

import { useEffect } from "react"
import { useVisitorTracking } from "../../hooks/useVisitorTracking"

export default function HomePageTracker() {
  const { trackActivity } = useVisitorTracking()

  useEffect(() => {
    trackActivity({
      action: 'page_view',
      page: '/'
    })
  }, [trackActivity])

  return null // This component doesn't render anything
} 