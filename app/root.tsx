import type { ReactNode } from 'react';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from 'react-router';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { getRouteByPath, type Locale } from './config/routes';
import { LanguageProvider } from './context/LanguageContext';
import './styles/index.css';

function localeForPath(pathname: string): Locale {
  try {
    return getRouteByPath(pathname).locale;
  } catch {
    return 'en';
  }
}

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const locale = localeForPath(pathname);

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 bg-white px-4 py-3 font-semibold text-slate-950 shadow-lg transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        <LanguageProvider initialLanguage={locale}>
          <div className="flex min-h-screen flex-col font-sans">
            <Navbar />
            <main id="main-content" className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </LanguageProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
