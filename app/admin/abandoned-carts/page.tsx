"use client"

import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import { Search, Mail, Eye, RefreshCw, Calendar, ShoppingCart } from "lucide-react"

interface AbandonedCart {
  id: string
  session_id: string
  email?: string
  cart_data: any
  total_value: number
  items_count: number
  abandoned_at: string
  recovered_at?: string
  email_sent_at?: string
  email_sent_count: number
  is_recovered: boolean
}

export default function AbandonedCartsPage() {
  const [abandonedCarts, setAbandonedCarts] = useState<AbandonedCart[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    fetchAbandonedCarts()
  }, [])

  const fetchAbandonedCarts = async () => {
    try {
      const response = await fetch('/api/admin/abandoned-carts')
      if (response.ok) {
        const data = await response.json()
        setAbandonedCarts(data.abandonedCarts || [])
      }
    } catch (error) {
      console.error('Error fetching abandoned carts:', error)
    } finally {
      setLoading(false)
    }
  }

  const sendAbandonedCartEmail = async (cartId: string) => {
    try {
      const response = await fetch(`/api/admin/abandoned-carts/${cartId}/send-email`, {
        method: 'POST',
      })

      if (response.ok) {
        alert('Abandoned cart email sent successfully!')
        await fetchAbandonedCarts() // Refresh the list
      }
    } catch (error) {
      console.error('Error sending email:', error)
    }
  }

  const filteredCarts = abandonedCarts.filter(cart => {
    const matchesSearch = cart.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cart.session_id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || 
                         (filter === 'with_email' && cart.email) ||
                         (filter === 'without_email' && !cart.email) ||
                         (filter === 'recovered' && cart.is_recovered)
    return matchesSearch && matchesFilter
  })

  const getTimeSinceAbandoned = (date: string) => {
    const now = new Date()
    const abandoned = new Date(date)
    const diffInHours = Math.floor((now.getTime() - abandoned.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} days ago`
    }
  }

  const getCartItems = (cartData: any) => {
    if (Array.isArray(cartData)) {
      return cartData
    }
    return []
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Abandoned Carts</h1>
          <p className="text-gray-600">Track and recover abandoned shopping carts</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <ShoppingCart className="w-8 h-8 text-pink-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Abandoned</p>
                <p className="text-2xl font-bold text-gray-900">{abandonedCarts.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Mail className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">With Email</p>
                <p className="text-2xl font-bold text-gray-900">
                  {abandonedCarts.filter(cart => cart.email).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <RefreshCw className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Recovered</p>
                <p className="text-2xl font-bold text-gray-900">
                  {abandonedCarts.filter(cart => cart.is_recovered).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  R{abandonedCarts.reduce((sum, cart) => sum + cart.total_value, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by email or session ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent"
              >
                <option value="all">All Carts</option>
                <option value="with_email">With Email</option>
                <option value="without_email">Without Email</option>
                <option value="recovered">Recovered</option>
              </select>
            </div>
          </div>
        </div>

        {/* Abandoned Carts Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading abandoned carts...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cart Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Abandoned
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCarts.map((cart) => (
                    <tr key={cart.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {cart.session_id.substring(0, 8)}...
                        </div>
                        <div className="text-sm text-gray-500">
                          {cart.items_count} item{cart.items_count !== 1 ? 's' : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {cart.email || 'No email captured'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {cart.email ? 'Email captured' : 'No email captured'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {getCartItems(cart.cart_data).map((item: any, index: number) => (
                            <div key={index} className="mb-1">
                              {item.product_name || 'Product'} (Qty: {item.quantity})
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        R{cart.total_value.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getTimeSinceAbandoned(cart.abandoned_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          cart.is_recovered 
                            ? 'bg-green-100 text-green-800' 
                            : cart.email 
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {cart.is_recovered ? 'Recovered' : cart.email ? 'With Email' : 'No Email'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {cart.email && !cart.is_recovered && (
                            <button
                              onClick={() => sendAbandonedCartEmail(cart.id)}
                              className="text-blue-600 hover:text-blue-900 flex items-center"
                              title="Send Recovery Email"
                            >
                              <Mail className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => window.open(`/cart?session=${cart.session_id}`, '_blank')}
                            className="text-gray-600 hover:text-gray-900 flex items-center"
                            title="View Cart"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {filteredCarts.length === 0 && !loading && (
          <div className="text-center py-12">
            <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No abandoned carts</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filter !== 'all' ? 'Try adjusting your search or filters.' : 'All customers are completing their purchases!'}
            </p>
          </div>
        )}
      </main>
    </div>
  )
} 