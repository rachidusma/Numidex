'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product, Category } from '@prisma/client'

interface ProductCardProps {
  product: Product & { category: Category; isAvailable?: boolean }
  dictionary: any
  lang: string
}

export default function ProductCard({ product, dictionary, lang }: ProductCardProps) {
  
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border-dark bg-neutral-dark/40 transition-all hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
      <div className="relative aspect-square overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-neutral-dark flex items-center justify-center text-slate-600">
            <span className="material-symbols-outlined text-4xl">image</span>
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          {/* Availability Badge */}
          {product.isAvailable ? (
            <span className="rounded px-2 py-1 text-[10px] font-black uppercase text-white bg-green-500/90 shadow-lg backdrop-blur-sm">
              {dictionary.product_page?.status?.available || 'Available'}
            </span>
          ) : (
            <span className="rounded px-2 py-1 text-[10px] font-black uppercase text-white bg-red-500/90 shadow-lg backdrop-blur-sm">
              {dictionary.product_page?.status?.out_of_stock || 'Out of stock'}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-primary">
          {product.category.name}
        </div>
        <h3 className="mb-2 text-lg font-bold text-white">
          {product.name}
        </h3>
        <p className="mb-4 text-xs leading-relaxed text-slate-400 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border-dark">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase text-slate-500">Origin</span>
            <span className="text-xs font-semibold text-white">Bled, Algeria</span>
          </div>
          <Link 
            href={`/${lang}/products/${product.id}`}
            className="rounded-lg bg-primary/10 p-2 text-primary hover:bg-primary hover:text-white transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
