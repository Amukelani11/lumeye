import { NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function GET() {
  try {
    // Fetch customers with order statistics
    const { data: customers, error: customersError } = await supabase
      .from('users')
      .select(`
        *,
        orders (
          id,
          total_amount,
          status
        )
      `)
      .order('created_at', { ascending: false })

    if (customersError) {
      console.error('Error fetching customers:', customersError)
      return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 })
    }

    // Transform customers data to include order statistics
    const transformedCustomers = customers?.map(customer => {
      const orders = customer.orders || []
      const completedOrders = orders.filter((order: any) => order.status === 'confirmed' || order.status === 'delivered')
      const totalSpent = completedOrders.reduce((sum: number, order: any) => sum + order.total_amount, 0)
      
      return {
        id: customer.id,
        email: customer.email,
        first_name: customer.first_name,
        last_name: customer.last_name,
        phone: customer.phone,
        created_at: customer.created_at,
        last_login: customer.last_login,
        is_active: customer.is_active,
        order_count: completedOrders.length,
        total_spent: totalSpent
      }
    }) || []

    return NextResponse.json({ customers: transformedCustomers })
  } catch (error) {
    console.error('Error in admin customers API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 