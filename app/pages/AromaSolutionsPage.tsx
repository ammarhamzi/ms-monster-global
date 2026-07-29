import { ArrowRight, Check, FlaskConical, MapPinned, Settings2, Sparkles } from 'lucide-react';
import { MotionConfig, motion } from 'motion/react';
import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { aromaSystem, spaceSolutions } from '../data/aroma';

const processIcons = [MapPinned, FlaskConical, Settings2, Sparkles] as const;

const heroReveal = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function AromaSolutionsPage() {
  const { t } = useLanguage();

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-stone-50 pt-20">
        <section className="relative isolate overflow-hidden border-b border-emerald-950/10 bg-emerald-950 text-white">
          <picture className="absolute inset-0 -z-20 block">
            <source media="(max-width: 767px)" srcSet="/assets/perfume-aroma-hero-mobile.jpg" />
            <img
              src="/assets/perfume-aroma-hero.jpg"
              alt="Aroma diffuser and fragrance oils arranged in a refined commercial interior"
              fetchPriority="high"
              sizes="100vw"
              className="h-full w-full object-cover"
            />
          </picture>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-950 via-emerald-950/85 to-emerald-950/30" />
          <div className="mx-auto flex min-h-[31rem] max-w-7xl items-end px-5 py-12 sm:min-h-[34rem] sm:px-6 sm:py-16 md:py-24 lg:px-8">
            <div className="max-w-3xl">
              <motion.p {...heroReveal(0.04)} className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-emerald-200">
                Monster Perfume
              </motion.p>
              <motion.h1 {...heroReveal(0.14)} className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                {t.products.scentDiv}
              </motion.h1>
              <motion.p {...heroReveal(0.24)} className="mt-5 max-w-2xl text-lg leading-relaxed text-emerald-100 md:text-xl">
                {t.products.scentDesc}
              </motion.p>
              <motion.div {...heroReveal(0.34)} className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-white px-6 text-sm font-bold text-emerald-950">
                  Request a recommendation <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/aroma-diffusers" className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-emerald-100/45 px-6 text-sm font-bold text-white">
                  Explore systems <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="find-system" className="scroll-mt-24 bg-stone-100">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-24 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">Setting and space assessment</p>
              <h2 className="mt-3 text-[1.9rem] font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl md:text-4xl">
                Start with the setting. We will take it from there.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600">
                Choose the type of space you are working with, then refine the recommendation with our team.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {spaceSolutions.map((solution, index) => (
                <motion.article
                  key={solution.group}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  className="relative min-h-[26rem] overflow-hidden text-white"
                >
                  <picture className="absolute inset-0 block">
                    <source media="(max-width: 767px)" srcSet={solution.mobileImage} />
                    <img src={solution.image} alt={solution.imageAlt} loading="lazy" className="h-full w-full object-cover" />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/55 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-sm font-bold text-emerald-100">{solution.range}</p>
                    <h3 className="mt-2 text-2xl font-bold">{solution.group}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-emerald-50">{solution.spaces}</p>
                    <Link
                      to={`/aroma-diffusers#catalogue-${solution.group.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`}
                      className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold"
                    >
                      View suitable systems <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-24 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">The aroma system</p>
              <h2 className="mt-3 text-[1.75rem] font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl md:text-4xl">
                A complete scent programme, not just a diffuser.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600">
                From first brief to ongoing diffusion, each part works together to make your space feel intentional and consistent.
              </p>
            </div>
            <ol className="divide-y divide-emerald-900/10 border-y border-emerald-900/10">
              {aromaSystem.map((step, index) => {
                const Icon = processIcons[index];
                return (
                  <li key={step.number} className="grid grid-cols-[3rem_1fr] gap-4 py-6">
                    <span className="text-sm font-bold text-emerald-700">{step.number}</span>
                    <div className="flex gap-4">
                      <Icon className="mt-0.5 h-6 w-6 shrink-0 text-emerald-700" />
                      <div>
                        <h3 className="text-xl font-bold text-slate-950">{step.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section className="border-y border-emerald-900/10 bg-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8">
            <picture>
              <source media="(max-width: 767px)" srcSet="/assets/perfume-service-refill-mobile.jpg" />
              <img src="/assets/perfume-service-refill.jpg" alt="Fragrance specialist preparing a diffuser refill" loading="lazy" className="h-full min-h-72 w-full object-cover" />
            </picture>
            <div className="flex flex-col justify-center">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">Service programme</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">Keep the experience consistent.</h2>
              <ul className="mt-7 space-y-4">
                {['Diffuser selection and installation guidance', 'Fragrance refill and intensity tuning', 'Ongoing support for the operating environment'].map((item) => (
                  <li key={item} className="flex gap-3 text-slate-600">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden bg-emerald-950 text-white">
          <picture className="absolute inset-0 -z-20 block">
            <source media="(max-width: 767px)" srcSet="/assets/perfume-space-hospitality-mobile.jpg" />
            <img src="/assets/perfume-space-hospitality.jpg" alt="Hospitality lobby with a discreet aroma diffuser" loading="lazy" className="h-full w-full object-cover" />
          </picture>
          <div className="absolute inset-0 -z-10 bg-emerald-950/85" />
          <div className="mx-auto flex min-h-[25rem] max-w-7xl items-end px-5 py-14 sm:px-6 md:py-20 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-[2rem] font-bold leading-tight tracking-tight sm:text-4xl">Tell us what your space should feel like.</h2>
              <p className="mt-5 text-lg text-emerald-100">We will help you choose a fragrance direction and a practical diffuser system to match.</p>
              <Link to="/contact" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-lg bg-white px-6 text-sm font-bold text-emerald-950">
                Request your scent recommendation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}
