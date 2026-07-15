import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';
import { MotionConfig, motion, AnimatePresence } from 'motion/react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { to: '/', label: t.nav.home, end: true },
    { to: '/about', label: t.nav.about },
    { to: '/perfume', label: t.products.tabs.perfume },
    { to: '/it', label: t.products.tabs.it },
    { to: '/profile', label: t.nav.profile },
    { to: '/contact', label: t.nav.contact },
  ];

  return (
    <MotionConfig reducedMotion="user">
    <nav aria-label="Primary navigation" className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <NavLink to="/" className="flex-shrink-0 flex items-center" aria-label="MS Monster Global home">
            <img src="/assets/logo-black.png" alt="MS Monster Global" className="h-14 max-h-16 w-auto object-contain" />
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive ? 'text-green-600' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
              </NavLink>
            ))}
            
            <div className="flex items-center gap-1 border-l border-slate-200 pl-3">
              <Globe className="w-4 h-4 text-slate-400" />
              <button
                onClick={() => setLanguage('en')}
                aria-label="Switch language to English"
                aria-pressed={language === 'en'}
                className={`inline-flex min-h-11 min-w-9 items-center justify-center rounded-md px-1 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${language === 'en' ? 'text-slate-900' : 'text-slate-400'}`}
              >
                EN
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => setLanguage('ms')}
                aria-label="Switch language to Bahasa Melayu"
                aria-pressed={language === 'ms'}
                className={`inline-flex min-h-11 min-w-9 items-center justify-center rounded-md px-1 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${language === 'ms' ? 'text-slate-900' : 'text-slate-400'}`}
              >
                BM
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-1 lg:hidden">
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setLanguage('en')}
                aria-label="Switch language to English"
                aria-pressed={language === 'en'}
                className={`inline-flex min-h-11 min-w-9 items-center justify-center rounded-md px-1 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${language === 'en' ? 'text-slate-900' : 'text-slate-400'}`}
              >
                EN
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => setLanguage('ms')}
                aria-label="Switch language to Bahasa Melayu"
                aria-pressed={language === 'ms'}
                className={`inline-flex min-h-11 min-w-9 items-center justify-center rounded-md px-1 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${language === 'ms' ? 'text-slate-900' : 'text-slate-400'}`}
              >
                BM
              </button>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="border-b border-gray-100 bg-white shadow-lg shadow-slate-950/5 lg:hidden"
          >
            <div className="space-y-1 px-4 pb-5 pt-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `flex min-h-12 w-full items-center rounded-md px-3 text-left text-base font-medium ${
                    isActive ? 'bg-green-50 text-green-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    </MotionConfig>
  );
}
