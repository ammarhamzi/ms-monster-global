import { ArrowRight, Compass, Flag, MapPin, ShieldCheck, Target } from 'lucide-react';
import { MotionConfig, motion } from 'motion/react';
import ContactCta from '../components/content/ContactCta';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import SectionHeading from '../components/content/SectionHeading';
import type { Locale } from '../config/routes';
import { getRoute } from '../config/routes';
import { SITE } from '../config/site';
import { getContent } from '../content';

const principleIcons = [Compass, Target, Flag] as const;

const address = [
  SITE.address.streetAddress,
  `${SITE.address.postalCode} ${SITE.address.addressLocality}`,
  SITE.address.addressRegion,
  'Malaysia',
].join(', ');

interface AboutPageProps {
  locale: Locale;
}

export default function AboutPage({ locale }: AboutPageProps) {
  const { about } = getContent(locale);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-white pt-20">
        <header className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
            <Breadcrumbs
              locale={locale}
              current={about.breadcrumb}
              className="mb-7 text-sm text-slate-500"
            />
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl"
            >
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
                {about.eyebrow}
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
                {about.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
                {about.introduction}
              </p>
            </motion.div>
          </div>
        </header>

        <section className="py-14 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:px-8">
            <div className="bg-slate-950 p-7 text-white sm:p-9">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">
                {about.companyEyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-bold">{about.companyTitle}</h2>
              <dl className="mt-8 space-y-7">
                <div>
                  <dt className="text-sm font-semibold text-slate-400">
                    {about.registrationLabel}
                  </dt>
                  <dd className="mt-2 font-semibold text-white">{SITE.registrationNumber}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 text-sm font-semibold text-slate-400">
                    <MapPin className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                    {about.addressLabel}
                  </dt>
                  <dd className="mt-2 leading-relaxed text-slate-200">{address}</dd>
                </div>
              </dl>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
                {about.incorporationEyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl">
                {about.incorporationTitle}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                {about.incorporation}
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-14 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow={about.principlesEyebrow}
              title={about.principlesTitle}
            />
            <div className="mt-10 grid gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-3">
              {about.principles.map((principle, index) => {
                const Icon = principleIcons[index];

                return (
                  <motion.article
                    key={principle.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: index * 0.07 }}
                    className="bg-white p-6 sm:p-8"
                  >
                    <Icon className="h-8 w-8 text-emerald-700" aria-hidden="true" />
                    <h3 className="mt-6 text-xl font-bold text-slate-950">
                      {principle.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {principle.description}
                    </p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow={about.historyEyebrow}
              title={about.historyTitle}
              tone="blue"
            />
            <ol className="mt-10 grid gap-5 md:grid-cols-3">
              {about.history.map((item, index) => (
                <motion.li
                  key={item.year}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.07 }}
                  className="border-t-2 border-blue-800 bg-slate-50 p-6 sm:p-7"
                >
                  <h3 className="text-3xl font-extrabold text-blue-800">{item.year}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.text}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-950 py-14 text-white sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 md:grid-cols-[0.7fr_1.3fr] md:items-center lg:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">
                {about.valuesEyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-bold">{about.valuesTitle}</h2>
            </div>
            <ul className="flex flex-wrap gap-3">
              {about.values.map((value) => (
                <li
                  key={value}
                  className="border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-200"
                >
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-14 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow={about.divisionsEyebrow}
              title={about.divisionsTitle}
            />
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {about.divisions.map((division) => (
                <article key={division.key} className="border border-slate-200 p-6 sm:p-8">
                  <ShieldCheck
                    className={`h-8 w-8 ${
                      division.key === 'aroma' ? 'text-emerald-700' : 'text-blue-700'
                    }`}
                    aria-hidden="true"
                  />
                  <h3 className="mt-6 text-2xl font-bold text-slate-950">{division.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">
                    {division.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {division.items.map((item) => (
                      <li
                        key={item}
                        className="bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={getRoute(locale, division.key).path}
                    className={`mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
                      division.key === 'aroma'
                        ? 'text-emerald-800 focus-visible:outline-emerald-700'
                        : 'text-blue-800 focus-visible:outline-blue-700'
                    }`}
                  >
                    {division.link.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ContactCta locale={locale} content={about.contactCta} />
      </div>
    </MotionConfig>
  );
}
