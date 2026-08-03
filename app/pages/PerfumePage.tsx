import {
  ArrowRight,
  Check,
  Droplet,
  FlaskConical,
  MapPinned,
  Settings2,
  Sparkles,
  TestTube,
  Wind,
} from 'lucide-react';
import { MotionConfig, motion } from 'motion/react';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import DiffuserCatalogue from '../components/perfume/DiffuserCatalogue';
import {
  CustomFragranceDevelopment,
  ScentDirections,
} from '../components/perfume/FragranceSections';
import type { Locale } from '../config/routes';
import { getRoute } from '../config/routes';
import { getContent } from '../content';
import type { PerfumeCatalogGroupId } from '../data/perfumeCatalog';

const processIcons = [MapPinned, FlaskConical, Settings2, Sparkles] as const;
const serviceIcons = [Droplet, Wind, TestTube] as const;
const groupIds: PerfumeCatalogGroupId[] = ['small', 'medium', 'large'];

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

function openCatalogueGroup(groupId: PerfumeCatalogGroupId) {
  const target = document.getElementById(`catalogue-${groupId}`);
  if (!(target instanceof HTMLDetailsElement)) return;
  target.open = true;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
  target.querySelector('summary')?.focus({ preventScroll: true });
}

export default function PerfumePage({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const { perfume, fragrance, diffusers } = content;
  const contactRoute = getRoute(locale, 'contact');

  const services = [
    {
      title: fragrance.essentialOilsTitle,
      description: fragrance.laboratoryDescription,
    },
    {
      title: diffusers.title,
      description: diffusers.introduction,
    },
    {
      title: fragrance.title,
      description: fragrance.scopeDescription,
    },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-stone-50 pt-20">
        <header className="relative isolate overflow-hidden border-b border-emerald-950/10 bg-emerald-950 text-white">
          <picture className="absolute inset-0 -z-20 block">
            <source media="(max-width: 767px)" srcSet="/assets/perfume-aroma-hero-mobile.jpg" />
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
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-950 via-emerald-950/85 to-emerald-950/30" />
          <div className="mx-auto flex min-h-[34rem] max-w-7xl flex-col px-5 py-10 sm:px-6 sm:py-12 lg:px-8">
            <Breadcrumbs
              locale={locale}
              current={perfume.breadcrumb}
              className="text-sm text-emerald-100"
              tone="dark"
            />
            <div className="mt-auto grid gap-8 pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div className="max-w-3xl">
                <motion.p {...heroReveal(0.04)} className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-200">
                  {perfume.eyebrow}
                </motion.p>
                <motion.h1 {...heroReveal(0.14)} className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                  {perfume.title}
                </motion.h1>
                <motion.p {...heroReveal(0.24)} className="mt-5 max-w-2xl text-lg leading-relaxed text-emerald-100 md:text-xl">
                  {perfume.introduction}
                </motion.p>
                <motion.div {...heroReveal(0.34)} className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#perfume-recommendation"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-emerald-950 transition-[transform,background-color] motion-safe:hover:-translate-y-0.5 hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    {perfume.primaryLink.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href="#diffuser-catalogue"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-100/45 px-6 py-3 text-sm font-bold text-white transition-[transform,background-color] motion-safe:hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    {perfume.secondaryLink.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </motion.div>
              </div>
              <motion.div {...heroReveal(0.28)} className="border border-emerald-200/30 bg-emerald-950/85 p-6 sm:p-8">
                <Wind className="mb-5 h-9 w-9 text-emerald-200" aria-hidden="true" />
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-200">
                  {perfume.experience.systemEyebrow}
                </p>
                <h2 className="mt-2 text-xl font-bold sm:text-2xl">
                  {perfume.experience.systemTitle}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-emerald-100">
                  {perfume.experience.systemDescription}
                </p>
              </motion.div>
            </div>
          </div>
        </header>

        <section id="find-system" className="scroll-mt-24 bg-stone-100">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-24 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div className="max-w-xl">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
                  {perfume.experience.selectorEyebrow}
                </p>
                <h2 className="mt-3 text-[1.9rem] font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl md:text-4xl">
                  {perfume.experience.selectorTitle}
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-relaxed text-slate-600">
                {perfume.experience.selectorDescription}
              </p>
            </div>

            <div className="mt-9 grid gap-3 md:grid-cols-3 lg:mt-12">
              {perfume.spaces.map((space, index) => {
                const image = spaceImages[index];
                const groupId = groupIds[index];
                return (
                  <motion.button
                    key={space.title}
                    type="button"
                    onClick={() => openCatalogueGroup(groupId)}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: index * 0.07 }}
                    className={`group relative min-h-[24rem] overflow-hidden border border-emerald-950/10 text-left text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 sm:min-h-[28rem] ${index === 1 ? 'md:translate-y-10' : ''}`}
                  >
                    <picture className="absolute inset-0 block">
                      <source media="(max-width: 767px)" srcSet={image.mobileImage} />
                      <img
                        src={image.image}
                        alt={space.imageAlt}
                        width={1536}
                        height={1024}
                        loading="lazy"
                        decoding="async"
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.035]"
                      />
                    </picture>
                    <span className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/58 to-emerald-950/5" />
                    <span className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                      <span className="mb-10 flex items-center justify-between text-sm font-bold tracking-[0.12em] text-emerald-100">
                        <span>0{index + 1}</span>
                        <span>{space.range}</span>
                      </span>
                      <span className="block text-2xl font-bold leading-tight">{space.title}</span>
                      <span className="mt-3 block max-w-sm text-sm leading-relaxed text-emerald-50">{space.description}</span>
                      <span className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white">
                        {space.actionLabel}
                        <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-white">
          <div className="mx-auto grid max-w-7xl px-5 py-14 sm:px-6 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <picture className="block min-h-[28rem] overflow-hidden bg-stone-100 sm:min-h-[34rem]">
              <source media="(max-width: 767px)" srcSet="/assets/perfume-diffuser-feature-mobile.jpg" />
              <img
                src="/assets/perfume-diffuser-feature.jpg"
                alt={diffusers.featuredTitle}
                width={1122}
                height={1402}
                loading="lazy"
                decoding="async"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="h-full w-full object-cover"
              />
            </picture>
            <div className="bg-emerald-950 p-7 text-white sm:p-10 lg:p-14">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-200">
                {perfume.experience.featureEyebrow}
              </p>
              <h2 className="mt-3 max-w-xl text-[1.9rem] font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl">
                {perfume.experience.featureTitle}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-emerald-100">
                {perfume.experience.featureDescription}
              </p>
              <ul className="mt-8 space-y-4 border-y border-emerald-200/20 py-6">
                {perfume.experience.featurePoints.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-emerald-50">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-6 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <div>
              <picture className="block overflow-hidden">
                <source media="(max-width: 767px)" srcSet="/assets/perfume-development-mobile.jpg" />
                <img
                  src="/assets/perfume-development.jpg"
                  alt={fragrance.heroImageAlt}
                  width={1536}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="min-h-80 w-full object-cover"
                />
              </picture>
            </div>
            <div className="lg:pl-8">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
                {perfume.experience.aboutEyebrow}
              </p>
              <h2 className="mt-3 text-[1.9rem] font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl md:text-4xl">
                {perfume.experience.aboutTitle}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
                {perfume.experience.aboutDescription}
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-emerald-900/10 bg-stone-50 py-14 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">{perfume.processEyebrow}</p>
              <h2 className="mt-3 text-[1.9rem] font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl md:text-4xl">{perfume.processTitle}</h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600">{perfume.processDescription}</p>
              <picture className="mt-8 block overflow-hidden">
                <source media="(max-width: 767px)" srcSet="/assets/perfume-service-refill-mobile.jpg" />
                <img
                  src="/assets/perfume-service-refill.jpg"
                  alt={perfume.programmeImageAlt}
                  width={1536}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 35vw, 100vw"
                  className="h-72 w-full object-cover"
                />
              </picture>
            </div>
            <ol className="divide-y divide-emerald-900/10 border-y border-emerald-900/10">
              {perfume.process.map((step, index) => {
                const Icon = processIcons[index];
                return (
                  <li key={step.title} className="grid grid-cols-[3rem_1fr] gap-4 py-6">
                    <span className="text-sm font-bold text-emerald-700">{String(index + 1).padStart(2, '0')}</span>
                    <div className="flex gap-4">
                      <Icon className="mt-0.5 h-6 w-6 shrink-0 text-emerald-700" aria-hidden="true" />
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

        <ScentDirections locale={locale} />

        <section className="bg-emerald-900 text-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-6 md:grid-cols-3 md:py-12 lg:px-8">
            {services.map((service, index) => {
              const Icon = serviceIcons[index];
              return (
                <div key={service.title} className="border-t border-emerald-400/45 pt-5">
                  <Icon className="mb-5 h-7 w-7 text-emerald-200" aria-hidden="true" />
                  <h2 className="text-xl font-bold">{service.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-emerald-100">{service.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <CustomFragranceDevelopment locale={locale} />
        <DiffuserCatalogue locale={locale} />

        <section id="perfume-recommendation" className="relative isolate scroll-mt-24 overflow-hidden bg-emerald-950 text-white">
          <picture className="absolute inset-0 -z-20 block">
            <source media="(max-width: 767px)" srcSet="/assets/perfume-space-hospitality-mobile.jpg" />
            <img
              src="/assets/perfume-space-hospitality.jpg"
              alt={perfume.closingImageAlt}
              width={1536}
              height={1024}
              loading="lazy"
              decoding="async"
              sizes="100vw"
              className="h-full w-full object-cover"
            />
          </picture>
          <div className="absolute inset-0 -z-10 bg-emerald-950/85" />
          <div className="mx-auto flex min-h-[27rem] max-w-7xl items-end px-5 py-14 sm:px-6 md:min-h-[31rem] md:py-20 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-200">{perfume.contactCta.eyebrow}</p>
              <h2 className="mt-3 text-[2rem] font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">{perfume.contactCta.title}</h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-emerald-100 sm:text-lg">{perfume.contactCta.description}</p>
              <a
                href={contactRoute.path}
                className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-emerald-950 transition-[transform,background-color] motion-safe:hover:-translate-y-0.5 hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {perfume.contactCta.link.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}
