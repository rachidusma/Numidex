export default function Process({ dictionary }: { dictionary: any }) {
  return (
    <>
    <section className="bg-navy-deep py-24 px-6 lg:px-20" id="about">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-2xl border-4 border-white/5">
              <img 
                alt="Portuguese Agriculture" 
                className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCby1JGOAHfa1VGMQ0ATzDVJb4u-6694_sH2smcm9cQcdHEHsBW-U6jcQBmkdftaQLa6v9v-OZMX39X8Ckd101SRLC6Oj4d_mff_3tol_TxB8YpsfX9loROsaa0U29FisWofbSMSPj48xMzgMihf7dy62Plt5g_f9KewEhTzQuLpE9a8jjrmPoCqax-PgunABHyvWYdPRup4_vYVc2moMzQZ060d-lhK6TG4gTyDzGivraW2D_qNbsCvfZsYQmNWDEQsmwK9gp3w4s"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-primary p-10 rounded-xl hidden md:block">
              <div className="text-5xl font-black text-white">2026</div>
              <div className="text-sm font-bold text-white/80 uppercase tracking-widest mt-1">{dictionary.process_component.edition_release}</div>
            </div>
          </div>
          <div>
            <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4">{dictionary.process_component.benchmark_trust}</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">{dictionary.process_component.title}</h3>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              {dictionary.process_component.description}
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <span className="material-symbols-outlined text-primary text-3xl">public</span>
                </div>
                <div>
                  <h5 className="text-xl font-bold text-white mb-2">{dictionary.process_component.global_reach_title}</h5>
                  <p className="text-slate-400 text-sm">{dictionary.process_component.global_reach_desc}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
                </div>
                <div>
                  <h5 className="text-xl font-bold text-white mb-2">{dictionary.process_component.quality_assurance_title}</h5>
                  <p className="text-slate-400 text-sm">{dictionary.process_component.quality_assurance_desc}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <span className="material-symbols-outlined text-primary text-3xl">inventory_2</span>
                </div>
                <div>
                  <h5 className="text-xl font-bold text-white mb-2">{dictionary.process_component.modern_logistics_title}</h5>
                  <p className="text-slate-400 text-sm">{dictionary.process_component.modern_logistics_desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    {/* Export Process Section */}
    <section className="bg-white/5 py-24 px-6 lg:px-20 border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            {dictionary.process_component.export_title}
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            {dictionary.process_component.export_desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dictionary.process_component.export_steps?.map((step: string, index: number) => (
            <div key={index} className="bg-neutral-dark border border-border-dark p-8 rounded-2xl relative overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100px] -z-10 group-hover:bg-primary/20 transition-colors" />
              <div className="text-5xl font-black text-white/5 mb-6 group-hover:text-primary/20 transition-colors">
                {(index + 1).toString().padStart(2, '0')}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {step}
              </h3>
              <div className="w-12 h-1 bg-primary/30 rounded-full group-hover:w-full group-hover:bg-primary transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}
