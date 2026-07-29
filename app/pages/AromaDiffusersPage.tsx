import { ArrowRight, ExternalLink } from 'lucide-react';
import { MotionConfig, motion } from 'motion/react';
import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { catalogGroups, featuredDiffusers } from '../data/aroma';

export default function AromaDiffusersPage() {
  const { t } = useLanguage();

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-stone-50 pt-20">
        <section className="overflow-hidden bg-emerald-950 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-6 md:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-200">Commercial aroma systems</p>
              <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Aroma diffusers for every scale.</h1>
            </div>
            <p className="max-w-2xl text-lg leading-relaxed text-emerald-100">
              Compare compact, commercial, standing, and HVAC-ready systems, then ask our team to match the coverage to your environment.
            </p>
          </div>
        </section>

        <section className="bg-stone-100">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-24 lg:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">Featured diffuser formats</p>
            <h2 className="mt-3 text-[1.9rem] font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl md:text-4xl">
              A clear place to start, whatever the scale.
            </h2>
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {featuredDiffusers.map((diffuser, index) => (
                <motion.article
                  key={diffuser.model}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  className="overflow-hidden border border-emerald-950/10 bg-white"
                >
                  <div className="bg-stone-50 p-6">
                    <img src={diffuser.image} alt={diffuser.imageAlt} loading="lazy" className="h-64 w-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">{diffuser.name}</p>
                    <div className="mt-2 flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-bold text-slate-950">{diffuser.model}</h3>
                      <span className="text-xs font-bold text-emerald-800">{diffuser.product.coverage}</span>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-slate-600">{diffuser.detail}</p>
                    <a href={`#catalogue-${diffuser.model.toLowerCase()}`} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-emerald-800">
                      View model <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="diffuser-catalogue" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-14 sm:px-6 md:py-24 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">Complete diffuser catalogue</p>
              <h2 className="mt-3 text-[1.75rem] font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl">{t.products.catalogTitle}</h2>
            </div>
            <a href="https://www.facebook.com/HqMonsterPerfume/" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-emerald-800">
              Follow Monster Perfume <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-9 divide-y divide-emerald-900/10 border-y border-emerald-900/10">
            {catalogGroups.map((group) => (
              <details
                key={group.title}
                id={`catalogue-${group.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`}
                className="scroll-mt-24 py-1"
                open
              >
                <summary className="cursor-pointer py-5 text-xl font-bold text-slate-950">
                  {group.title}
                  <span className="ml-3 text-sm font-medium text-slate-500">
                    {group.range} · {group.models.length} models
                  </span>
                </summary>
                <div className="grid gap-4 pb-8 sm:grid-cols-2 lg:grid-cols-3">
                  {group.models.map((diffuser) => (
                    <article
                      key={diffuser.model}
                      id={`catalogue-${diffuser.model.toLowerCase()}`}
                      className="scroll-mt-24 border border-emerald-900/10 bg-white p-5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-bold text-slate-950">{diffuser.model}</h3>
                        <span className="shrink-0 bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-800">{diffuser.capacity}</span>
                      </div>
                      <p className="mt-3 text-sm font-medium text-slate-500">Coverage: {diffuser.coverage}</p>
                      <ul className="mt-5 space-y-2 text-sm text-slate-600">
                        {diffuser.features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                      <p className="mt-5 border-t border-emerald-900/10 pt-4 text-sm leading-relaxed text-slate-500">
                        <span className="font-bold text-slate-700">Suitable for:</span> {diffuser.applicable}
                      </p>
                    </article>
                  ))}
                </div>
              </details>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/contact" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-emerald-950 px-6 text-sm font-bold text-white">
              Ask for a diffuser recommendation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}
