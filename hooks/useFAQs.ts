import { useState, useEffect } from 'react'
import { FAQ } from '@/lib/database'

interface UseFAQsOptions {
  category?: string
  limit?: number
}

interface UseFAQsReturn {
  faqs: FAQ[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useFAQs(options: UseFAQsOptions = {}): UseFAQsReturn {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchFAQs = async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (options.category) params.append('category', options.category)
      if (options.limit) params.append('limit', options.limit.toString())

      const response = await fetch(`/api/faqs?${params}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch FAQs')
      }

      setFaqs(data.faqs || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFAQs()
  }, [options.category, options.limit])

  return {
    faqs,
    loading,
    error,
    refetch: fetchFAQs,
  }
} 