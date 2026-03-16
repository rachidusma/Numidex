import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram } from 'lucide-react'

export default function Footer({ dictionary }: { dictionary: any }) {
  return (
    <footer className="bg-background-dark border-t border-white/10 pt-20 pb-10 px-6 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-1">
            <div className="mb-6 inline-block">
              <Image
                src="/logo.png"
                alt="Numidex Logo"
                width={250}
                height={60}
                className="object-contain"
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {dictionary.footer.brand_desc}
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/share/1C6KsuuutN/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FE6B01] hover:scale-110 transition-all duration-300 group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.instagram.com/made_in_bled_trading?igsh=eHlhZzdxd3UzYjhj"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FE6B01] hover:scale-110 transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://www.tiktok.com/@made.in.bled.trad?_r=1&_t=ZS-93oGrAUyDr7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FE6B01] hover:scale-110 transition-all duration-300 group"
                aria-label="TikTok"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-5 h-5 text-white fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Links Column */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">{dictionary.footer.quick_links}</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-slate-400 hover:text-primary transition-colors text-sm">{dictionary.navigation.home}</Link></li>
              <li><Link href="/about" className="text-slate-400 hover:text-primary transition-colors text-sm">{dictionary.navigation.about}</Link></li>
              <li><Link href="/products" className="text-slate-400 hover:text-primary transition-colors text-sm">{dictionary.navigation.products}</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-primary transition-colors text-sm">{dictionary.navigation.contact}</Link></li>
            </ul>
          </div>
          
          {/* Contact Column */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">{dictionary.footer.global_contact_center}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-400">
                  <span className="material-symbols-outlined text-primary">phone_iphone</span>
                  <span className="text-sm">+351 922 007 073</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <span className="material-symbols-outlined text-primary">mail</span>
                  <span className="text-sm">Numidex.lda@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <span className="material-symbols-outlined text-primary">public</span>
                  <span className="text-sm">https://www.numidex.com/</span>
                </div>
              </div>
              <div className="flex gap-3 text-slate-400">
                <span className="material-symbols-outlined text-primary flex-shrink-0">location_on</span>
                <span className="text-sm">{dictionary.footer.locations.main_hub}</span>
              </div>
            </div>
            <div className="mt-8 overflow-hidden rounded-lg grayscale border border-white/10 h-32 w-full">
              <img 
                alt="Location Map" 
                className="h-full w-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCab4bE-qDa0nGvFtDqhoEcLJ3mBCAec7nINseybl7MGHhzzZR0ysZP0KR9hF3taEmnQj3AoUibOWh7BGaC0GUlB2ctdDvo25LVVJTZWRNwsTSuVYZWV2sb_gX5wTb9qWnfULQOHxSZ5f3a7H6z392SQEZQjrbcMS1uEXzZ4mwdAgDcgtXf18FV3MXmYAP2RWYMfN-5NCtEvbx59ErKxWJfo3nNHcmuw0oQqMdAqB7thuLg9TTdmOBpBzWNFClJ00uGT6zJ07Zhws0"
              />
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">{dictionary.footer.copyright.replace('{year}', new Date().getFullYear().toString())}</p>
          <div className="flex gap-6">
            <Link href="#" className="text-slate-500 hover:text-white text-xs">{dictionary.footer.privacy_policy}</Link>
            <Link href="#" className="text-slate-500 hover:text-white text-xs">{dictionary.footer.export_terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
