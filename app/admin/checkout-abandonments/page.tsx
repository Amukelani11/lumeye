"use client"

import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import { Search, Mail, Eye, RefreshCw, Calendar, CreditCard } from "lucide-react"
import { formatSATime } from "../../../lib/utils"

interface CheckoutAbandonment {
  id: string
  session_id: string
  email: string
  checkout_data: any
  total_value: number
  items_count: number
  abandoned_at: string
  recovered_at?: string
  email_sent_at?: string
  email_sent_count: number
  is_recovered: boolean
}

export default function CheckoutAbandonmentsPage() {
  const [checkoutAbandonments, setCheckoutAbandonments] = useState<CheckoutAbandonment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    fetchCheckoutAbandonments()
  }, [])

  const fetchCheckoutAbandonments = async () => {
    try {
      const response = await fetch('/api/admin/checkout-abandonments')
      if (response.ok) {
        const data = await response.json()
        setCheckoutAbandonments(data.checkoutAbandonments || [])
      }
    } catch (error) {
      console.error('Error fetching checkout abandonments:', error)
    } finally {
      setLoading(false)
    }
  }

  const sendCheckoutAbandonmentEmail = async (abandonmentId: string) => {
    try {
      const response = await fetch(`/api/admin/checkout-abandonments/${abandonmentId}/send-email`, {
        method: 'POST',
      })

      if (response.ok) {
        const result = await response.json()
        alert('Checkout abandonment email sent successfully!')
        await fetchCheckoutAbandonments() // Refresh the list
      } else {
        const errorData = await response.json()
        alert(`Error sending email: ${errorData.error || errorData.details || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error sending email:', error)
      alert('Error sending email. Please check the console for details.')
    }
  }

  const testEmail = async (email: string) => {
    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          type: 'checkout_abandonment'
        }),
      })

      if (response.ok) {
        alert('Test email sent successfully!')
      } else {
        const errorData = await response.json()
        alert(`Error sending test email: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error sending test email:', error)
      alert('Error sending test email. Please check the console for details.')
    }
  }

  const filteredAbandonments = checkoutAbandonments.filter(abandonment => {
    const matchesSearch = abandonment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         abandonment.session_id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || 
                         (filter === 'recovered' && abandonment.is_recovered) ||
                         (filter === 'not_recovered' && !abandonment.is_recovered)
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

  const getCheckoutItems = (checkoutData: any) => {
    if (Array.isArray(checkoutData)) {
      return checkoutData
    }
    return []
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout Abandonments</h1>
          <p className="text-gray-600">Track and recover abandoned checkouts</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <CreditCard className="w-8 h-8 text-pink-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Abandoned</p>
                <p className="text-2xl font-bold text-gray-900">{checkoutAbandonments.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Mail className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Emails Sent</p>
                <p className="text-2xl font-bold text-gray-900">
                  {checkoutAbandonments.reduce((sum, abandonment) => sum + abandonment.email_sent_count, 0)}
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
                  {checkoutAbandonments.filter(abandonment => abandonment.is_recovered).length}
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
                  R{checkoutAbandonments.reduce((sum, abandonment) => sum + abandonment.total_value, 0).toFixed(2)}
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
                <option value="all">All Abandonments</option>
                <option value="recovered">Recovered</option>
                <option value="not_recovered">Not Recovered</option>
              </select>
            </div>
          </div>
        </div>

        {/* Checkout Abandonments Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading checkout abandonments...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Checkout Details
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
                  {filteredAbandonments.map((abandonment) => (
                    <tr key={abandonment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {abandonment.session_id.substring(0, 8)}...
                        </div>
                        <div className="text-sm text-gray-500">
                          {abandonment.items_count} item{abandonment.items_count !== 1 ? 's' : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{abandonment.email}</div>
                        <div className="text-sm text-gray-500">
                          {abandonment.email_sent_count > 0 ? `${abandonment.email_sent_count} emails sent` : 'No emails sent'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {getCheckoutItems(abandonment.checkout_data).map((item: any, index: number) => (
                            <div key={index} className="mb-1">
                              {item.product_name || 'Product'} (Qty: {item.quantity})
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        R{abandonment.total_value.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {(() => {
                          try {
                            const saDate = new Date(abandonment.abandoned_at)
                            if (isNaN(saDate.getTime())) {
                              return 'Invalid date'
                            }
                            return saDate.toLocaleString('en-US', { 
                              timeZone: 'Africa/Johannesburg',
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit'
                            })
                          } catch (error) {
                            return 'Invalid date'
                          }
                        })()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          abandonment.is_recovered 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {abandonment.is_recovered ? 'Recovered' : 'Abandoned'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {!abandonment.is_recovered && (
                            <button
                              onClick={() => sendCheckoutAbandonmentEmail(abandonment.id)}
                              className="text-blue-600 hover:text-blue-900 flex items-center"
                              title="Send Recovery Email"
                            >
                              <Mail className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => testEmail(abandonment.email)}
                            className="text-green-600 hover:text-green-900 flex items-center"
                            title="Send Test Email"
                          >
                            <Mail className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => window.open(`/checkout?session=${abandonment.session_id}`, '_blank')}
                            className="text-gray-600 hover:text-gray-900 flex items-center"
                            title="View Checkout"
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

        {filteredAbandonments.length === 0 && !loading && (
          <div className="text-center py-12">
            <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No checkout abandonments</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filter !== 'all' ? 'Try adjusting your search or filters.' : 'All customers are completing their checkouts!'}
            </p>
          </div>
        )}
      </main>
    </div>
  )
} 