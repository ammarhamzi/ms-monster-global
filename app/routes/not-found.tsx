import { Link, useLocation } from 'react-router';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { getLocaleForPath, getRoute } from '../config/routes';
import { getContent } from '../content';

export { notFoundMeta as meta } from '../seo/meta';

export default function NotFoundRoute() {
  const { pathname } = useLocation();
  const locale = getLocaleForPath(pathname);
  const { notFound } = getContent(locale);

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-start justify-center px-5 pt-20 sm:px-6">
      <Breadcrumbs
        locale={locale}
        current="404"
        className="mb-8 text-sm text-slate-500"
      />
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
        {notFound.eyebrow}
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
        {notFound.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-600">
        {notFound.description}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to={getRoute(locale, 'home').path}
          className="inline-flex min-h-12 items-center rounded-lg bg-slate-950 px-6 text-sm font-bold text-white transition-colors hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-950"
        >
          {notFound.homeLink.label}
        </Link>
        <Link
          to={getRoute(locale, 'contact').path}
          className="inline-flex min-h-12 items-center rounded-lg border border-slate-300 bg-white px-6 text-sm font-bold text-slate-950 transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
        >
          {notFound.contactLink.label}
        </Link>
      </div>
    </section>
  );
}
