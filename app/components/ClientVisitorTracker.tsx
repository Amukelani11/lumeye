"use client"

import dynamic from 'next/dynamic'

// Dynamically import VisitorTracker to avoid SSR issues
const VisitorTracker = dynamic(() => import('./VisitorTracker'), {
  ssr: false,
  loading: () => null
})

export default function ClientVisitorTracker() {
  return <VisitorTracker />
}
