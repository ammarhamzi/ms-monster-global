import { Check, FlaskConical, MapPinned, Settings2, Sparkles } from 'lucide-react';
import { MotionConfig, motion } from 'motion/react';
import ContactCta from '../components/content/ContactCta';
import SectionHeading from '../components/content/SectionHeading';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import DiffuserCatalogue from '../components/perfume/DiffuserCatalogue';
import {
  CustomFragranceDevelopment,
  ScentDirections,
} from '../components/perfume/FragranceSections';
import type { Locale } from '../config/routes';
import { getContent } from '../content';

const processIcons = [MapPinned, FlaskConical, Settings2, Sparkles] as const;

const spaceImages = [
  {
    image: '/assets/perfume-space-boutique.jpg',
    mobileImage: '/assets/perfume-space-boutique-mobile.jpg',
  },
  {
    image: '/assets/perfume-space-office.jpg',
    mobileImage: '/assets/perfume-space-office-mobile.jpg',
  },
  {
    image: '/assets/perfume-space-hospitality.jpg',
    mobileImage: '/assets/perfume-space-hospitality-mobile.jpg',
  },
] as const;

const heroReveal = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function PerfumePage({ locale }: { locale: Locale }) {
  const { perfume } = getContent(locale);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-stone-50 pt-20">
        <header className="relative isolate overflow-hidden bg-emerald-950 text-white">
          <picture className="absolute inset-0 -z-20 block">
            <source
              media="(max-width: 767px)"
              srcSet="/assets/perfume-aroma-hero-mobile.jpg"
            />
            <img
              src="/assets/perfume-aroma-hero.jpg"
              alt={perfume.heroImageAlt}
              width={1695}
              height={928}
              fetchPriority="high"
              decoding="async"
              sizes="100vw"
              className="h-full w-full object-cover"
            />
          </picture>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-950 via-emerald-950/90 to-emerald-950/35" />
          <div className="mx-auto flex min-h-[31rem] max-w-7xl flex-col px-5 py-10 sm:min-h-[34rem] sm:px-6 sm:py-12 lg:px-8">
            <Breadcrumbs
              locale={locale}
              current={perfume.breadcrumb}
              className="text-sm text-emerald-100"
              tone="dark"
            />
            <div className="mt-auto max-w-3xl pt-16">
              <motion.p
                {...heroReveal(0.04)}
                className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-200"
              >
                {perfume.eyebrow}
              </motion.p>
              <motion.h1
                {...heroReveal(0.14)}
                className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
              >
                {perfume.title}
              </motion.h1>
              <motion.p
                {...heroReveal(0.24)}
                className="mt-5 max-w-2xl text-lg leading-relaxed text-emerald-100 md:text-xl"
              >
                {perfume.introduction}
              </motion.p>
              <motion.div
                {...heroReveal(0.34)}
                className="mt-8 flex flex-wrap gap-3"
              >
                <a
                  href="#perfume-recommendation"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-bold text-emerald-950 transition-colors hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  {perfume.primaryLink.label}
                </a>
                <a
                  href="#diffuser-catalogue"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-emerald-100/45 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  {perfume.secondaryLink.label}
                </a>
              </motion.div>
            </div>
          </div>
        </header>

        <section className="border-b border-emerald-900/10 bg-stone-100 py-14 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow={perfume.assessmentEyebrow}
              title={perfume.assessmentTitle}
              description={perfume.assessmentDescription}
            />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {perfume.spaces.map((space, index) => {
                const image = spaceImages[index];

                return (
                  <motion.article
                    key={space.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: index * 0.07 }}
                    className="relative min-h-[25rem] overflow-hidden text-white"
                  >
                    <picture className="absolute inset-0 block">
                      <source
                        media="(max-width: 767px)"
                        srcSet={image.mobileImage}
                      />
                      <img
                        src={image.image}
                        alt={space.imageAlt}
                        width={1536}
                        height={1024}
                        loading="lazy"
                        decoding="async"
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="h-full w-full object-cover"
                      />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/55 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="text-2xl font-bold">{space.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-emerald-50">
                        {space.description}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
            <SectionHeading
              eyebrow={perfume.processEyebrow}
              title={perfume.processTitle}
              description={perfume.processDescription}
            />
            <ol className="divide-y divide-emerald-900/10 border-y border-emerald-900/10">
              {perfume.process.map((step, index) => {
                const Icon = processIcons[index];

                return (
                  <li
                    key={step.title}
                    className="grid grid-cols-[3rem_1fr] gap-4 py-6"
                  >
                    <span className="text-sm font-bold text-emerald-700">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex gap-4">
                      <Icon
                        className="mt-0.5 h-6 w-6 shrink-0 text-emerald-700"
                        aria-hidden="true"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-slate-950">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section className="border-y border-emerald-900/10 bg-white py-14 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 md:grid-cols-2 md:items-center lg:px-8">
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet="/assets/perfume-service-refill-mobile.jpg"
              />
              <img
                src="/assets/perfume-service-refill.jpg"
                alt={perfume.programmeImageAlt}
                width={1536}
                height={1024}
                loading="lazy"
                decoding="async"
                sizes="(min-width: 768px) 50vw, 100vw"
                className="h-full min-h-72 w-full object-cover"
              />
            </picture>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
                {perfume.programmeEyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                {perfume.programmeTitle}
              </h2>
              <ul className="mt-7 space-y-4">
                {perfume.programmeItems.map((item) => (
                  <li key={item} className="flex gap-3 text-slate-600">
                    <Check
                      className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <ScentDirections locale={locale} />
        <DiffuserCatalogue locale={locale} />
        <CustomFragranceDevelopment locale={locale} />

        <div id="perfume-recommendation" className="scroll-mt-24">
          <ContactCta locale={locale} content={perfume.contactCta} />
        </div>
      </div>
    </MotionConfig>
  );
}
