import Link from 'next/link'

export default function ContactCTA({ dictionary }: { dictionary: any }) {
  return (
    <section className="bg-primary py-16 px-6 lg:px-20 text-center">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter italic">
          {dictionary.contact_cta.title || "Ready to scale your supply chain?"}
        </h2>
        <p className="text-white/90 text-lg mb-10 font-medium">
          {dictionary.contact_cta.subtitle || "Partner with Portugal's most reliable export network for the 2026 season."}
        </p>
        <Link 
          href="/contact"
          className="bg-white text-primary rounded px-10 py-5 text-xl font-black uppercase hover:bg-slate-50 transition-all shadow-2xl inline-block"
        >
          {dictionary.contact_cta.button || "Request Pricing Now"}
        </Link>
      </div>
    </section>
  )
}
