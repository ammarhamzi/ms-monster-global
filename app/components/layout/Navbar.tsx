import React from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { NavLink, useLocation } from 'react-router';
import {
  getLocaleForPath,
  getRoute,
  type PageKey,
} from '../../config/routes';
import { SITE } from '../../config/site';
import { getContent } from '../../content';
import LanguageSwitcher from './LanguageSwitcher';

const navigationKeys: PageKey[] = [
  'home',
  'about',
  'perfume',
  'it',
  'downloads',
  'contact',
];

export default function Navbar() {
  const { pathname } = useLocation();
  const locale = getLocaleForPath(pathname);
  const { nav } = getContent(locale);
  const [isOpen, setIsOpen] = React.useState(false);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);
  const navItems = navigationKeys.map((key) => ({
    key,
    to: getRoute(locale, key).path,
    label: nav[key],
  }));

  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  function closeMenu() {
    setIsOpen(false);
    menuButtonRef.current?.focus();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape' && isOpen) {
      closeMenu();
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <nav
        aria-label={nav.primaryLabel}
        onKeyDown={handleKeyDown}
        className="fixed left-0 right-0 top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <NavLink
              to={getRoute(locale, 'home').path}
              end
              className="flex flex-shrink-0 items-center rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
              aria-label={`${SITE.name}: ${nav.home}`}
            >
              <img
                src="/assets/brand/logo-dark.webp"
                alt="MS Monster Global"
                width={640}
                height={111}
                className="h-auto w-[clamp(7.5rem,42vw,11rem)] object-contain sm:w-64 lg:w-56 xl:w-64"
              />
            </NavLink>

            <div className="hidden items-center gap-6 lg:flex xl:gap-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.key}
                  to={item.to}
                  end={item.key === 'home'}
                  className={({ isActive }) =>
                    `inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 ${
                      isActive
                        ? 'text-emerald-700'
                        : 'text-slate-600 hover:text-slate-950'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <div className="flex items-center gap-1 border-l border-slate-200 pl-3">
                <Globe className="h-4 w-4 text-slate-400" aria-hidden="true" />
                <LanguageSwitcher />
              </div>
            </div>

            <div className="flex items-center gap-1 lg:hidden">
              <LanguageSwitcher />
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                aria-label={isOpen ? nav.closeMenuLabel : nav.openMenuLabel}
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                {isOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
              className="border-b border-gray-100 bg-white shadow-lg shadow-slate-950/5 lg:hidden"
            >
              <div className="space-y-1 px-4 pb-5 pt-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.key}
                    to={item.to}
                    end={item.key === 'home'}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `flex min-h-12 w-full items-center rounded-md px-3 text-left text-base font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                      }`
                    }
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
