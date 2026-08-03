import { useState } from 'react';
import { ChevronDown, Droplet, TestTube } from 'lucide-react';
import { motion } from 'motion/react';
import SectionHeading from '../content/SectionHeading';
import type { Locale } from '../../config/routes';
import { getContent } from '../../content';
import {
  essentialOils,
  essentialOilsMs,
  extracts,
  extractsMs,
} from '../../data/products';

const directionAssets = [
  {
    image: '/assets/scent-fresh.jpg',
    mobileImage: '/assets/scent-fresh-mobile.jpg',
    width: 1814,
    height: 867,
    ingredients: {
      en: ['Grapefruit', 'Lemon', 'Peppermint Oil'],
      ms: ['Limau gedang', 'Limau lemon', 'Minyak Pudina'],
    },
  },
  {
    image: '/assets/scent-floral.jpg',
    mobileImage: '/assets/scent-floral-mobile.jpg',
    width: 1718,
    height: 916,
    ingredients: {
      en: ['Jasmine Absolute Oil', 'Rose Absolute Oil', 'Bois De Rose Oil'],
      ms: ['Minyak Absolut Melur', 'Minyak Absolut Mawar', 'Minyak Bois de Rose'],
    },
  },
  {
    image: '/assets/scent-woody.jpg',
    mobileImage: '/assets/scent-woody-mobile.jpg',
    width: 1717,
    height: 916,
    ingredients: {
      en: ['Cedarwood Virginian Oil', 'Cypress Oil', 'Sandalwood Oil'],
      ms: ['Minyak Kayu Cedar Virginia', 'Minyak Sipres', 'Minyak Kayu Cendana'],
    },
  },
] as const;

export function ScentDirections({ locale }: { locale: Locale }) {
  const { fragrance } = getContent(locale);
  const [activeDirection, setActiveDirection] = useState(0);
  const directionColors = ['text-lime-800', 'text-rose-800', 'text-amber-900'];

  return (
    <section className="border-y border-emerald-900/10 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20 lg:px-8">
        <SectionHeading
          eyebrow={fragrance.directionsEyebrow}
          title={fragrance.directionsTitle}
          description={fragrance.introduction}
        />
        <div
          role="tablist"
          aria-label={fragrance.directionsEyebrow}
          className="mt-7 grid grid-cols-3 gap-1 rounded-lg border border-emerald-900/10 bg-stone-50 p-1 md:hidden"
        >
          {fragrance.directions.map((direction, index) => (
            <button
              key={direction.title}
              type="button"
              role="tab"
              aria-selected={activeDirection === index}
              aria-controls={`scent-panel-${index}`}
              onClick={() => setActiveDirection(index)}
              className={`min-h-12 rounded-md px-2 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${
                activeDirection === index
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white hover:text-slate-950'
              }`}
            >
              {direction.title}
            </button>
          ))}
        </div>
        <ol className="mt-5 overflow-hidden rounded-2xl border border-emerald-900/10 bg-white shadow-sm md:mt-10 md:rounded-none md:shadow-none">
          {fragrance.directions.map((direction, index) => {
            const assets = directionAssets[index];

            return (
              <motion.li
                key={direction.title}
                id={`scent-panel-${index}`}
                role="tabpanel"
                aria-label={direction.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.42, delay: index * 0.06 }}
                className={`${activeDirection === index ? 'grid' : 'hidden md:grid'} border-b border-emerald-900/10 last:border-b-0 md:grid-cols-2`}
              >
                <div className={`flex min-h-0 flex-col justify-center p-6 sm:p-10 md:min-h-72 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <p className="mb-4 text-sm font-bold tracking-[0.16em] text-slate-400">0{index + 1}</p>
                  <h3 className={`text-xl font-bold ${directionColors[index]}`}>{direction.title}</h3>
                  <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-600 md:text-sm">
                    {direction.description}
                  </p>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                    {direction.idealForLabel}: {direction.idealFor}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {assets.ingredients[locale].map((ingredient) => (
                      <li key={ingredient} className="border border-emerald-900/10 bg-stone-50 px-3 py-1.5 text-xs font-bold text-slate-700">
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
                <picture className={`order-first block md:order-none ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <source
                    media="(max-width: 767px)"
                    srcSet={assets.mobileImage}
                  />
                  <img
                    src={assets.image}
                    alt={direction.imageAlt}
                    width={assets.width}
                    height={assets.height}
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="h-56 w-full object-cover sm:h-64 md:h-full"
                  />
                </picture>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export function CustomFragranceDevelopment({ locale }: { locale: Locale }) {
  const { fragrance } = getContent(locale);

  return (
    <section id="custom-fragrance" className="scroll-mt-24 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-6 sm:py-24 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
        <SectionHeading
          eyebrow={fragrance.processEyebrow}
          title={fragrance.processTitle}
        />
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

      <div className="border-y border-emerald-900/10 bg-stone-100 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="border border-emerald-900/10 bg-white p-5 sm:p-8">
            <SectionHeading
              eyebrow={fragrance.laboratoryEyebrow}
              title={fragrance.laboratoryTitle}
              description={fragrance.laboratoryDescription}
            />
            <details className="group mt-7 border-t border-emerald-900/10 pt-1" open>
              <summary className="flex min-h-12 cursor-pointer list-none items-center gap-2 py-3 font-bold text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">
                <span className="group-open:hidden">{fragrance.showAllLabel}</span>
                <span className="hidden group-open:inline">
                  {fragrance.showLessLabel}
                </span>
                <ChevronDown
                  className="h-4 w-4 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="grid gap-5 pb-2 pt-5 md:grid-cols-2">
                <section className="border border-emerald-900/10 bg-stone-50 p-5 sm:p-6">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-emerald-800">
                    <Droplet className="h-5 w-5" aria-hidden="true" />
                    {fragrance.essentialOilsTitle}
                  </h3>
                  <ul className="mt-5 grid gap-x-6 gap-y-3 text-sm text-slate-600 sm:grid-cols-2">
                    {(locale === 'ms' ? essentialOilsMs : essentialOils).map(
                      (oil) => <li key={oil}>{oil}</li>,
                    )}
                  </ul>
                </section>
                <section className="border border-amber-900/10 bg-stone-50 p-5 sm:p-6">
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
      </div>

      <div className="bg-emerald-950 text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-200">
            {fragrance.scopeEyebrow}
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold">
            {fragrance.scopeTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-emerald-100">
            {fragrance.scopeDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
