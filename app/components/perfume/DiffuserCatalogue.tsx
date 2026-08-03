import { ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import type { Locale } from '../../config/routes';
import { SITE } from '../../config/site';
import { getContent } from '../../content';
import { perfumeCatalogGroups, type PerfumeCatalogGroupId } from '../../data/perfumeCatalog';
import { diffuserMsCopy, diffusers, type Diffuser } from '../../data/products';
import SectionHeading from '../content/SectionHeading';

const diffuserByModel = new Map(diffusers.map((diffuser) => [diffuser.model, diffuser]));

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

const featured = [
  {
    model: 'MF120A',
    groupId: 'small',
    image: '/assets/diffuser-small-collection.jpg',
    alt: {
      en: 'MF120A desktop aroma diffuser in silver, rose gold, and black finishes',
      ms: 'Diffuser aroma atas meja MF120A dalam kemasan perak, emas ros, dan hitam',
    },
  },
  {
    model: 'MF300R',
    groupId: 'medium',
    image: '/assets/diffuser-medium-collection.jpg',
    alt: {
      en: 'MF300R commercial aroma diffuser',
      ms: 'Diffuser aroma komersial MF300R',
    },
  },
  {
    model: 'MS3000R',
    groupId: 'large',
    image: '/assets/diffuser-large-collection.jpg',
    alt: {
      en: 'MS3000R freestanding aroma diffuser in multiple finishes',
      ms: 'Diffuser aroma berdiri bebas MS3000R dalam beberapa kemasan',
    },
  },
] as const;

function openGroup(groupId: PerfumeCatalogGroupId) {
  const target = document.getElementById(`catalogue-${groupId}`);
  if (!(target instanceof HTMLDetailsElement)) return;
  target.open = true;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
  target.querySelector('summary')?.focus({ preventScroll: true });
}

export default function DiffuserCatalogue({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const { diffusers: page, perfume } = content;

  return (
    <>
      <section className="bg-stone-100 py-14 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <SectionHeading eyebrow={page.featuredEyebrow} title={page.featuredTitle} />
            <p className="max-w-2xl text-base leading-relaxed text-slate-600">
              {page.introduction}
            </p>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-12">
            {featured.map((item, index) => {
              const diffuser = diffuserByModel.get(item.model);
              if (!diffuser) return null;

              return (
                <motion.article
                  key={item.model}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  className={`overflow-hidden border border-emerald-950/10 bg-white ${
                    index === 0 ? 'lg:col-span-5' : index === 1 ? 'lg:col-span-3' : 'lg:col-span-4'
                  }`}
                >
                  <div className="bg-stone-50 p-5 sm:p-7">
                    <img
                      src={item.image}
                      alt={item.alt[locale]}
                      width={900}
                      height={700}
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="h-60 w-full object-contain mix-blend-multiply"
                    />
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
                          {perfume.spaces[index].title}
                        </p>
                        <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                          {diffuser.model}
                        </p>
                      </div>
                      <span className="shrink-0 border border-emerald-900/10 px-2 py-1 text-xs font-bold text-emerald-800">
                        {diffuser.coverage}
                      </span>
                    </div>
                    <div className="mt-5 flex items-center justify-between gap-4 border-t border-emerald-900/10 pt-4">
                      <span className="text-sm font-bold text-slate-700">
                        {diffuser.capacity ?? mountingLabels[locale][diffuser.mounting]}
                      </span>
                      <button
                        type="button"
                        onClick={() => openGroup(item.groupId)}
                        className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-emerald-800 transition-colors hover:text-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
                      >
                        {perfume.spaces[index].actionLabel}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="diffuser-catalogue" className="scroll-mt-24 bg-stone-50 py-14 sm:py-24">
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
            {perfumeCatalogGroups.map((group, groupIndex) => (
              <details
                key={group.id}
                id={`catalogue-${group.id}`}
                className="scroll-mt-24 py-1"
              >
                <summary className="cursor-pointer py-5 text-xl font-bold text-slate-950 marker:text-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">
                  {perfume.spaces[groupIndex].title}
                  <span className="ml-3 text-sm font-medium text-slate-500">
                    {perfume.spaces[groupIndex].range} · {group.modelIds.length} {page.modelsLabel}
                  </span>
                </summary>
                <div className="grid gap-4 pb-8 sm:grid-cols-2 lg:grid-cols-3">
                  {group.modelIds.map((modelId) => {
                    const diffuser = diffuserByModel.get(modelId);
                    if (!diffuser) return null;
                    const localizedCopy = locale === 'ms' ? diffuserMsCopy[diffuser.model] : diffuser;

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
                      </article>
                    );
                  })}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
