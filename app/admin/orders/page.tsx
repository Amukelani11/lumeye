"use client"

import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import AdminCodeAuth from "../components/AdminCodeAuth"
import { Search, Package, Truck, CheckCircle, Mail, Eye, Edit } from "lucide-react"

interface Order {
  id: string
  order_number: string
  email: string
  status: string
  shipping_status: string
  tracking_status: string
  tracking_number?: string
  total_amount: number
  created_at: string
  shipped_at?: string
  delivered_at?: string
  items: OrderItem[]
  shipping_address?: ShippingAddress
}

interface OrderItem {
  id: string
  product_id: string
  quantity: number
  unit_price: number
  total_price: number
  product_snapshot?: any
}

interface ShippingAddress {
  first_name: string
  last_name: string
  address_line_1: string
  city: string
  postal_code: string
  country: string
}

const trackingStatuses = [
  'pending',
  'packed', 
  'collected',
  'in_transit',
  'out_for_delivery',
  'delivered',
  'returned'
]

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showTrackingModal, setShowTrackingModal] = useState(false)
  const [trackingData, setTrackingData] = useState({
    status: '',
    trackingNumber: '',
    location: '',
    description: ''
  })

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/admin/orders')
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders || [])
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderTracking = async (orderId: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}/tracking`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trackingData),
      })

      if (response.ok) {
        await fetchOrders()
        setShowTrackingModal(false)
        setSelectedOrder(null)
        setTrackingData({ status: '', trackingNumber: '', location: '', description: '' })
      }
    } catch (error) {
      console.error('Error updating tracking:', error)
    }
  }

  const sendShippingNotification = async (orderId: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}/notify-shipping`, {
        method: 'POST',
      })

      if (response.ok) {
        alert('Shipping notification sent successfully!')
      }
    } catch (error) {
      console.error('Error sending notification:', error)
    }
  }

  const openTrackingModal = (order: Order) => {
    setSelectedOrder(order)
    setTrackingData({
      status: order.tracking_status || 'pending',
      trackingNumber: order.tracking_number || '',
      location: '',
      description: ''
    })
    setShowTrackingModal(true)
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTrackingStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'out_for_delivery': return 'bg-blue-100 text-blue-800'
      case 'in_transit': return 'bg-purple-100 text-purple-800'
      case 'collected': return 'bg-yellow-100 text-yellow-800'
      case 'packed': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <AdminCodeAuth>
      <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders Management</h1>
          <p className="text-gray-600">Manage orders, update tracking, and send notifications</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by order number or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading orders...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tracking
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.order_number}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTrackingStatusColor(order.tracking_status)}`}>
                            {order.tracking_status || 'pending'}
                          </span>
                          {order.tracking_number && (
                            <span className="text-xs text-gray-500">
                              {order.tracking_number}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        R{order.total_amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openTrackingModal(order)}
                            className="text-pink-600 hover:text-pink-900 flex items-center"
                            title="Update Tracking"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => sendShippingNotification(order.id)}
                            className="text-blue-600 hover:text-blue-900 flex items-center"
                            title="Send Shipping Notification"
                          >
                            <Mail className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => window.open(`/admin/orders/${order.id}`, '_blank')}
                            className="text-gray-600 hover:text-gray-900 flex items-center"
                            title="View Details"
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

        {/* Tracking Update Modal */}
        {showTrackingModal && selectedOrder && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Update Tracking - {selectedOrder.order_number}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tracking Status
                    </label>
                    <select
                      value={trackingData.status}
                      onChange={(e) => setTrackingData({...trackingData, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                    >
                      {trackingStatuses.map(status => (
                        <option key={status} value={status}>
                          {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tracking Number
                    </label>
                    <input
                      type="text"
                      value={trackingData.trackingNumber}
                      onChange={(e) => setTrackingData({...trackingData, trackingNumber: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                      placeholder="Enter tracking number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location (Optional)
                    </label>
                    <input
                      type="text"
                      value={trackingData.location}
                      onChange={(e) => setTrackingData({...trackingData, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                      placeholder="e.g., Cape Town Distribution Center"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description (Optional)
                    </label>
                    <textarea
                      value={trackingData.description}
                      onChange={(e) => setTrackingData({...trackingData, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                      rows={3}
                      placeholder="Additional tracking details..."
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowTrackingModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => updateOrderTracking(selectedOrder.id)}
                    className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700"
                  >
                    Update Tracking
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
    </AdminCodeAuth>
  )
} 