import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router';

export default function Footer() {
  const { t } = useLanguage();

  const links = [
    { to: '/', label: t.nav.home },
    { to: '/about', label: t.nav.about },
    { to: '/commercial-aroma-solutions', label: t.products.tabs.perfume },
    { to: '/it-maintenance', label: t.products.tabs.it },
    { to: '/downloads', label: t.nav.profile },
    { to: '/contact', label: t.nav.contact },
  ];

  return (
    <footer className="bg-slate-900 pb-8 pt-12 text-white sm:pt-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-10 md:grid-cols-[1.1fr_0.8fr_1fr] md:gap-12 md:mb-12">
          <div>
            <img src="/assets/logo-white.png" alt="MS Monster Global" className="h-12 w-auto mb-6" />
            <p className="max-w-sm text-base leading-relaxed text-slate-400 md:text-sm">
              {t.hero.subtitle}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-slate-300">Company</h3>
            <div className="space-y-1">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex min-h-11 items-center text-sm text-slate-400 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-slate-300">Contact</h3>
            <ul className="space-y-4 text-base text-slate-400 md:text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-500 shrink-0" />
                <span>{t.contact.addressDetail}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-slate-500 shrink-0" />
                <span>+6012-6665658</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-slate-500 shrink-0" />
                <span className="break-all">solehin@msmonsterglobal.com</span>
              </li>
              <li className="flex items-center gap-3">
                <ExternalLink className="w-5 h-5 text-slate-500 shrink-0" />
                <a
                  href="https://www.facebook.com/HqMonsterPerfume/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center transition-colors hover:text-white"
                >
                  Official Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-slate-800 pt-8 md:flex-row md:items-center">
          <p className="text-slate-500 text-sm">© 2026 MS Monster Global Sdn Bhd.</p>
          <p className="text-slate-500 text-sm">Registration No: 202201042816 (1488513-W)</p>
        </div>
      </div>
    </footer>
  );
}
