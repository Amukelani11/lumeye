import { useState, useEffect } from 'react'
import { Product } from '@/lib/database'

interface UseProductsOptions {
  slug?: string
  category?: string
  limit?: number
}

interface UseProductsReturn {
  products: Product[]
  product: Product | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useProducts(options: UseProductsOptions = {}): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([])
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (options.category) params.append('category', options.category)
      if (options.limit) params.append('limit', options.limit.toString())

      const response = await fetch(`/api/products?${params}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch products')
      }

      setProducts(data.products || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const fetchProduct = async () => {
    try {
      setLoading(true)
      setError(null)

      if (!options.slug) {
        throw new Error('Product slug is required')
      }

      const response = await fetch(`/api/products/${options.slug}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch product')
      }

      setProduct(data.product)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (options.slug) {
      fetchProduct()
    } else {
      fetchProducts()
    }
  }, [options.slug, options.category, options.limit])

  return {
    products,
    product,
    loading,
    error,
    refetch: options.slug ? fetchProduct : fetchProducts,
  }
} 