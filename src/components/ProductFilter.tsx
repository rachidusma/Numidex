'use client'

import { Category } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation'

interface ProductFilterProps {
  categories: Category[]
  dictionary: any
}

export default function ProductFilter({ categories, dictionary }: ProductFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category')

  const handleCategoryChange = (categoryId: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (categoryId) {
      params.set('category', categoryId)
    } else {
      params.delete('category')
    }
    // Reset page to 1 when filter changes
    params.set('page', '1')
    router.push(`?${params.toString()}`)
  }

  const getCategoryIcon = (name: string) => {
    const lower = name.toLowerCase()
    
    // Food & Agriculture
    if (lower.includes('date')) return 'eco' // or 'calendar_today' if preferred, but eco fits dates better. actually, let's use 'park' for dates (palm trees) or 'date_range'
    if (lower.includes('oil')) return 'water_drop'
    if (lower.includes('veg')) return 'eco'
    if (lower.includes('fruit')) return 'nutrition'
    if (lower.includes('chocolat')) return 'cake'
    if (lower.includes('cake') || lower.includes('biscuit')) return 'cookie'
    if (lower.includes('jam') || lower.includes('spread')) return 'breakfast_dining'
    
    // Appliances
    if (lower.includes('refrigirator') || lower.includes('refrigerator') || lower.includes('fridge')) return 'kitchen'
    if (lower.includes('wash') && lower.includes('machine')) return 'local_laundry_service'
    if (lower.includes('dish') || lower.includes('microwave')) return 'microwave'
    if (lower.includes('vacuum') || lower.includes('clean')) return 'cleaning_services'

    return 'grid_view'
  }

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
      <div>
        <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Categories</h3>
        <div className="flex flex-col gap-1">
          <button 
            onClick={() => handleCategoryChange(null)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left w-full ${!currentCategory ? 'bg-primary/10 text-primary border border-primary/20' : 'text-slate-400 hover:bg-neutral-dark'}`}
          >
            <span className="material-symbols-outlined text-[20px]">grid_view</span>
            <span className="text-sm font-semibold">{dictionary.product_page.all_products || 'All Products'}</span>
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left w-full ${currentCategory === category.id ? 'bg-primary/10 text-primary border border-primary/20' : 'text-slate-400 hover:bg-neutral-dark'}`}
            >
              <span className="material-symbols-outlined text-[20px]">{getCategoryIcon(category.name)}</span>
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-border-dark">
        <a 
          href="/Catalogue Produits Numidex NV SMALL.pdf" 
          download
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-neutral-dark border border-border-dark py-3 text-sm font-bold text-white hover:bg-slate-700 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">download</span>
          Full Catalog PDF
        </a>
      </div>
    </aside>
  )
}
