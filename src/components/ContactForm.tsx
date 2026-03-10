'use client'

import { useState, useEffect } from 'react'
import { sendContactEmail } from '../lib/actions'
import { useSearchParams } from 'next/navigation'

interface ContactFormProps {
  dictionary: any
}

export default function ContactForm({ dictionary }: ContactFormProps) {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [productInfo, setProductInfo] = useState<{ name: string; url: string } | null>(null)

  useEffect(() => {
    const product = searchParams.get('product')
    const url = searchParams.get('url')
    if (product && url) {
      setProductInfo({ name: product, url })
    }
  }, [searchParams])

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    country: '',
    email: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    const result = await sendContactEmail({
      ...formData,
      productLink: productInfo ? `${productInfo.name} (${productInfo.url})` : undefined
    })

    if (result.success) {
      setStatus('success')
      setFormData({
        name: '',
        company: '',
        country: '',
        email: '',
        message: ''
      })
    } else {
      setStatus('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleWhatsAppClick = () => {
    // Replace with your WhatsApp number (include country code without + or spaces)
    const phoneNumber = '213559100042' // Update this with actual number
    const message = encodeURIComponent('Hello, I would like to inquire about your products.')
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-transparent z-10"></div>
          {/* Using a placeholder image or similar from reference */}
          <img 
            className="w-full h-full object-cover opacity-40" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsBLAx-6DtkFCYWz5eEBy7NAYe-bWlGKS-KOIWpAvhtTbaAB_C1xH-cAt0buqrQdLeToGFAbNATILd05lexj5jJ5bQcLx4LHT98j85f7jSwdBxkMWkoYQX7ONwA50IhURf9kedbCVcKDRzqrBdHn_QloZNw9HTCJTO8sJ3RltAfxF1oLabqH4uplHDcvtnafkX86oN2cYvIYuQJQsmf0eKTg2R6vXhSzACfoFBn6f_SUr0FEPo_ga_MASooq2yAib11ds4SnG8-qA" 
            alt="Large industrial shipping port with cargo containers"
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {dictionary.contact.subtitle}
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 text-white">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mb-10">
              {dictionary.contact.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                <span className="material-symbols-outlined text-primary">public</span>
                Worldwide Distribution
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                <span className="material-symbols-outlined text-primary">verified_user</span>
                Quality Guaranteed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Contact Form & Info */}
      <section className="py-20 bg-background-dark relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <div className="glass-panel p-8 md:p-12 rounded-2xl relative overflow-hidden">
              
              {status === 'success' ? (
                 <div className="text-center py-12">
                   <div className="w-20 h-20 bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                     <span className="material-symbols-outlined text-4xl">check</span>
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
                   <p className="text-slate-400 mb-8">Thank you for contacting us. We will get back to you shortly.</p>
                   <button 
                     onClick={() => setStatus('idle')}
                     className="text-primary font-bold hover:underline"
                   >
                     Send another message
                   </button>
                 </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold mb-2 text-white">{dictionary.contact.form.title}</h2>
                  <p className="text-slate-400 mb-10">{dictionary.contact.form.subtitle}</p>

                  {productInfo && (
                    <div className="mb-8 p-4 bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center text-2xl">
                        📦
                      </div>
                      <div>
                        <p className="text-xs text-primary font-bold uppercase tracking-wider">Inquiry for:</p>
                        <p className="text-white font-bold">{productInfo.name}</p>
                      </div>
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="mb-8 p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-400 flex items-center gap-3">
                      <span className="material-symbols-outlined">error</span>
                      Failed to send message. Please try again.
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-300 ml-1">{dictionary.contact.form.name}</label>
                        <input 
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-navy-muted border border-navy-border rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-white placeholder:text-slate-500" 
                          placeholder={dictionary.contact.form.namePlaceholder}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-300 ml-1">{dictionary.contact.form.company}</label>
                        <input 
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          required
                          className="w-full bg-navy-muted border border-navy-border rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-white placeholder:text-slate-500" 
                          placeholder={dictionary.contact.form.companyPlaceholder}
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-300 ml-1">{dictionary.contact.form.country}</label>
                        <input 
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          className="w-full bg-navy-muted border border-navy-border rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-white placeholder:text-slate-500" 
                          placeholder={dictionary.contact.form.countryPlaceholder} 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-300 ml-1">{dictionary.contact.form.email}</label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-navy-muted border border-navy-border rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-white placeholder:text-slate-500" 
                          placeholder={dictionary.contact.form.emailPlaceholder}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-300 ml-1">{dictionary.contact.form.message}</label>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full bg-navy-muted border border-navy-border rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-white placeholder:text-slate-500 resize-none" 
                        placeholder={dictionary.contact.form.messagePlaceholder} 
                        rows={5}
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-5 rounded-xl transition-all flex items-center justify-center gap-3 group disabled:opacity-70"
                    >
                      {status === 'loading' ? (
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      ) : (
                        <>
                          {dictionary.contact.form.submit}
                          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">send</span>
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Contact Info & Details */}
            <div className="flex flex-col justify-between">
              <div className="space-y-12">
                <div>
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white">
                    <span className="w-8 h-1 bg-primary rounded-full"></span>
                    {dictionary.contact.info.title}
                  </h3>
                  <div className="grid gap-8">
                    <div className="flex items-start gap-6">
                      <div className="size-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-primary text-3xl">call</span>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-1">{dictionary.contact.info.phone}</p>
                        <p className="text-xl font-bold text-white">+213559100042</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-6">
                      <div className="size-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-primary text-3xl">mail</span>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-1">{dictionary.contact.info.email}</p>
                        <p className="text-xl font-bold text-white">contact@numidex.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-6">
                      <div className="size-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-primary text-3xl">language</span>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-1">{dictionary.contact.info.website}</p>
                        <p className="text-xl font-bold text-white">https://www.numidex.com/</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white">
                    <span className="w-8 h-1 bg-primary rounded-full"></span>
                    {dictionary.contact.info.hours_title}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-navy-border">
                      <span className="text-slate-300">{dictionary.contact.info.hours_week}</span>
                      <span className="font-bold text-white">{dictionary.contact.info.hours_week_value}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-navy-border">
                      <span className="text-slate-300">{dictionary.contact.info.hours_sat}</span>
                      <span className="font-bold text-primary">{dictionary.contact.info.hours_sat_value}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-slate-300">{dictionary.contact.info.hours_sun}</span>
                      <span className="text-slate-500 font-bold uppercase">{dictionary.contact.info.hours_sun_value}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Social proof / logo cloud placeholder */}
              <div className="mt-16 pt-10 border-t border-navy-border">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-6 text-center lg:text-left">Exporting To</p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500 text-slate-400">
                  <div className="text-lg font-black italic tracking-tighter">GLOBAL_TRADE</div>
                  <div className="text-lg font-black italic tracking-tighter">EU_LOGISTICS</div>
                  <div className="text-lg font-black italic tracking-tighter">MENA_PORT</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Offices Grid */}
      <section className="py-24 bg-navy-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-4xl font-black mb-4 uppercase tracking-tight text-white">{dictionary.contact.global_network.title.split('Global')[0]} Global <span className="text-primary">Network</span></h2>
          <div className="w-24 h-1.5 bg-primary mx-auto mb-6"></div>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">{dictionary.contact.global_network.description}</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          
          {/* Office Cards */}
          {dictionary.contact.global_network.offices.map((office: any, index: number) => (
            <div key={index} className="group relative overflow-hidden rounded-3xl bg-background-dark border border-navy-border p-1 hover:border-primary/50 transition-colors duration-300">
              <div className="h-48 overflow-hidden rounded-2xl mb-6">
                <img 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  src={[
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuDass3YnFGZMbuEJcrXhZBhYwWTEzOsFD4X6icQ5XAh8ecujrwktR9QdgArxpU3apxV6akxF6z12kqHFCKacTfEhMR3L4GdJrU_snjD2iHh9lMkYZU_OzXdXeeXKG1dARnDLu0fX0R7QLllnQjuWKS9xc_aHh6-7RaaN5RmczIi7KrntOJ6d4Al-_0bS3ZD7_-2gFwt8nUHSKjirQFdhK9q7FvdlTpYylAVyJjZ2dMXlA_SWj34h6qwU3ep-ZBfFBeZLo20kYUXh6Y",
                    "/images/doha-card.jpg",
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuAqQOQTW5oyLNKp4652-klrBfDSNHyqj2dOc05b8HgJYDbGFavHyhU6FWjojI7YqELwfg7XM242_wjHkQJGrQnSE3Itgwr5v5vNJq7sh5rAsEfr306xlWKM8xwMZYA9CjAr4U7a7UYn2TXYbVOOZVOg4TqSdohCIxekH237vYCFxpjbcOtQR7hsQ5Go2ZPjqB5kEM_JOF3SjtNWUwFv2H2u8ImJP2eplI4olOnKTP7E19blmWDagChhqeICRaT0pJwOv1FtQjPiy-c"
                  ][index]}
                  alt={office.city} 
                />
              </div>
              <div className="px-6 pb-8">
                <div className={`inline-block px-3 py-1 ${index === 0 ? 'bg-primary text-white' : 'bg-border-dark text-slate-300'} text-[10px] font-black uppercase tracking-widest rounded mb-4`}>
                  {office.tag}
                </div>
                <h4 className="text-2xl font-bold mb-2 text-white">{office.city}</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{office.desc}</p>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Map Placeholder Section */}
      <section className="h-[400px] w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900 border-t border-border-dark">
           <img 
             className="w-full h-full object-cover grayscale opacity-30" 
             src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDaf2cglX1MAU9JiM_IyMqalvd0drG7VdKA1PwlmS16fzGLfLA3ZcaBz-Ut4Fchh3GUuTJP2qVkBH_rWkWRVBGhviGJBs7BXLGbtklskWSM9NFEI-otoJADulUu2Wc7R5-WaRmxmO_lLjJ8qx6hiuGxHgqgFu44pNQBoJb-pQ2GaIfUqFg824qxFAini-i88_GnJW0BKeosStWGfOT3FPiFHfHCJxcJGal5BwFnAMOA7TvAdB8SgUhJ2sI-WskZor9XZbCEFK5DNg" 
             alt="World Map" 
           />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 border-primary/40 bg-background-dark/60 backdrop-blur-md border border-border-dark">
            <span className="material-symbols-outlined text-primary text-4xl animate-bounce">location_on</span>
            <div>
              <p className="font-bold text-lg text-white">Main Trading Office</p>
              <p className="text-slate-400 text-sm">Algiers, North Africa District</p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 z-50 group flex items-center justify-center"
        aria-label="Contact us on WhatsApp"
      >
        <svg 
          className="w-8 h-8" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          1
        </span>
      </button>

      {/* Custom Styles */}
      <style jsx>{`
        .glass-panel {
          background: rgba(22, 42, 74, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(243, 113, 32, 0.1);
        }
        
        .form-group {
          position: relative;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* WhatsApp button pulse animation */
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </>
  )
}
