'use client'

import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

export default function AdminSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' })
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const menuItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/admin/categories', label: 'Categories', icon: '📁' },
    { href: '/admin/products', label: 'Products', icon: '📦' },
    { href: '/admin/users', label: 'Users', icon: '👥' },
    { href: '/admin/profile', label: 'Profile', icon: '👤' },
  ]

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} bg-[#013765] min-h-screen transition-all duration-300 flex flex-col`}>
      {/* Logo/Header */}
      <div className="p-6 border-b border-[#FE6B01]/20">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h2 className="text-white font-bold text-xl">Admin Panel</h2>
              <p className="text-gray-300 text-sm">Numidex</p>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white hover:text-[#FE6B01] transition-colors"
          >
            {isCollapsed ? '→' : '←'}
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-[#FE6B01] text-white shadow-lg'
                      : 'text-gray-300 hover:bg-[#FE6B01]/10 hover:text-white'
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  {!isCollapsed && <span className="font-medium">{item.label}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-[#FE6B01]/20">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
        >
          <span className="text-2xl">🚪</span>
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  )
}
