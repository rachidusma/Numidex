'use client'

import { useRef } from 'react'
import { Category } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductsProps {
  dictionary: any
  categories: Category[]
  lang: string
}

export default function Products({ dictionary, categories, lang }: ProductsProps) {
  const sliderRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 350 // Updated width for rectangular cards
      const newScrollPosition = direction === 'left' 
        ? sliderRef.current.scrollLeft - scrollAmount
        : sliderRef.current.scrollLeft + scrollAmount
      
      sliderRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="bg-white py-24 px-6 lg:px-20" id="products">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-3">Our Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-black text-navy-deep mb-6">{dictionary.products.title}</h3>
            <p className="text-slate-600 text-lg">
              {dictionary.products.description}
            </p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => scroll('left')}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-navy-deep/10 bg-navy-deep/5 text-navy-deep transition-all hover:bg-primary hover:text-white hover:border-primary shrink-0"
              aria-label="Previous categories"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-navy-deep/10 bg-navy-deep/5 text-navy-deep transition-all hover:bg-primary hover:text-white hover:border-primary shrink-0"
              aria-label="Next categories"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div 
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category) => {
            return (
              <Link 
                key={category.id}
                href={`/${lang}/products?category=${category.id}`}
                className="group relative overflow-hidden rounded-xl bg-navy-deep border border-white/5 p-8 transition-all hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 flex-none w-[85vw] sm:w-[350px] min-h-[400px] snap-center"
              >
                {/* Background Image */}
                {category.image && (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                
                {/* Gradient Overlay - Light blue */}
                <div className={`absolute inset-0 bg-gradient-to-br from-sky-400/90 to-blue-900/90 mix-blend-multiply z-10 transition-opacity duration-300 ${category.image ? 'opacity-90' : 'opacity-0'}`} />
                
                {/* Content */}
                <div className="relative z-20 flex flex-col h-full">
                  {/* Icon removed as requested */}
                  <h4 className="mb-3 text-2xl font-bold text-white drop-shadow-md mt-4">{category.name}</h4>
                  <p className="text-slate-100 text-sm leading-relaxed mb-6 drop-shadow-sm font-medium">
                    {category.description}
                  </p>
                  
                  <div className="h-1 w-0 bg-primary transition-all group-hover:w-full mt-auto"></div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
