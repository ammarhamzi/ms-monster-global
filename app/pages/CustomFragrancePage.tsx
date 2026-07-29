import { useState } from 'react';
import { ArrowRight, ChevronDown, Droplet, TestTube } from 'lucide-react';
import { MotionConfig, motion } from 'motion/react';
import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { fragranceProcess, scentPalette } from '../data/aroma';
import { essentialOils, extracts } from '../data/products';

export default function CustomFragrancePage() {
  const { t } = useLanguage();
  const [showAllIngredients, setShowAllIngredients] = useState(false);
  const visibleOils = showAllIngredients ? essentialOils : essentialOils.slice(0, 8);
  const visibleExtracts = showAllIngredients ? extracts : extracts.slice(0, 8);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-stone-50 pt-20">
        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
            <picture>
              <source media="(max-width: 767px)" srcSet="/assets/perfume-development-mobile.jpg" />
              <img
                src="/assets/perfume-development.jpg"
                alt="Fragrance specialist blending aromatic oils and botanicals"
                fetchPriority="high"
                className="h-80 w-full object-cover lg:h-full lg:min-h-[38rem]"
              />
            </picture>
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">Custom fragrance development</p>
              <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                Shape a scent identity around the experience.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">{t.products.labDesc}</p>
              <Link to="/contact" className="mt-8 inline-flex min-h-12 w-fit items-center gap-2 rounded-lg bg-emerald-950 px-6 text-sm font-bold text-white">
                Discuss a fragrance brief <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section id="scent-direction" className="border-y border-emerald-900/10 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20 lg:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">Scent directions</p>
            <h2 className="mt-3 max-w-3xl text-[1.75rem] font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl md:text-4xl">
              Find a scent people will remember the space by.
            </h2>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {scentPalette.map((palette, index) => (
                <motion.article
                  key={palette.direction}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.42, delay: index * 0.06 }}
                  className="overflow-hidden border border-emerald-900/10 bg-stone-50"
                >
                  <picture>
                    <source media="(max-width: 767px)" srcSet={palette.mobileImage} />
                    <img src={palette.image} alt={palette.imageAlt} loading="lazy" className="h-56 w-full object-cover" />
                  </picture>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-950">{palette.direction}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{palette.description}</p>
                    <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Ideal for: {palette.idealFor}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {palette.ingredients.map((ingredient) => (
                        <li key={ingredient} className="border border-emerald-900/10 bg-white px-3 py-1.5 text-xs font-bold text-slate-700">
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-24 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">Development process</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">From brief to finished direction.</h2>
            </div>
            <ol className="divide-y divide-emerald-900/10 border-y border-emerald-900/10">
              {fragranceProcess.map((step, index) => (
                <li key={step} className="grid grid-cols-[3rem_1fr] gap-4 py-6">
                  <span className="text-sm font-bold text-emerald-700">0{index + 1}</span>
                  <p className="text-base leading-relaxed text-slate-600">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-y border-emerald-900/10 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20 lg:px-8">
            <div className="border border-emerald-900/10 bg-stone-50 p-5 sm:p-8">
              <div className="flex flex-col justify-between gap-4 border-b border-emerald-900/10 pb-7 md:flex-row md:items-end">
                <div className="max-w-3xl">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">Fragrance laboratory</p>
                  <h2 className="mt-3 text-3xl font-bold text-slate-950">{t.products.labTitle}</h2>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">{t.products.labDesc}</p>
                </div>
                <p className="text-sm font-bold text-emerald-800">{essentialOils.length + extracts.length} ingredients available</p>
              </div>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <div className="border border-emerald-900/10 bg-white p-5 sm:p-6">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-emerald-800">
                    <Droplet className="h-5 w-5" /> Essential oils
                  </h3>
                  <ul className="mt-5 grid gap-x-6 gap-y-3 text-sm text-slate-600 sm:grid-cols-2">
                    {visibleOils.map((oil) => <li key={oil}>{oil}</li>)}
                  </ul>
                </div>
                <div className="border border-amber-900/10 bg-white p-5 sm:p-6">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-amber-800">
                    <TestTube className="h-5 w-5" /> Extracts
                  </h3>
                  <ul className="mt-5 grid gap-x-6 gap-y-3 text-sm text-slate-600 sm:grid-cols-2">
                    {visibleExtracts.map((extract) => <li key={extract}>{extract}</li>)}
                  </ul>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAllIngredients((current) => !current)}
                aria-expanded={showAllIngredients}
                className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-emerald-800"
              >
                {showAllIngredients ? 'Show ingredient overview' : 'View full ingredient library'}
                <ChevronDown className={`h-4 w-4 transition-transform ${showAllIngredients ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </section>

        <section className="bg-emerald-950 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-6 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-20 lg:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-200">OEM / ODM scope</p>
              <h2 className="mt-3 text-3xl font-bold">Fragrance development for brands, products, and spaces.</h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-emerald-100">
                The development scope can support custom fragrance, product experience, ambient environments, packaging, labelling, and storage needs.
              </p>
            </div>
            <Link to="/contact" className="inline-flex min-h-12 w-fit items-center gap-2 rounded-lg bg-white px-6 text-sm font-bold text-emerald-950 md:justify-self-end">
              Start a development brief <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}
