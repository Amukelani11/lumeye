"use client"

import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import { Search, Mail, Download, Filter, Calendar, Users, Tag, Eye, AlertTriangle } from "lucide-react"
import { formatSATime } from "../../../lib/utils"

interface EmailCapture {
  id: number
  email: string
  source: string // 'discount_popup', 'checkout', 'newsletter', 'abandoned_cart'
  session_id?: string
  created_at: string
  metadata?: any
  status?: string
}

interface EmailStats {
  total: number
  fromDiscount: number
  fromCheckout: number
  fromNewsletter: number
  fromAbandonedCart: number
  today: number
  thisWeek: number
  thisMonth: number
}

export default function EmailCapturesPage() {
  const [emailCaptures, setEmailCaptures] = useState<EmailCapture[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [stats, setStats] = useState<EmailStats>({
    total: 0,
    fromDiscount: 0,
    fromCheckout: 0,
    fromNewsletter: 0,
    fromAbandonedCart: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0
  })
  const [sendingEmail, setSendingEmail] = useState<string | null>(null)

  useEffect(() => {
    fetchEmailCaptures()
  }, [])

  const fetchEmailCaptures = async () => {
    try {
      const response = await fetch('/api/admin/email-captures')
      if (response.ok) {
        const data = await response.json()
        setEmailCaptures(data.emailCaptures || [])
        setStats(data.stats || {})
      }
    } catch (error) {
      console.error('Error fetching email captures:', error)
    } finally {
      setLoading(false)
    }
  }

  const sendFailedPaymentEmail = async (emailCapture: EmailCapture) => {
    setSendingEmail(emailCapture.email)
    try {
      const response = await fetch(`/api/admin/email-captures/${emailCapture.id}/send-failed-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [{
            name: 'Lumeye Under Eye Serum',
            quantity: 1,
            price: 299.00
          }],
          totalAmount: 299.00,
          paymentMethod: 'Credit Card',
          errorMessage: 'Payment was declined. Please check your card details and try again.'
        }),
      })

      if (response.ok) {
        alert('Failed payment email sent successfully!')
        await fetchEmailCaptures() // Refresh the list
      } else {
        const errorData = await response.json()
        alert(`Error sending email: ${errorData.error || errorData.details || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error sending failed payment email:', error)
      alert('Error sending email. Please try again.')
    } finally {
      setSendingEmail(null)
    }
  }

  const testEmail = async (emailCapture: EmailCapture) => {
    setSendingEmail(emailCapture.email)
    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailCapture.email,
          type: 'failed_payment'
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
      alert('Error sending test email. Please try again.')
    } finally {
      setSendingEmail(null)
    }
  }

  const checkEmailStatus = async () => {
    try {
      const response = await fetch('/api/email-status')
      if (response.ok) {
        const data = await response.json()
        if (data.config.resendApiKey) {
          alert('✅ Email service is configured correctly!')
        } else {
          alert('❌ Email service is not configured. Please set RESEND_API_KEY environment variable.')
        }
      } else {
        alert('❌ Error checking email service status')
      }
    } catch (error) {
      console.error('Error checking email status:', error)
      alert('❌ Error checking email service status')
    }
  }

  const exportEmails = () => {
    const csvContent = [
      ['Email', 'Source', 'Date', 'Session ID'],
      ...emailCaptures.map(capture => [
        capture.email,
        capture.source,
        new Date(capture.created_at).toLocaleDateString(),
        capture.session_id || ''
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `email-captures-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const filteredEmails = emailCaptures.filter(email => {
    const matchesSearch = email.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.session_id?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || email.source === filter
    return matchesSearch && matchesFilter
  })

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'discount_popup':
        return <Tag className="w-4 h-4 text-blue-600" />
      case 'checkout':
        return <Mail className="w-4 h-4 text-green-600" />
      case 'newsletter':
        return <Users className="w-4 h-4 text-purple-600" />
      case 'abandoned_cart':
        return <Calendar className="w-4 h-4 text-orange-600" />
      default:
        return <Mail className="w-4 h-4 text-gray-600" />
    }
  }

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'discount_popup':
        return 'Discount Popup'
      case 'checkout':
        return 'Checkout Form'
      case 'newsletter':
        return 'Newsletter Signup'
      case 'abandoned_cart':
        return 'Abandoned Cart'
      default:
        return source
    }
  }

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'discount_popup':
        return 'bg-blue-100 text-blue-800'
      case 'checkout':
        return 'bg-green-100 text-green-800'
      case 'newsletter':
        return 'bg-purple-100 text-purple-800'
      case 'abandoned_cart':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Captures</h1>
          <p className="text-gray-600">Track all email captures from various sources</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Mail className="w-6 h-6 text-pink-600" />
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Total</p>
                <p className="text-lg font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Tag className="w-6 h-6 text-blue-600" />
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Discount</p>
                <p className="text-lg font-bold text-gray-900">{stats.fromDiscount}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Mail className="w-6 h-6 text-green-600" />
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Checkout</p>
                <p className="text-lg font-bold text-gray-900">{stats.fromCheckout}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Users className="w-6 h-6 text-purple-600" />
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Newsletter</p>
                <p className="text-lg font-bold text-gray-900">{stats.fromNewsletter}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Calendar className="w-6 h-6 text-orange-600" />
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Abandoned</p>
                <p className="text-lg font-bold text-gray-900">{stats.fromAbandonedCart}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Calendar className="w-6 h-6 text-indigo-600" />
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Today</p>
                <p className="text-lg font-bold text-gray-900">{stats.today}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Calendar className="w-6 h-6 text-teal-600" />
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">This Week</p>
                <p className="text-lg font-bold text-gray-900">{stats.thisWeek}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Calendar className="w-6 h-6 text-cyan-600" />
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">This Month</p>
                <p className="text-lg font-bold text-gray-900">{stats.thisMonth}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
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
                <option value="all">All Sources</option>
                <option value="discount_popup">Discount Popup</option>
                <option value="checkout">Checkout Form</option>
                <option value="newsletter">Newsletter</option>
                <option value="abandoned_cart">Abandoned Cart</option>
              </select>
            </div>
            <button
              onClick={exportEmails}
              className="btn-primary flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </button>
            <button
              onClick={checkEmailStatus}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Check Email Status
            </button>
          </div>
        </div>

        {/* Email Captures Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading email captures...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Session ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Captured
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEmails.map((emailCapture) => (
                    <tr key={emailCapture.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {emailCapture.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSourceColor(emailCapture.source)}`}>
                          {getSourceIcon(emailCapture.source)}
                          <span className="ml-1">{getSourceLabel(emailCapture.source)}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {emailCapture.session_id ? (
                            <span className="font-mono text-xs">
                              {emailCapture.session_id.substring(0, 8)}...
                            </span>
                          ) : (
                            <span className="text-gray-400">No session</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {(() => {
                          try {
                            const saDate = new Date(emailCapture.created_at)
                            if (isNaN(saDate.getTime())) {
                              return 'Invalid date'
                            }
                            saDate.setHours(saDate.getHours() + 2) // Add 2 hours for SA time
                            return saDate.toLocaleString('en-US', { 
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => window.open(`mailto:${emailCapture.email}`, '_blank')}
                            className="text-blue-600 hover:text-blue-900 flex items-center"
                            title="Open Email Client"
                          >
                            <Mail className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => sendFailedPaymentEmail(emailCapture)}
                            disabled={sendingEmail === emailCapture.email}
                            className="text-red-600 hover:text-red-900 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Send Failed Payment Email"
                          >
                            {sendingEmail === emailCapture.email ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                            ) : (
                              <AlertTriangle className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => testEmail(emailCapture)}
                            disabled={sendingEmail === emailCapture.email}
                            className="text-purple-600 hover:text-purple-900 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Send Test Email"
                          >
                            {sendingEmail === emailCapture.email ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                            ) : (
                              <Mail className="w-4 h-4" />
                            )}
                          </button>
                          {emailCapture.session_id && (
                            <button
                              onClick={() => window.open(`/cart?session=${emailCapture.session_id}`, '_blank')}
                              className="text-gray-600 hover:text-gray-900 flex items-center"
                              title="View Session"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {filteredEmails.length === 0 && !loading && (
          <div className="text-center py-12">
            <Mail className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No email captures</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filter !== 'all' ? 'Try adjusting your search or filters.' : 'No emails have been captured yet.'}
            </p>
          </div>
        )}
      </main>
    </div>
  )
} 