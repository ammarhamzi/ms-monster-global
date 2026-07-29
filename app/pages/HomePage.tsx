import { ArrowRight, Building2, FileText, MapPin, ShieldCheck } from 'lucide-react';
import { MotionConfig, motion } from 'motion/react';
import ContactCta from '../components/content/ContactCta';
import SectionHeading from '../components/content/SectionHeading';
import HeroBackgroundPaths from '../components/HeroBackgroundPaths';
import type { Locale } from '../config/routes';
import { getRoute } from '../config/routes';
import { getContent } from '../content';

const heroEase = [0.22, 1, 0.36, 1] as const;

const heroReveal = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.68, delay, ease: heroEase },
});

const divisionImages = {
  perfume: {
    image: '/assets/perfume-aroma-hero.jpg',
    mobileImage: '/assets/perfume-aroma-hero-mobile.jpg',
    width: 1695,
    height: 928,
  },
  it: {
    image: '/assets/it-infrastructure-hero.jpg',
    mobileImage: '/assets/it-infrastructure-hero-mobile.jpg',
    width: 1727,
    height: 911,
  },
} as const;

interface HomePageProps {
  locale: Locale;
}

export default function HomePage({ locale }: HomePageProps) {
  const { home } = getContent(locale);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-white">
        <section className="relative overflow-hidden bg-gray-50 pb-16 pt-28 sm:pb-24 sm:pt-32">
          <div className="absolute inset-0 z-0">
            <HeroBackgroundPaths />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <motion.p
                {...heroReveal(0.08)}
                className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-emerald-700"
              >
                {home.eyebrow}
              </motion.p>
              <motion.h1
                {...heroReveal(0.2)}
                className="max-w-4xl text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-slate-950 sm:text-5xl md:text-7xl"
              >
                {home.title}
              </motion.h1>
              <motion.p
                {...heroReveal(0.32)}
                className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 sm:mt-8 sm:text-xl md:text-2xl"
              >
                {home.introduction}
              </motion.p>
              <motion.div
                {...heroReveal(0.44)}
                className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:gap-4"
              >
                <a
                  href={getRoute(locale, 'perfume').path}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-800 px-6 py-3 text-sm font-bold text-white shadow-sm transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] motion-safe:hover:-translate-y-0.5 hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
                >
                  {home.perfumeLink.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={getRoute(locale, 'it').path}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue-950 px-6 py-3 text-sm font-bold text-white shadow-sm transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] motion-safe:hover:-translate-y-0.5 hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-950"
                >
                  {home.itLink.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow={home.overviewEyebrow}
              title={home.overviewTitle}
              description={home.overviewDescription}
            />
            <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
              {home.divisions.map((division, index) => {
                const images = divisionImages[division.key];
                const routeKey = division.key;

                return (
                  <motion.article
                    key={division.key}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08, ease: heroEase }}
                    className="overflow-hidden border border-slate-200 bg-slate-50"
                  >
                    <picture>
                      <source media="(max-width: 767px)" srcSet={images.mobileImage} />
                      <img
                        src={images.image}
                        alt={division.imageAlt}
                        width={images.width}
                        height={images.height}
                        loading="lazy"
                        decoding="async"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="h-56 w-full object-cover sm:h-64"
                      />
                    </picture>
                    <div className="p-6 sm:p-8">
                      <h3 className="text-2xl font-bold text-slate-950">{division.title}</h3>
                      <p className="mt-4 text-base leading-relaxed text-slate-600">
                        {division.description}
                      </p>
                      <ul className="mt-6 space-y-3">
                        {division.items.map((item) => (
                          <li key={item} className="flex gap-3 text-sm font-medium text-slate-700">
                            <ShieldCheck
                              className={`mt-0.5 h-4 w-4 shrink-0 ${
                                division.key === 'perfume' ? 'text-emerald-700' : 'text-blue-700'
                              }`}
                              aria-hidden="true"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <a
                        href={getRoute(locale, routeKey).path}
                        className={`mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
                          division.key === 'perfume'
                            ? 'text-emerald-800 focus-visible:outline-emerald-700'
                            : 'text-blue-800 focus-visible:outline-blue-700'
                        }`}
                      >
                        {division.link.label}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-14 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 lg:px-8">
            <SectionHeading
              eyebrow={home.operationsEyebrow}
              title={home.operationsTitle}
              description={home.operationsDescription}
              tone="blue"
            />
            <ul className="grid gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-2">
              {home.operationsItems.map((item, index) => {
                const icons = [Building2, MapPin, ShieldCheck, FileText] as const;
                const Icon = icons[index];

                return (
                  <li key={item} className="bg-white p-6 sm:p-7">
                    <Icon className="h-6 w-6 text-blue-700" aria-hidden="true" />
                    <p className="mt-4 font-semibold leading-relaxed text-slate-900">{item}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <ContactCta locale={locale} content={home.contactCta} tone="blue" />
      </div>
    </MotionConfig>
  );
}
