"use client"

import { useEffect } from "react"
import { initTracking } from "@/lib/url-tracking"

/**
 * Client component to initialize URL parameter tracking on page load
 */
export default function ClientTrackingInit() {
  useEffect(() => {
    initTracking()
  }, [])

  return null
}

