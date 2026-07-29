import { Link, useLocation } from 'react-router';
import {
  getCounterpart,
  getLocaleForPath,
  getRoute,
  getRouteByPath,
  type RouteRecord,
} from '../../config/routes';
import { getContent } from '../../content';

function languageRoutes(pathname: string): {
  currentRoute?: RouteRecord;
  englishRoute: RouteRecord;
  malayRoute: RouteRecord;
} {
  try {
    const currentRoute = getRouteByPath(pathname);
    const counterpart = getCounterpart(currentRoute);

    return {
      currentRoute,
      englishRoute: currentRoute.locale === 'en' ? currentRoute : counterpart,
      malayRoute: currentRoute.locale === 'ms' ? currentRoute : counterpart,
    };
  } catch {
    return {
      englishRoute: getRoute('en', 'home'),
      malayRoute: getRoute('ms', 'home'),
    };
  }
}

export default function LanguageSwitcher() {
  const { pathname } = useLocation();
  const locale = getLocaleForPath(pathname);
  const { nav } = getContent(locale);
  const { currentRoute, englishRoute, malayRoute } = languageRoutes(pathname);
  const linkClassName =
    'inline-flex min-h-11 min-w-11 items-center justify-center rounded-md px-1 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700';

  return (
    <div
      role="group"
      aria-label={nav.languageSelectionLabel}
      className="flex items-center gap-0.5"
    >
      <Link
        to={englishRoute.path}
        hrefLang="en"
        lang="en"
        aria-current={currentRoute?.locale === 'en' ? 'page' : undefined}
        className={`${linkClassName} ${
          locale === 'en' ? 'text-slate-950' : 'text-slate-600 hover:text-slate-950'
        }`}
      >
        EN
      </Link>
      <span aria-hidden="true" className="text-slate-300">
        |
      </span>
      <Link
        to={malayRoute.path}
        hrefLang="ms"
        lang="ms"
        aria-current={currentRoute?.locale === 'ms' ? 'page' : undefined}
        className={`${linkClassName} ${
          locale === 'ms' ? 'text-slate-950' : 'text-slate-600 hover:text-slate-950'
        }`}
      >
        BM
      </Link>
    </div>
  );
}
