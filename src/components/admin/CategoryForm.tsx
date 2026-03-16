'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface CategoryFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  initialData?: {
    id: string
    name: string
    name_fr?: string | null
    name_pt?: string | null
    name_ar?: string | null
    description: string | null
    description_fr?: string | null
    description_pt?: string | null
    description_ar?: string | null
    image: string | null
  } | null
}

export default function CategoryForm({ isOpen, onClose, onSuccess, initialData }: CategoryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    name_fr: '',
    name_pt: '',
    name_ar: '',
    description: '',
    description_fr: '',
    description_pt: '',
    description_ar: '',
    image: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        name_fr: initialData.name_fr || '',
        name_pt: initialData.name_pt || '',
        name_ar: initialData.name_ar || '',
        description: initialData.description || '',
        description_fr: initialData.description_fr || '',
        description_pt: initialData.description_pt || '',
        description_ar: initialData.description_ar || '',
        image: initialData.image || ''
      })
    }
  }, [initialData])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const url = initialData 
        ? `/api/admin/categories` 
        : `/api/admin/categories`
      
      const method = initialData ? 'PUT' : 'POST'
      const body = initialData ? { ...formData, id: initialData.id } : formData

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save category')
      }

      onSuccess()
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white z-10 sticky top-0">
          <h2 className="text-xl font-bold text-[#013765]">
            {initialData ? 'Edit Category' : 'New Category'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name (English)</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FE6B01] focus:border-transparent outline-none transition-all"
              placeholder="e.g. Traditional Clothing"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name (French)</label>
              <input
                type="text"
                value={formData.name_fr || ''}
                onChange={(e) => setFormData({ ...formData, name_fr: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FE6B01] focus:border-transparent outline-none transition-all"
                placeholder="e.g. Vêtements Traditionnels"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name (Portuguese)</label>
              <input
                type="text"
                value={formData.name_pt || ''}
                onChange={(e) => setFormData({ ...formData, name_pt: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FE6B01] focus:border-transparent outline-none transition-all"
                placeholder="e.g. Roupas Tradicionais"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name (Arabic)</label>
              <input
                type="text"
                dir="rtl"
                value={formData.name_ar || ''}
                onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FE6B01] focus:border-transparent outline-none transition-all"
                placeholder="مثال: ملابس تقليدية"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (English)</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FE6B01] focus:border-transparent outline-none transition-all resize-none"
              placeholder="Optional description..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (French)</label>
              <textarea
                rows={3}
                value={formData.description_fr || ''}
                onChange={(e) => setFormData({ ...formData, description_fr: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FE6B01] focus:border-transparent outline-none transition-all resize-none"
                placeholder="Description en français..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (Portuguese)</label>
              <textarea
                rows={3}
                value={formData.description_pt || ''}
                onChange={(e) => setFormData({ ...formData, description_pt: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FE6B01] focus:border-transparent outline-none transition-all resize-none"
                placeholder="Descrição em português..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (Arabic)</label>
              <textarea
                rows={3}
                dir="rtl"
                value={formData.description_ar || ''}
                onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FE6B01] focus:border-transparent outline-none transition-all resize-none"
                placeholder="وصف بالعربية..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
            <div className="flex gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const formData = new FormData()
                    formData.append('file', file)
                    try {
                      setLoading(true)
                      const res = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData
                      })
                      const data = await res.json()
                      if (data.url) {
                        setFormData(prev => ({ ...prev, image: data.url }))
                      }
                    } catch (err) {
                      setError('Failed to upload image')
                    } finally {
                      setLoading(false)
                    }
                  }
                }}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FE6B01] focus:border-transparent outline-none transition-all"
              />
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="hidden"
              />
            </div>
          </div>

          {formData.image && (
            <div className="mt-2 h-32 relative rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
              <Image 
                src={formData.image} 
                alt="Preview" 
                fill
                className="object-contain"
              />
            </div>
          )}

          <div className="pt-4 flex justify-end gap-3 sticky bottom-0 bg-white border-t border-gray-100 p-4 -mx-6 -mb-6 mt-4 z-10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#FE6B01] text-white rounded-lg hover:bg-[#e56001] transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
