import { CheckCircle2 } from 'lucide-react';
import ContactCta from '../components/content/ContactCta';
import SectionHeading from '../components/content/SectionHeading';
import DownloadCard from '../components/downloads/DownloadCard';
import type { Locale } from '../config/routes';
import { getRoute } from '../config/routes';
import { getContent } from '../content';

interface DownloadsPageProps {
  locale: Locale;
}

export default function DownloadsPage({ locale }: DownloadsPageProps) {
  const { downloads, nav } = getContent(locale);

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <header className="bg-blue-950 text-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
          <nav aria-label={nav.breadcrumbLabel} className="mb-7 text-sm text-blue-200">
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
                {downloads.breadcrumb}
              </li>
            </ol>
          </nav>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-200">
            {downloads.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            {downloads.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-blue-100">
            {downloads.introduction}
          </p>
        </div>
      </header>

      <section className="py-14 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={downloads.documentsEyebrow}
            title={downloads.documentsTitle}
            tone="blue"
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {downloads.documents.map((document) => (
              <div key={document.href}>
                <DownloadCard
                  document={document}
                  openLabel={downloads.openLabel}
                  downloadLabel={downloads.downloadLabel}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-9 px-5 sm:px-6 md:grid-cols-[1fr_0.8fr] md:items-start lg:px-8">
          <SectionHeading
            eyebrow={downloads.guidanceEyebrow}
            title={downloads.guidanceTitle}
            description={downloads.guidanceDescription}
          />
          <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
            {downloads.guidanceItems.map((item) => (
              <li
                key={item}
                className="flex min-h-14 items-center gap-3 border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCta locale={locale} content={downloads.contactCta} tone="blue" />
    </div>
  );
}
