'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function Navbar({ dictionary, lang }: { dictionary: any, lang: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const redirectedPathname = (locale: string) => {
    if (!pathname) return '/'
    const segments = pathname.split('/')
    segments[1] = locale
    const url = segments.join('/')
    
    const params = searchParams.toString()
    return params ? `${url}?${params}` : url
  }


  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background-dark/80 backdrop-blur-md px-6 lg:px-20 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex-shrink-0">
          <Link href={`/${lang}`} className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Numidex Logo"
              width={210}
              height={50}
              priority
              className="object-contain"
            />
          </Link>
        </div>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href={`/${lang}`} className="text-sm font-semibold text-slate-300 hover:text-primary transition-colors">
            {dictionary.navigation.home}
          </Link>
          <Link href={`/${lang}/about`} className="text-sm font-semibold text-slate-300 hover:text-primary transition-colors">
            {dictionary.navigation.about}
          </Link>
          <Link href={`/${lang}/products`} className="text-sm font-semibold text-slate-300 hover:text-primary transition-colors">
            {dictionary.navigation.products}
          </Link>
          <Link href={`/${lang}/process`} className="text-sm font-semibold text-slate-300 hover:text-primary transition-colors">
            {dictionary.navigation.process}
          </Link>
          <Link href={`/${lang}/contact`} className="rounded bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
            {dictionary.navigation.contact}
          </Link>
          
          <div className="flex space-x-2 text-sm text-slate-400 border-l border-white/10 pl-4">
            <Link href={redirectedPathname('fr')} className={`hover:text-primary ${lang === 'fr' ? 'font-bold text-primary' : ''}`}>FR</Link>
            <span>|</span>
            <Link href={redirectedPathname('en')} className={`hover:text-primary ${lang === 'en' ? 'font-bold text-primary' : ''}`}>EN</Link>
            <span>|</span>
            <Link href={redirectedPathname('ar')} className={`hover:text-primary ${lang === 'ar' ? 'font-bold text-primary' : ''}`}>AR</Link>
          </div>
          

        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2"
          >
            <span className="sr-only">Open main menu</span>
            <span className="material-symbols-outlined text-3xl">
              {isOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background-dark border-b border-white/10 py-4 px-6 scale-in-center">
          <div className="flex flex-col space-y-4">
            <Link href={`/${lang}`} onClick={() => setIsOpen(false)} className="text-lg font-semibold text-slate-300 hover:text-primary">
              {dictionary.navigation.home}
            </Link>
            <Link href={`/${lang}/about`} onClick={() => setIsOpen(false)} className="text-lg font-semibold text-slate-300 hover:text-primary">
              {dictionary.navigation.about}
            </Link>
            <Link href={`/${lang}/products`} onClick={() => setIsOpen(false)} className="text-lg font-semibold text-slate-300 hover:text-primary">
              {dictionary.navigation.products}
            </Link>
            <Link href={`/${lang}/process`} onClick={() => setIsOpen(false)} className="text-lg font-semibold text-slate-300 hover:text-primary">
              {dictionary.navigation.process}
            </Link>
            <Link href={`/${lang}/contact`} onClick={() => setIsOpen(false)} className="text-lg font-bold text-primary">
              {dictionary.navigation.contact}
            </Link>
            <div className="flex space-x-4 pt-4 border-t border-white/10">
              <Link href={redirectedPathname('fr')} className={lang === 'fr' ? 'text-primary font-bold' : 'text-slate-400'}>Français</Link>
              <Link href={redirectedPathname('en')} className={lang === 'en' ? 'text-primary font-bold' : 'text-slate-400'}>English</Link>
              <Link href={redirectedPathname('ar')} className={lang === 'ar' ? 'text-primary font-bold' : 'text-slate-400'}>العربية</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
