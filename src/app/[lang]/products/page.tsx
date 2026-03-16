import { getDictionary } from '../../../get-dictionary'
import { Locale } from '../../../i18n-config'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import ProductCard from '../../../components/ProductCard'
import ProductFilter from '../../../components/ProductFilter'
import Pagination from '../../../components/Pagination'
import ProductBanner from '../../../components/ProductBanner'
import CategoryCard from '../../../components/CategoryCard'
import { getProducts, getCategories } from '../../../lib/actions'
import React from 'react'
import Link from 'next/link'

export default async function Products({
  params: { lang },
  searchParams,
}: {
  params: { lang: Locale }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const dictionary = await getDictionary(lang)
  
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1
  const categoryId = typeof searchParams.category === 'string' ? searchParams.category : undefined

  // Fetch data in parallel
  const [productsData, categories] = await Promise.all([
    categoryId ? getProducts({ page, categoryId, lang }) : Promise.resolve({ products: [], totalPages: 0, currentPage: 1 }),
    getCategories(lang),
  ])

  // Get current category details if selected
  const currentCategory = categoryId ? categories.find(c => c.id === categoryId) : null

  // Insert banner logic: try to insert after 3rd item if we have enough items
  const products = [...productsData.products]
  const showBanner = products.length >= 2 

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display flex flex-col">
      <Navbar dictionary={dictionary} lang={lang} />
      
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] w-full items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80 z-10" />
          <img
            alt="Products Hero"
            className="h-full w-full object-cover"
            src="/images/33.webp"
          />
        </div>
        {/* Content */}
        <div className="relative z-20 text-center px-6 pt-24 pb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 border border-primary/30 mb-6">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">{dictionary.hero?.badge ?? 'Our Products'}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            {dictionary.products.title}
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {dictionary.products.description}
          </p>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row px-6 md:px-16 py-12 gap-12 max-w-[1920px] mx-auto w-full">
        
        {categoryId ? (
          // Product View (Sidebar + Grid)
          <>
            {/* Sidebar Filters */}
            <div className="w-full lg:w-64 flex-shrink-0 space-y-8">
               <Link 
                  href={`/${lang}/products`}
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group"
               >
                  <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
                  <span className="font-bold text-sm uppercase tracking-wider">{dictionary.product_page.back_to_categories}</span>
               </Link>
               <ProductFilter categories={categories} dictionary={dictionary} />
            </div>

            {/* Product Content Area */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-border-dark">
                <p className="text-slate-400 text-sm">
                  {currentCategory ? (
                     <>Category: <span className="text-white font-bold">{currentCategory.name}</span> • </>
                  ) : null}
                  Showing <span className="text-white font-bold">{productsData.products.length}</span> Premium Items
                </p>
              </div>

              {products.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} dictionary={dictionary} lang={lang} />
                    ))}
                  </div>
                  
                  <Pagination 
                    totalPages={productsData.totalPages} 
                    currentPage={productsData.currentPage} 
                  />

                  {showBanner && (
                    <div className="mt-16">
                      <ProductBanner dictionary={dictionary} />
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {dictionary.product_page.no_products}
                  </h3>
                  <p className="text-slate-400">
                    {dictionary.product_page.no_products_desc}
                  </p>
                  <Link 
                    href={`/${lang}/products`}
                    className="inline-block mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-orange-600 transition-colors font-bold"
                  >
                    {dictionary.product_page.back_to_categories}
                  </Link>
                </div>
              )}
            </div>
          </>
        ) : (
          // Category View (Grid only)
          <div className="w-full">
            <div className="mb-10 text-center">
               <h2 className="text-2xl font-bold text-white mb-2">{dictionary.product_page.select_category}</h2>
               <p className="text-slate-400">{dictionary.product_page.select_category_desc}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category) => (
                <CategoryCard 
                  key={category.id} 
                  category={category} 
                  dictionary={dictionary} 
                  lang={lang} 
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer dictionary={dictionary} />
    </main>
  )
}
