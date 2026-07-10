import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react';

type FooterProps = {
  setActivePage: (page: string) => void;
};

export default function Footer({ setActivePage }: FooterProps) {
  const { t } = useLanguage();

  const links = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'products', label: t.nav.products },
    { id: 'profile', label: t.nav.profile },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <footer className="bg-slate-900 text-white pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-[1.1fr_0.8fr_1fr] gap-12 mb-12">
          <div>
            <img src="/assets/logo-white.png" alt="MS Monster Global" className="h-12 w-auto mb-6" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {t.hero.subtitle}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-slate-300">Company</h3>
            <div className="space-y-3">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setActivePage(link.id)}
                  className="block text-sm text-slate-400 hover:text-white transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-slate-300">Contact</h3>
            <ul className="space-y-4 text-sm text-slate-400">
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
                <span>solehin@msmonsterglobal.com</span>
              </li>
              <li className="flex items-center gap-3">
                <ExternalLink className="w-5 h-5 text-slate-500 shrink-0" />
                <a
                  href="https://www.facebook.com/HqMonsterPerfume/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Official Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© 2026 MS Monster Global Sdn Bhd.</p>
          <p className="text-slate-500 text-sm">Registration No: 202201042816 (1488513-W)</p>
        </div>
      </div>
    </footer>
  );
}
