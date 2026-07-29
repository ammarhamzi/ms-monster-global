import { ArrowRight, ChevronDown, Droplet, TestTube } from 'lucide-react';
import { MotionConfig, motion } from 'motion/react';
import SectionHeading from '../components/content/SectionHeading';
import type { Locale } from '../config/routes';
import { getRoute } from '../config/routes';
import { getContent } from '../content';
import { essentialOils, essentialOilsMs, extracts, extractsMs } from '../data/products';

const directionAssets = [
  {
    image: '/assets/scent-fresh.jpg',
    mobileImage: '/assets/scent-fresh-mobile.jpg',
    ingredients: {
      en: ['Grapefruit', 'Lemon', 'Peppermint Oil'],
      ms: ['Limau gedang', 'Limau lemon', 'Minyak Pudina'],
    },
  },
  {
    image: '/assets/scent-floral.jpg',
    mobileImage: '/assets/scent-floral-mobile.jpg',
    ingredients: {
      en: ['Jasmine Absolute Oil', 'Rose Absolute Oil', 'Bois De Rose Oil'],
      ms: ['Minyak Absolut Melur', 'Minyak Absolut Mawar', 'Minyak Bois de Rose'],
    },
  },
  {
    image: '/assets/scent-woody.jpg',
    mobileImage: '/assets/scent-woody-mobile.jpg',
    ingredients: {
      en: ['Cedarwood Virginian Oil', 'Cypress Oil', 'Sandalwood Oil'],
      ms: ['Minyak Kayu Cedar Virginia', 'Minyak Sipres', 'Minyak Kayu Cendana'],
    },
  },
] as const;

interface CustomFragrancePageProps {
  locale: Locale;
}

export default function CustomFragrancePage({ locale }: CustomFragrancePageProps) {
  const { fragrance, nav } = getContent(locale);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-stone-50 pt-20">
        <header className="bg-white">
          <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
            <picture>
              <source media="(max-width: 767px)" srcSet="/assets/perfume-development-mobile.jpg" />
              <img
                src="/assets/perfume-development.jpg"
                alt={fragrance.heroImageAlt}
                fetchPriority="high"
                className="h-80 w-full object-cover lg:h-full lg:min-h-[38rem]"
              />
            </picture>
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
              <nav aria-label={nav.breadcrumbLabel} className="mb-10 text-sm text-slate-500">
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <a
                      href={getRoute(locale, 'home').path}
                      className="rounded-sm hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
                    >
                      {nav.home}
                    </a>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="font-semibold text-slate-800">
                    {fragrance.breadcrumb}
                  </li>
                </ol>
              </nav>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
                {fragrance.eyebrow}
              </p>
              <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                {fragrance.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                {fragrance.introduction}
              </p>
              <a
                href={getRoute(locale, 'contact').path}
                className="mt-8 inline-flex min-h-12 w-fit items-center gap-2 rounded-lg bg-emerald-950 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
              >
                {fragrance.primaryLink.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </header>

        <section className="border-y border-emerald-900/10 bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow={fragrance.directionsEyebrow}
              title={fragrance.directionsTitle}
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {fragrance.directions.map((direction, index) => {
                const assets = directionAssets[index];

                return (
                  <motion.article
                    key={direction.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.42, delay: index * 0.06 }}
                    className="overflow-hidden border border-emerald-900/10 bg-stone-50"
                  >
                    <picture>
                      <source media="(max-width: 767px)" srcSet={assets.mobileImage} />
                      <img
                        src={assets.image}
                        alt={direction.imageAlt}
                        loading="lazy"
                        className="h-56 w-full object-cover"
                      />
                    </picture>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-950">{direction.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {direction.description}
                      </p>
                      <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                        {direction.idealForLabel}: {direction.idealFor}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {assets.ingredients[locale].map((ingredient) => (
                          <li
                            key={ingredient}
                            className="border border-emerald-900/10 bg-white px-3 py-1.5 text-xs font-bold text-slate-700"
                          >
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
            <SectionHeading eyebrow={fragrance.processEyebrow} title={fragrance.processTitle} />
            <ol className="divide-y divide-emerald-900/10 border-y border-emerald-900/10">
              {fragrance.process.map((step, index) => (
                <li key={step} className="grid grid-cols-[3rem_1fr] gap-4 py-6">
                  <span className="text-sm font-bold text-emerald-700">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-base leading-relaxed text-slate-600">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-y border-emerald-900/10 bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="border border-emerald-900/10 bg-stone-50 p-5 sm:p-8">
              <SectionHeading
                eyebrow={fragrance.laboratoryEyebrow}
                title={fragrance.laboratoryTitle}
                description={fragrance.laboratoryDescription}
              />
              <details className="group mt-7 border-t border-emerald-900/10 pt-1">
                <summary className="flex min-h-12 cursor-pointer list-none items-center gap-2 py-3 font-bold text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">
                  <span className="group-open:hidden">{fragrance.showAllLabel}</span>
                  <span className="hidden group-open:inline">{fragrance.showLessLabel}</span>
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="grid gap-5 pb-2 pt-5 md:grid-cols-2">
                  <section className="border border-emerald-900/10 bg-white p-5 sm:p-6">
                    <h3 className="flex items-center gap-2 text-lg font-bold text-emerald-800">
                      <Droplet className="h-5 w-5" aria-hidden="true" />
                      {fragrance.essentialOilsTitle}
                    </h3>
                    <ul className="mt-5 grid gap-x-6 gap-y-3 text-sm text-slate-600 sm:grid-cols-2">
                      {(locale === 'ms' ? essentialOilsMs : essentialOils).map((oil) => (
                        <li key={oil}>{oil}</li>
                      ))}
                    </ul>
                  </section>
                  <section className="border border-amber-900/10 bg-white p-5 sm:p-6">
                    <h3 className="flex items-center gap-2 text-lg font-bold text-amber-800">
                      <TestTube className="h-5 w-5" aria-hidden="true" />
                      {fragrance.extractsTitle}
                    </h3>
                    <ul className="mt-5 grid gap-x-6 gap-y-3 text-sm text-slate-600 sm:grid-cols-2">
                      {(locale === 'ms' ? extractsMs : extracts).map((extract) => (
                        <li key={extract}>{extract}</li>
                      ))}
                    </ul>
                  </section>
                </div>
              </details>
            </div>
          </div>
        </section>

        <section className="bg-emerald-950 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-6 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-20 lg:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-200">
                {fragrance.scopeEyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-bold">{fragrance.scopeTitle}</h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-emerald-100">
                {fragrance.scopeDescription}
              </p>
            </div>
            <a
              href={getRoute(locale, 'contact').path}
              className="inline-flex min-h-12 w-fit items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-emerald-950 transition-colors hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:justify-self-end"
            >
              {fragrance.scopeLink.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}
