"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { trackViewContent } from "@/lib/facebook-pixel-events"

interface ProductViewContentTrackerProps {
  productId: string
  productName: string
  productPrice: number
}

/**
 * Tracks ViewContent event when product page is viewed
 */
export default function ProductViewContentTracker({ 
  productId, 
  productName, 
  productPrice 
}: ProductViewContentTrackerProps) {
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Track ViewContent event for product page
    trackViewContent({
      content_name: productName,
      content_ids: [productId],
      content_type: 'product',
      value: productPrice,
      currency: 'ZAR'
    })
  }, [productId, productName, productPrice])

  return null
}

