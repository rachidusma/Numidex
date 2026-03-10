import prisma from '@/lib/prisma'
import Link from 'next/link'
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard'

export default async function AdminDashboard() {
  const categoriesCount = await prisma.category.count()
  const productsCount = await prisma.product.count()
  const totalVisitsCount = await prisma.siteVisit.count()

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-[#013765] mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Categories Card */}
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#FE6B01]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Total Categories</h3>
            <span className="text-2xl">📁</span>
          </div>
          <p className="text-4xl font-bold text-[#013765]">{categoriesCount}</p>
          <Link href="/admin/categories" className="text-[#FE6B01] hover:underline text-sm mt-4 inline-block">
            Manage Categories →
          </Link>
        </div>

        {/* Products Card */}
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#013765]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Total Products</h3>
            <span className="text-2xl">📦</span>
          </div>
          <p className="text-4xl font-bold text-[#FE6B01]">{productsCount}</p>
          <Link href="/admin/products" className="text-[#013765] hover:underline text-sm mt-4 inline-block">
            Manage Products →
          </Link>
        </div>
        
        {/* Visits Card */}
         <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Total Visits</h3>
            <span className="text-2xl">👁️</span>
          </div>
          <p className="text-4xl font-bold text-green-600">{totalVisitsCount}</p>
        </div>
      </div>
      
      {/* Analytics Section with Filters */}
      <AnalyticsDashboard />
    </div>
  )
}
