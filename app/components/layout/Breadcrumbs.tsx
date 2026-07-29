import { getRoute, type Locale } from '../../config/routes';
import { getContent } from '../../content';

interface BreadcrumbsProps {
  locale: Locale;
  current: string;
  className?: string;
  tone?: 'light' | 'dark';
}

export default function Breadcrumbs({
  locale,
  current,
  className = '',
  tone = 'light',
}: BreadcrumbsProps) {
  const { nav } = getContent(locale);
  const homeRoute = getRoute(locale, 'home');
  const homeClassName =
    tone === 'dark'
      ? '-mx-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm px-2 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'
      : '-mx-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm px-2 hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700';
  const currentClassName =
    tone === 'dark' ? 'font-semibold text-white' : 'font-semibold text-slate-800';

  return (
    <nav aria-label={nav.breadcrumbLabel} className={className}>
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <a href={homeRoute.path} className={homeClassName}>
            {nav.home}
          </a>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className={currentClassName}>
          {current}
        </li>
      </ol>
    </nav>
  );
}
