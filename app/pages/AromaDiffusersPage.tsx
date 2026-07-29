import { ArrowRight, ExternalLink } from 'lucide-react';
import SectionHeading from '../components/content/SectionHeading';
import type { Locale } from '../config/routes';
import { getRoute } from '../config/routes';
import { SITE } from '../config/site';
import { getContent } from '../content';
import {
  catalogGroups,
  diffuserMsCopy,
  diffusers,
  type Diffuser,
} from '../data/products';

const diffuserByModel = new Map(diffusers.map((diffuser) => [diffuser.model, diffuser]));

const groupLabels: Record<Locale, Record<Diffuser['mounting'], string>> = {
  en: {
    portable: 'Portable and vehicle formats',
    desktop: 'Desktop format',
    wall: 'Wall-mounted formats',
    hvac: 'HVAC-ready formats',
    freestanding: 'Freestanding formats',
    hanging: 'Hanging format',
  },
  ms: {
    portable: 'Bentuk mudah alih dan kenderaan',
    desktop: 'Bentuk atas meja',
    wall: 'Bentuk pemasangan dinding',
    hvac: 'Bentuk sedia HVAC',
    freestanding: 'Bentuk berdiri bebas',
    hanging: 'Bentuk gantung',
  },
};

const mountingLabels: Record<Locale, Record<Diffuser['mounting'], string>> = {
  en: {
    portable: 'Portable / vehicle',
    desktop: 'Desktop',
    wall: 'Wall-mounted',
    hvac: 'HVAC-ready',
    freestanding: 'Freestanding',
    hanging: 'Hanging',
  },
  ms: {
    portable: 'Mudah alih / kenderaan',
    desktop: 'Atas meja',
    wall: 'Dipasang pada dinding',
    hvac: 'Sedia HVAC',
    freestanding: 'Berdiri bebas',
    hanging: 'Gantung',
  },
};

const featureImageAlt: Record<Locale, string> = {
  en: 'Commercial aroma diffuser displayed with a fragrance oil bottle',
  ms: 'Diffuser aroma komersial dipamerkan bersama botol minyak wangian',
};

interface AromaDiffusersPageProps {
  locale: Locale;
}

export default function AromaDiffusersPage({ locale }: AromaDiffusersPageProps) {
  const { diffusers: page, nav } = getContent(locale);

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      <header className="bg-emerald-950 text-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-14 md:py-20 lg:px-8">
          <nav aria-label={nav.breadcrumbLabel} className="text-sm text-emerald-100">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <a
                  href={getRoute(locale, 'home').path}
                  className="rounded-sm hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  {nav.home}
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-white">
                {page.breadcrumb}
              </li>
            </ol>
          </nav>
          <div className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-200">
                {page.eyebrow}
              </p>
              <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                {page.title}
              </h1>
            </div>
            <p className="max-w-2xl text-lg leading-relaxed text-emerald-100">
              {page.introduction}
            </p>
          </div>
        </div>
      </header>

      <section className="border-b border-emerald-900/10 bg-stone-100 py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center lg:px-8">
          <div>
            <SectionHeading eyebrow={page.featuredEyebrow} title={page.featuredTitle} />
            <a
              href="#diffuser-catalogue"
              className="mt-7 inline-flex min-h-11 items-center gap-2 font-bold text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
            >
              {page.catalogueTitle}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <picture>
            <source media="(max-width: 767px)" srcSet="/assets/perfume-diffuser-feature-mobile.jpg" />
            <img
              src="/assets/perfume-diffuser-feature.jpg"
              alt={featureImageAlt[locale]}
              loading="lazy"
              className="min-h-72 w-full object-cover"
            />
          </picture>
        </div>
      </section>

      <section id="diffuser-catalogue" className="scroll-mt-24 py-14 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <SectionHeading eyebrow={page.catalogueEyebrow} title={page.catalogueTitle} />
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 font-bold text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
            >
              {page.facebookLink.label}
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-9 divide-y divide-emerald-900/10 border-y border-emerald-900/10">
            {catalogGroups.map((group) => (
              <details
                key={group.mounting}
                id={`catalogue-${group.mounting}`}
                className="scroll-mt-24 py-1"
                open
              >
                <summary className="cursor-pointer py-5 text-xl font-bold text-slate-950 marker:text-emerald-700">
                  {groupLabels[locale][group.mounting]}
                  <span className="ml-3 text-sm font-medium text-slate-500">
                    {group.modelIds.length} {page.modelsLabel}
                  </span>
                </summary>
                <div className="grid gap-4 pb-8 sm:grid-cols-2 lg:grid-cols-3">
                  {group.modelIds.map((modelId) => {
                    const diffuser = diffuserByModel.get(modelId);

                    if (!diffuser) return null;

                    const localizedCopy =
                      locale === 'ms' ? diffuserMsCopy[diffuser.model] : diffuser;

                    return (
                      <article
                        key={diffuser.model}
                        id={`catalogue-${diffuser.model.toLowerCase()}`}
                        className="scroll-mt-24 border border-emerald-900/10 bg-white p-5"
                      >
                        <h3 className="text-xl font-bold text-slate-950">{diffuser.model}</h3>
                        <dl className="mt-5 grid gap-3 border-y border-emerald-900/10 py-4 text-sm">
                          <div className="flex items-start justify-between gap-4">
                            <dt className="font-semibold text-slate-500">{page.coverageLabel}</dt>
                            <dd className="text-right font-bold text-slate-800">{diffuser.coverage}</dd>
                          </div>
                          {diffuser.capacity ? (
                            <div className="flex items-start justify-between gap-4">
                              <dt className="font-semibold text-slate-500">{page.capacityLabel}</dt>
                              <dd className="text-right font-bold text-slate-800">{diffuser.capacity}</dd>
                            </div>
                          ) : null}
                          <div className="flex items-start justify-between gap-4">
                            <dt className="font-semibold text-slate-500">{page.mountingLabel}</dt>
                            <dd className="text-right font-bold text-slate-800">
                              {mountingLabels[locale][diffuser.mounting]}
                            </dd>
                          </div>
                        </dl>
                        <ul className="mt-5 space-y-2 text-sm leading-relaxed text-slate-600">
                          {localizedCopy.features.map((feature) => (
                            <li key={feature} className="flex gap-2">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" aria-hidden="true" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-5 border-t border-emerald-900/10 pt-4 text-sm leading-relaxed text-slate-600">
                          <span className="font-bold text-slate-800">{page.suitableForLabel}:</span>{' '}
                          {localizedCopy.suitableFor}
                        </p>
                        <a
                          href={getRoute(locale, 'contact').path}
                          className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
                        >
                          {page.confirmLink.label}
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                      </article>
                    );
                  })}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
