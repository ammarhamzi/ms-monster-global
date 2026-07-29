import { MotionConfig, motion } from 'motion/react';
import {
  Activity,
  CloudCog,
  DatabaseBackup,
  HardDrive,
  Headset,
  Network,
  Wrench,
} from 'lucide-react';
import ContactCta from '../components/content/ContactCta';
import SectionHeading from '../components/content/SectionHeading';
import type { Locale } from '../config/routes';
import { getRoute } from '../config/routes';
import { getContent } from '../content';

const serviceIcons = [
  Activity,
  HardDrive,
  Network,
  Wrench,
  DatabaseBackup,
  CloudCog,
  Headset,
];

const heroReveal = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] as const },
});

interface ItMaintenancePageProps {
  locale: Locale;
}

export default function ItMaintenancePage({ locale }: ItMaintenancePageProps) {
  const { it } = getContent(locale);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-slate-50 pt-20">
        <section className="relative isolate overflow-hidden bg-blue-950 text-white">
          <picture className="absolute inset-0 -z-20 block">
            <source media="(max-width: 767px)" srcSet="/assets/it-infrastructure-hero-mobile.jpg" />
            <img
              src="/assets/it-infrastructure-hero.jpg"
              alt={it.heroImageAlt}
              fetchPriority="high"
              sizes="100vw"
              className="h-full w-full object-cover"
            />
          </picture>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-950 via-blue-950/85 to-blue-950/25" />
          <div className="mx-auto grid min-h-[31rem] max-w-7xl gap-8 px-5 py-12 sm:min-h-[34rem] sm:px-6 sm:py-16 md:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:px-8">
            <div className="max-w-3xl">
              <motion.p {...heroReveal(0.04)} className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-blue-200">
                {it.eyebrow}
              </motion.p>
              <motion.h1 {...heroReveal(0.14)} className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                {it.title}
              </motion.h1>
              <motion.p {...heroReveal(0.24)} className="mt-5 max-w-2xl text-lg leading-relaxed text-blue-100 md:mt-6 md:text-xl">
                {it.introduction}
              </motion.p>
              <motion.div {...heroReveal(0.34)}>
                <a
                  href={getRoute(locale, 'contact').path}
                  className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-bold text-blue-950 transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] motion-safe:hover:-translate-y-0.5 hover:bg-blue-100 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:mt-9 sm:w-auto"
                >
                  {it.primaryLink.label}
                </a>
              </motion.div>
            </div>
            <motion.div {...heroReveal(0.28)} className="border border-blue-200/30 bg-blue-950/85 p-6 sm:p-8">
              <CloudCog className="mb-4 h-8 w-8 text-blue-200 sm:mb-6 sm:h-10 sm:w-10" aria-hidden="true" />
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-200">
                {it.infrastructureEyebrow}
              </p>
              <h2 className="mt-3 text-xl font-bold sm:text-2xl">{it.infrastructureTitle}</h2>
              <p className="mt-2 text-base leading-relaxed text-blue-100 md:mt-3">
                {it.infrastructureDescription}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-24 lg:px-8">
          <SectionHeading eyebrow={it.servicesEyebrow} title={it.servicesTitle} tone="blue" />
          <div className="mt-10 grid gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
            {it.services.map((service, index) => {
              const Icon = serviceIcons[index];

              return (
                <article
                  key={service.title}
                  className="bg-white p-5 sm:p-6 md:p-8"
                >
                  <Icon className="mb-5 h-8 w-8 text-blue-700 sm:mb-7" aria-hidden="true" />
                  <h3 className="text-xl font-bold text-slate-950">{service.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-sm">{service.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <ContactCta locale={locale} content={it.contactCta} tone="blue" />
      </div>
    </MotionConfig>
  );
}
