import { ArrowRight } from 'lucide-react';
import type { Locale } from '../../config/routes';
import { getRoute } from '../../config/routes';
import type { ContactCtaContent } from '../../content';

interface ContactCtaProps {
  locale: Locale;
  content: ContactCtaContent;
  tone?: 'blue' | 'green';
}

export default function ContactCta({
  locale,
  content,
  tone = 'green',
}: ContactCtaProps) {
  const isBlue = tone === 'blue';
  const sectionColour = isBlue ? 'bg-blue-950' : 'bg-emerald-950';
  const eyebrowColour = isBlue ? 'text-blue-200' : 'text-emerald-200';
  const bodyColour = isBlue ? 'text-blue-100' : 'text-emerald-100';
  const buttonColour = isBlue ? 'text-blue-950 hover:bg-blue-100' : 'text-emerald-950 hover:bg-emerald-100';

  return (
    <section className={`${sectionColour} text-white`}>
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-14 sm:px-6 md:flex-row md:items-center md:justify-between md:py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className={`text-sm font-bold uppercase tracking-[0.16em] ${eyebrowColour}`}>
            {content.eyebrow}
          </p>
          <h2 className="mt-3 text-[1.9rem] font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl">
            {content.title}
          </h2>
          <p className={`mt-4 max-w-2xl text-base leading-relaxed ${bodyColour}`}>
            {content.description}
          </p>
        </div>
        <a
          href={getRoute(locale, 'contact').path}
          className={`inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] motion-safe:hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${buttonColour}`}
        >
          {content.link.label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
