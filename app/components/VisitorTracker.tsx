"use client"

import { useVisitorTracking } from "../hooks/useVisitorTracking"

// This component handles visitor tracking for the entire application
export default function VisitorTracker() {
  // Initialize visitor tracking with all features enabled
  const { trackEvent, sessionId, isOnline } = useVisitorTracking({
    enableInteractionTracking: true,
    enableFormTracking: true,
    enableScrollTracking: true,
    retryAttempts: 5,
    retryDelay: 2000,
  })

  return null // This component doesn't render anything
}
