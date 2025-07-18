import Sidebar from "./components/Sidebar"
import UserActivityWidget from "./components/UserActivityWidget"
import CartAbandonmentWidget from "./components/CartAbandonmentWidget"
import CheckoutAbandonmentWidget from "./components/CheckoutAbandonmentWidget"
import SalesWidget from "./components/SalesWidget"
import FunnelWidget from "./components/FunnelWidget"
import AdPerformanceWidget from "./components/AdPerformanceWidget"
import RecentActivityWidget from "./components/RecentActivityWidget"
import OrderDetailsWidget from "./components/OrderDetailsWidget"
import CustomerReviewsWidget from "./components/CustomerReviewsWidget"
import VisitorAnalyticsWidget from "./components/VisitorAnalyticsWidget"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Lumeye Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          <VisitorAnalyticsWidget />
          <UserActivityWidget />
          <CartAbandonmentWidget />
          <CheckoutAbandonmentWidget />
          <SalesWidget />
          <AdPerformanceWidget />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          <FunnelWidget />
          <RecentActivityWidget />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          <CustomerReviewsWidget />
          <OrderDetailsWidget />
        </div>
      </main>
    </div>
  )
} 