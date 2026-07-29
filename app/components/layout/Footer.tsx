import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import {
  getLocaleForPath,
  getRoute,
  type PageKey,
} from '../../config/routes';
import { SITE } from '../../config/site';
import { getContent } from '../../content';

const companyKeys: PageKey[] = ['home', 'about', 'downloads', 'contact'];
const serviceKeys: PageKey[] = ['aroma', 'diffusers', 'fragrance', 'it'];

export default function Footer() {
  const { pathname } = useLocation();
  const locale = getLocaleForPath(pathname);
  const { footer, nav } = getContent(locale);
  const address = [
    SITE.address.streetAddress,
    `${SITE.address.postalCode} ${SITE.address.addressLocality}`,
    SITE.address.addressRegion,
    'Malaysia',
  ].join(', ');

  function renderLinks(keys: PageKey[]) {
    return keys.map((key) => {
      const route = getRoute(locale, key);

      return (
        <Link
          key={route.id}
          to={route.path}
          className="flex min-h-11 items-center rounded-sm text-sm text-slate-400 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {nav[key]}
        </Link>
      );
    });
  }

  return (
    <footer className="bg-slate-900 pb-8 pt-12 text-white sm:pt-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-10 sm:grid-cols-2 md:mb-12 lg:grid-cols-[1.2fr_0.7fr_1fr_1.2fr] lg:gap-12">
          <div>
            <img
              src="/assets/brand/logo-light.webp"
              alt="MS Monster Global"
              width={640}
              height={111}
              className="mb-6 h-12 w-auto"
            />
            <p className="max-w-sm text-base leading-relaxed text-slate-400 md:text-sm">
              {footer.summary}
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
              {footer.companyTitle}
            </h2>
            <div className="space-y-1">{renderLinks(companyKeys)}</div>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
              {footer.servicesTitle}
            </h2>
            <div className="space-y-1">{renderLinks(serviceKeys)}</div>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
              {footer.contactTitle}
            </h2>
            <ul className="space-y-4 text-base text-slate-400 md:text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-slate-500" aria-hidden="true" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-slate-500" aria-hidden="true" />
                <a
                  href={`tel:${SITE.telephone}`}
                  className="rounded-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {SITE.displayTelephone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-slate-500" aria-hidden="true" />
                <a
                  href={`mailto:${SITE.email}`}
                  className="break-all rounded-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <ExternalLink
                  className="h-5 w-5 shrink-0 text-slate-500"
                  aria-hidden="true"
                />
                <a
                  href={SITE.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center rounded-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {footer.facebookLabel}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-slate-800 pt-8 md:flex-row md:items-center">
          <p className="text-sm text-slate-500">{footer.copyright}</p>
          <p className="text-sm text-slate-500">
            {footer.registrationLabel}: {SITE.registrationNumber}
          </p>
        </div>
      </div>
    </footer>
  );
}
