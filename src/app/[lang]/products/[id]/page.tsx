import { getDictionary } from '../../../../get-dictionary'
import { Locale } from '../../../../i18n-config'
import Navbar from '../../../../components/Navbar'
import Footer from '../../../../components/Footer'
import { getProduct } from '../../../../lib/actions'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'

export default async function ProductPage({
  params: { lang, id },
}: {
  params: { lang: Locale; id: string }
}) {
  const dictionary = await getDictionary(lang)
  const product = await getProduct(id, lang)
  const headersList = headers()
  const host = headersList.get('host')

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display">
      <Navbar dictionary={dictionary} lang={lang} />

      <div className="max-w-7xl mx-auto px-4 md:px-10 py-12 pt-32">
        {/* Breadcrumb - Optional but good for UX */}
        <nav className="flex mb-8 text-sm text-slate-500">
          <Link href={`/${lang}/products`} className="hover:text-primary transition-colors">
            {dictionary.products.title}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-primary font-medium">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery / Main Image */}
          <div className="flex flex-col gap-4">
            <div className="aspect-[3/4] lg:aspect-[4/5] rounded-3xl overflow-hidden bg-white/5 border border-white/10 group relative shadow-2xl shadow-black/20">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-neutral-dark text-slate-600">
                  <span className="material-symbols-outlined text-6xl">image</span>
                </div>
              )}
                 <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                      {product.category.name}
                    </span>
                    {product.isAvailable ? (
                      <span className="bg-green-500/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg backdrop-blur-sm">
                        {dictionary.product_page.status?.available || 'Available'}
                      </span>
                    ) : (
                      <span className="bg-red-500/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg backdrop-blur-sm">
                        {dictionary.product_page.status?.out_of_stock || 'Out of stock'}
                      </span>
                    )}
                 </div>
            </div>
          </div>

          {/* Product Header & Key Info */}
          <div className="flex flex-col justify-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight leading-tight">{product.name}</h1>
              <p className="text-xl text-primary font-bold mb-8 flex items-center gap-2">
                <span className="material-symbols-outlined">location_on</span>
                {dictionary.product_page.origin}: <span className="text-white">Algeria</span>
              </p>
              
              <div className="w-20 h-1.5 bg-primary rounded-full mb-8"></div>

              <p className="text-slate-300 text-lg leading-relaxed mb-10 font-light">
                {product.description}
              </p>

              <Link
                  href={`/${lang}/contact?product=${encodeURIComponent(product.name)}&url=${encodeURIComponent(`https://${host}/${lang}/products/${id}`)}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl h-16 px-10 bg-primary hover:bg-orange-600 text-white text-lg font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 gap-3 group"
                >
                  {dictionary.product_page.contact_cta}
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Certification Logos */}
        <div className="border-t border-white/10 mt-20 py-12 flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale opacity-40 hover:opacity-100 transition-opacity duration-500">
           <div className="flex items-center gap-3 font-black text-xl md:text-2xl">
              <span className="material-symbols-outlined text-4xl md:text-5xl text-green-500">eco</span> 
              <span>{dictionary.product_page.certifications.organic}</span>
           </div>
           <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-black">{dictionary.product_page.certifications.iso}</span>
              <span className="text-[10px] tracking-[4px] font-bold">CERTIFIED</span>
           </div>
           <div className="border-2 border-white px-4 py-2 font-black italic text-xl md:text-2xl">{dictionary.product_page.certifications.haccp}</div>
           <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-3xl md:text-4xl">verified_user</span>
              <span className="font-bold text-lg md:text-xl">{dictionary.product_page.certifications.fda}</span>
           </div>
        </div>

      </div>

      <Footer dictionary={dictionary} />
    </main>
  )
}
