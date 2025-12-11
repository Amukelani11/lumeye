"use client"

import { useEffect, type ReactNode } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import posthog from "posthog-js"
import { PostHogProvider } from "posthog-js/react"

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com"

let posthogInitialized = false

function initPostHog() {
  if (posthogInitialized) return
  if (!POSTHOG_KEY) {
    if (process.env.NODE_ENV === "development") {
      console.warn("PostHog key not set; skipping initialization")
    }
    return
  }

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: false, // capture manually on route changes to avoid double counts
    capture_pageleave: true,
    persistence: "localStorage+cookie",
  })

  posthogInitialized = true
}

export default function PostHogAnalyticsProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    initPostHog()
  }, [])

  useEffect(() => {
    if (!posthogInitialized) {
      initPostHog()
    }

    if (!posthogInitialized) return

    posthog.capture("$pageview", {
      $current_url: typeof window !== "undefined" ? window.location.href : undefined,
    })
  }, [pathname, searchParams])

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}


