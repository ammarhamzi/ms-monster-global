import type { ReactNode } from 'react';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from 'react-router';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import { getLocaleForPath, type Locale } from './config/routes';
import { getContent } from './content';
import './styles/index.css';

export function SkipToContentLink({ locale }: { locale: Locale }) {
  const { nav } = getContent(locale);

  return (
    <a
      href="#main-content"
      className="fixed left-4 top-4 z-[100] -translate-y-24 bg-white px-4 py-3 font-semibold text-slate-950 shadow-lg transition-transform focus:translate-y-0"
    >
      {nav.skipToContent}
    </a>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const locale = getLocaleForPath(pathname);

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <SkipToContentLink locale={locale} />
        <div className="flex min-h-screen flex-col font-sans">
          <Navbar />
          <main id="main-content" className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
