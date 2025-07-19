import { NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function GET() {
  try {
    // Get current timestamp for "active users" (users active in last 5 minutes)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
    
    // Live visitors (active in last 5 minutes)
    const { count: activeUsers } = await supabase
      .from('live_visitors')
      .select('*', { count: 'exact', head: true })
      .gte('last_activity', fiveMinutesAgo.toISOString())

    // Cart abandonment (from last 24 hours)
    const { count: cartAbandonment } = await supabase
      .from('abandoned_carts')
      .select('*', { count: 'exact', head: true })
      .in('status', ['cart_active', 'email_captured'])
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())

    // Checkout abandonment (from last 24 hours)
    const { count: checkoutAbandonment } = await supabase
      .from('checkout_abandonments')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'checkout_started')
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())

    // Sales data (last 30 days)
    const { data: salesData } = await supabase
      .from('orders')
      .select('total_amount')
      .eq('status', 'confirmed')
      .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

    const totalOrders = salesData?.length || 0
    const totalRevenue = salesData?.reduce((sum, order) => sum + order.total_amount, 0) || 0
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

    // Funnel data (last 30 days) - simplified using available data
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    
    // Visitors - using unique cart sessions
    const { count: visitors } = await supabase
      .from('carts')
      .select('session_id', { count: 'exact', head: true })
      .not('session_id', 'is', null)
      .gte('created_at', thirtyDaysAgo)

    // Product views - using cart items (proxy for product interest)
    const { count: productViews } = await supabase
      .from('cart_items')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', thirtyDaysAgo)

    // Added to cart
    const { count: addedToCart } = await supabase
      .from('cart_items')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', thirtyDaysAgo)

    // Checkout started - using orders
    const { count: checkoutStarted } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', thirtyDaysAgo)

    // Purchased
    const { count: purchased } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'confirmed')
      .gte('created_at', thirtyDaysAgo)

    // Recent orders (last 10 orders)
    const { data: recentOrders } = await supabase
      .from('orders')
      .select('id, total_amount, status, created_at, email')
      .order('created_at', { ascending: false })
      .limit(10)

    // Recent activity - using cart and order activity
    const { data: recentCartActivity } = await supabase
      .from('carts')
      .select('updated_at, session_id')
      .order('updated_at', { ascending: false })
      .limit(25)

    const { data: recentOrderActivity } = await supabase
      .from('orders')
      .select('created_at, status, email')
      .order('created_at', { ascending: false })
      .limit(25)

    // Combine and format recent activity
    const recentActivity = [
      ...(recentCartActivity?.map(cart => ({
        type: 'cart_updated',
        timestamp: cart.updated_at,
        user: cart.session_id
      })) || []),
      ...(recentOrderActivity?.map(order => ({
        type: order.status === 'confirmed' ? 'purchase_completed' : 'order_created',
        timestamp: order.created_at,
        user: order.email
      })) || [])
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 20)

    return NextResponse.json({
      activeUsers: activeUsers || 0,
      cartAbandonment: cartAbandonment || 0,
      checkoutAbandonment: checkoutAbandonment || 0,
      sales: {
        totalOrders,
        totalRevenue,
        avgOrderValue
      },
      funnel: {
        visitors: visitors || 0,
        productViews: productViews || 0,
        addedToCart: addedToCart || 0,
        checkoutStarted: checkoutStarted || 0,
        purchased: purchased || 0
      },
      recentActivity,
      recentOrders: recentOrders || []
    })

  } catch (error) {
    console.error('Analytics API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    )
  }
} 