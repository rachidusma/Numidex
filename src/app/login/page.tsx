'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Login failed')
        setLoading(false)
        return
      }

      // Redirect to dashboard
      router.push('/admin/dashboard')
    } catch (err) {
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      {/* Animated Stitch Loop Background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="adminStitchPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path 
                d="M0 30 Q15 25, 30 30 T60 30" 
                stroke="#FE6B01" 
                strokeWidth="3" 
                fill="none"
                strokeDasharray="8,8"
                className="animate-stitch"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#adminStitchPattern)" />
        </svg>
      </div>

      {/* Login Card */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-md relative z-10">
        {/* Decorative Corner Stitches */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#FE6B01] rounded-tl-2xl stitch-corner"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#FE6B01] rounded-br-2xl stitch-corner"></div>

        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#013765] mb-2">Admin Panel</h1>
          <p className="text-gray-600">Numidex</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-semibold text-[#013765] mb-2"
            >
              Email
            </label>
            <input 
              type="email" 
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#FE6B01] focus:ring-2 focus:ring-[#FE6B01] focus:ring-opacity-20 transition-all duration-300 outline-none text-gray-900"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-semibold text-[#013765] mb-2"
            >
              Password
            </label>
            <input 
              type="password" 
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#FE6B01] focus:ring-2 focus:ring-[#FE6B01] focus:ring-opacity-20 transition-all duration-300 outline-none text-gray-900"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#FE6B01] to-[#ff8534] text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-[#ff8534] hover:to-[#FE6B01] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Info Text */}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes stitch {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 32;
          }
        }

        .animate-stitch {
          animation: stitch 3s linear infinite;
        }

        .stitch-corner {
          border-style: dashed;
        }
      `}</style>
    </div>
  )
}
