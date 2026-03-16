import { getDictionary } from '../../../get-dictionary'
import { Locale } from '../../../i18n-config'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import Image from 'next/image'

export default async function About({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang)
  const isRtl = false

  return (
    <main className={`min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 ltr`}>
      <Navbar dictionary={dictionary} lang={lang} />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/60 to-transparent z-10"></div>
            <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIT4ZO6mKDpKWDqT7_FD4uj4YJVbGjLEwqSXPOBSehmJ_612qpxo5AiBd0TORxpO7-f9Oekdp0IPTA3sJvAFswugpHW_T-MyItSeL1p8l0-fnbGdruOPHOpCOQwCMMD7-yzZTq5g5kyY9SlXZYUNelikujyu1ObONjeFNB4vVO6NLjYAgoTSrovbXUpgfB3RJK4Ayn5gTHTB3U5BySNrUlB9xwFWb1e26DlmAsyDHlwsAlzczWJUuBf9x2f2BRVZhDfTDCJp9MrWM" 
                alt="Algerian landscape" 
                className="w-full h-full object-cover"
            />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    {dictionary.about_page.hero.since}
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
                    {dictionary.about_page.hero.title_prefix} <span className="text-primary italic">{dictionary.about_page.hero.title_highlight}</span> {dictionary.about_page.hero.title_suffix}
                </h1>
                <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-light">
                    {dictionary.about_page.hero.description}
                </p>
                <div className="flex flex-wrap gap-4">
                    <button className="bg-primary text-white px-8 py-4 rounded-lg font-bold text-base hover:shadow-lg hover:shadow-primary/20 transition-all">
                        {dictionary.about_page.hero.cta_primary}
                    </button>
                    <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-lg font-bold text-base hover:bg-white/20 transition-all">
                        {dictionary.about_page.hero.cta_secondary}
                    </button>
                </div>
            </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">{dictionary.about_page.mission.subtitle}</h2>
                    <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">{dictionary.about_page.mission.title}</h3>
                    <div className="space-y-8">
                        <div className="flex gap-6 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-sm dark:shadow-none hover:bg-white/10 transition-colors">
                            <div className="bg-primary/20 p-4 rounded-lg h-fit text-primary">
                                <span className="material-symbols-outlined text-3xl">rocket_launch</span>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{dictionary.about_page.mission.mission_title}</h4>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {dictionary.about_page.mission.mission_content}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-6 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-sm dark:shadow-none hover:bg-white/10 transition-colors">
                            <div className="bg-primary/20 p-4 rounded-lg h-fit text-primary">
                                <span className="material-symbols-outlined text-3xl">visibility</span>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{dictionary.about_page.mission.vision_title}</h4>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {dictionary.about_page.mission.vision_content}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative group">
                    <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmN0BnHcD_lYuYAl1YCwB_-wzr5BQ-BIHG5h6WNAktbvfg-KoUk-2leNOBgFGt6X33uAYuVzXYlEvX7pC9HmPZ8g1BnKdPHOltid0vXkXBeFENH6KI2nH3lcBZgWaIfqvwbJMlKQLby2bOcKn8LTmohqo61BDddNTqcCs4PY403AFJ4ViORgcX5XTlWV1rHHlXDHSD5c9XpWG_rnVBmme73WUsgUzUbuz6_zsxKOvcNTJIVZR_oTPPsxg3372tYzmAftYzrXvvRsw" 
                        alt="Premium Algerian produce" 
                        className="relative rounded-2xl w-full h-[500px] object-cover border border-white/10 shadow-2xl"
                    />
                    <div className={`absolute bottom-6 ${isRtl ? 'left-6 border-r-4 border-r-primary' : 'right-6 border-l-4 border-l-primary'} bg-black/40 backdrop-blur-md p-6 rounded-xl`}>
                        <p className="text-white font-bold text-2xl">100%</p>
                        <p className="text-slate-200 text-sm">{dictionary.about_page.mission.stat_label}</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Our Core Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
            <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">{dictionary.about_page.values.subtitle}</h2>
            <h3 className="text-4xl font-bold text-slate-900 dark:text-white">{dictionary.about_page.values.title}</h3>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="group p-8 rounded-2xl bg-white/5 border border-black/5 dark:border-white/5 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 shadow-sm dark:shadow-none">
                <div className="mb-6 inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <span className="material-symbols-outlined text-4xl">verified</span>
                </div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{dictionary.about_page.values.items[0].title}</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {dictionary.about_page.values.items[0].description}
                </p>
            </div>
            {/* Value 2 */}
            <div className="group p-8 rounded-2xl bg-white/5 border border-black/5 dark:border-white/5 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 shadow-sm dark:shadow-none">
                <div className="mb-6 inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <span className="material-symbols-outlined text-4xl">troubleshoot</span>
                </div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{dictionary.about_page.values.items[1].title}</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {dictionary.about_page.values.items[1].description}
                </p>
            </div>
            {/* Value 3 */}
            <div className="group p-8 rounded-2xl bg-white/5 border border-black/5 dark:border-white/5 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 shadow-sm dark:shadow-none">
                <div className="mb-6 inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <span className="material-symbols-outlined text-4xl">precision_manufacturing</span>
                </div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{dictionary.about_page.values.items[2].title}</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {dictionary.about_page.values.items[2].description}
                </p>
            </div>
        </div>
      </section>



      {/* Global Reach */}
      <section className="py-24 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">{dictionary.about_page.global_reach.subtitle}</h2>
                <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">{dictionary.about_page.global_reach.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    {dictionary.about_page.global_reach.description}
                </p>
            </div>
            <div className="relative bg-teal-900/5 dark:bg-white/5 rounded-3xl p-8 border border-black/5 dark:border-white/10 overflow-hidden">
                 <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <svg className="w-full h-full text-primary" fill="none" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                        <path d="M150 100 L200 120 M300 150 L350 180 M500 120 L550 100" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1"></path>
                        <circle cx="150" cy="100" fill="currentColor" r="4"></circle>
                        <circle cx="200" cy="120" fill="currentColor" r="6"></circle>
                        <circle cx="350" cy="180" fill="currentColor" r="4"></circle>
                        <circle cx="500" cy="120" fill="currentColor" r="5"></circle>
                    </svg>
                </div>
                <div className="grid md:grid-cols-3 gap-12 relative z-10">
                    <div className="bg-white/80 dark:bg-background-dark/60 p-8 rounded-2xl border border-black/5 dark:border-white/5 text-center backdrop-blur-sm">
                        <span className="text-4xl font-black text-slate-900 dark:text-white block mb-2">{dictionary.about_page.global_reach.regions[0].name}</span>
                        <p className="text-slate-600 dark:text-slate-400">{dictionary.about_page.global_reach.regions[0].description}</p>
                        <div className="mt-4 flex justify-center gap-1">
                            <span className="size-2 rounded-full bg-primary"></span>
                            <span className="size-2 rounded-full bg-primary"></span>
                            <span className="size-2 rounded-full bg-primary"></span>
                        </div>
                    </div>
                    <div className="bg-white/80 dark:bg-background-dark/60 p-8 rounded-2xl border border-primary/30 text-center transform scale-105 backdrop-blur-sm shadow-xl">
                        <span className="text-4xl font-black text-slate-900 dark:text-white block mb-2">{dictionary.about_page.global_reach.regions[1].name}</span>
                        <p className="text-slate-600 dark:text-slate-400">{dictionary.about_page.global_reach.regions[1].description}</p>
                        <div className="mt-4 flex justify-center gap-1">
                            <span className="size-2 rounded-full bg-primary"></span>
                            <span className="size-2 rounded-full bg-primary"></span>
                            <span className="size-2 rounded-full bg-primary"></span>
                             <span className="size-2 rounded-full bg-primary"></span>
                        </div>
                    </div>
                    <div className="bg-white/80 dark:bg-background-dark/60 p-8 rounded-2xl border border-black/5 dark:border-white/5 text-center backdrop-blur-sm">
                        <span className="text-4xl font-black text-slate-900 dark:text-white block mb-2">{dictionary.about_page.global_reach.regions[2].name}</span>
                        <p className="text-slate-600 dark:text-slate-400">{dictionary.about_page.global_reach.regions[2].description}</p>
                        <div className="mt-4 flex justify-center gap-1">
                            <span className="size-2 rounded-full bg-primary"></span>
                            <span className="size-2 rounded-full bg-primary"></span>
                        </div>
                    </div>
                </div>
                 <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-black/30 px-4 py-2 rounded-full border border-black/5 dark:border-white/10">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                         {dictionary.about_page.global_reach.serving_label}
                    </div>
                </div>
            </div>
        </div>
      </section>

      <Footer dictionary={dictionary} />
    </main>
  )
}
