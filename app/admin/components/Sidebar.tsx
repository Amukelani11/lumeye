export default function Sidebar() {
  return (
    <aside className="w-full lg:w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <span className="text-xl font-bold text-pink-600">Lumeye Admin</span>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <a href="/admin" className="block px-4 py-2 rounded-lg font-medium text-pink-600 bg-pink-50">Dashboard</a>
        <a href="/admin/orders" className="block px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100">Orders</a>
        <a href="/admin/abandoned-carts" className="block px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100">Abandoned Carts</a>
        <a href="/admin/checkout-abandonments" className="block px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100">Checkout Abandonments</a>
        <a href="/admin/products" className="block px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100">Products</a>
        <a href="/admin/customers" className="block px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100">Customers</a>
        <a href="/admin/inquiries" className="block px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100">Inquiries</a>
        <a href="/admin/settings" className="block px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100">Settings</a>
      </nav>
    </aside>
  )
} 