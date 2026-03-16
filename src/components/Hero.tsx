import Link from 'next/link'

export default function Hero({ dictionary, lang }: { dictionary: any, lang: string }) {
  return (
    <section className="relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden px-6 lg:px-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/90 to-transparent z-10"></div>
        <img 
          alt="Global Shipping Port" 
          className="h-full w-full object-cover" 
          src="/images/33.webp"
        />
      </div>
      
      <div className="relative z-20 w-full max-w-7xl">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 border border-primary/30 mb-6 font-display">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">{dictionary.hero.badge}</span>
          </div>
          <h1 className="mb-6 text-5xl font-black leading-[1.1] text-white md:text-7xl lg:text-8xl tracking-tight">
            {dictionary.hero.title_part1} <span className="text-primary">{dictionary.hero.title_part2}</span> {dictionary.hero.title_part3}
          </h1>
          <p className="mb-10 text-lg md:text-xl text-slate-300 leading-relaxed font-medium">
            {dictionary.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href={`/${lang}/products`}
              className="flex items-center justify-center rounded bg-primary px-8 py-4 text-base font-bold text-white shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
            >
              {dictionary.hero.cta_products}
            </Link>
            <Link 
              href={`/${lang}/contact`}
              className="flex items-center justify-center rounded border border-white/20 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-sm hover:bg-white/10 transition-all font-display"
            >
              {dictionary.hero.cta_sales}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
