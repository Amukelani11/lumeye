import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types based on our schema
export interface User {
  id: string
  email: string
  phone?: string
  first_name?: string
  last_name?: string
  date_of_birth?: string
  created_at: string
  updated_at: string
  last_login?: string
  is_active: boolean
  email_verified: boolean
  phone_verified: boolean
  is_admin: boolean
}

export interface Product {
  id: string
  name: string
  slug: string
  description?: string
  short_description?: string
  price: number
  compare_at_price?: number
  cost_price?: number
  sku?: string
  barcode?: string
  weight?: number
  dimensions?: any
  inventory_quantity: number
  inventory_policy: 'continue' | 'deny'
  requires_shipping: boolean
  is_active: boolean
  meta_title?: string
  meta_description?: string
  tags?: string[]
  images?: any
  created_at: string
  updated_at: string
  // Computed fields from API
  average_rating?: number
  review_count?: number
}

export interface CartItem {
  id: string
  cart_id: string
  product_id: string
  quantity: number
  unit_price: number
  created_at: string
  updated_at: string
  product?: Product
}

export interface Cart {
  id: string
  user_id?: string
  session_id?: string
  created_at: string
  updated_at: string
  expires_at: string
  items?: CartItem[]
  total_amount?: number
  item_count?: number
}

export interface Order {
  id: string
  order_number: string
  user_id?: string
  email: string
  phone?: string
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
  shipping_status: 'pending' | 'packed' | 'shipped' | 'in_transit' | 'delivered' | 'returned'
  subtotal: number
  shipping_cost: number
  tax_amount: number
  discount_amount: number
  total_amount: number
  currency: string
  notes?: string
  tracking_number?: string
  shipped_at?: string
  delivered_at?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  unit_price: number
  total_price: number
  product_snapshot?: any
  created_at: string
  product?: Product
}

export interface ProductReview {
  id: string
  product_id: string
  user_id?: string
  order_id?: string
  rating: number
  title?: string
  content?: string
  is_verified_purchase: boolean
  is_published: boolean
  helpful_count: number
  created_at: string
  updated_at: string
  user?: User
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
  sort_order: number
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface ContactInquiry {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  admin_notes?: string
  created_at: string
  updated_at: string
}

export interface NewsletterSubscription {
  id: string
  email: string
  is_active: boolean
  source?: string
  subscribed_at: string
  unsubscribed_at?: string
} 