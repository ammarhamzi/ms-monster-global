import { Link } from 'react-router';

export { notFoundMeta as meta } from '../seo/meta';

export default function NotFoundRoute() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-start justify-center px-5 pt-20 sm:px-6">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">404</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">Page not found</h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-600">
        The page you requested is not available.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex min-h-12 items-center rounded-lg bg-slate-950 px-6 text-sm font-bold text-white"
      >
        Return home
      </Link>
    </section>
  );
}
