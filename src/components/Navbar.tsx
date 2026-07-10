import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type NavbarProps = {
  activePage: string;
  setActivePage: (page: string) => void;
};

export default function Navbar({ activePage, setActivePage }: NavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'products', label: t.nav.products },
    { id: 'profile', label: t.nav.profile },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleNavClick = (id: string) => {
    setActivePage(id);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <img src="/assets/logo-black.png" alt="MS Monster Global" className="h-14 max-h-16 w-auto object-contain" />
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium whitespace-nowrap transition-colors ${
                  activePage === item.id ? 'text-green-600' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
              <Globe className="w-4 h-4 text-slate-400" />
              <button
                onClick={() => setLanguage('en')}
                className={`text-xs font-semibold ${language === 'en' ? 'text-slate-900' : 'text-slate-400'}`}
              >
                EN
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => setLanguage('ms')}
                className={`text-xs font-semibold ${language === 'ms' ? 'text-slate-900' : 'text-slate-400'}`}
              >
                BM
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage('en')}
                className={`text-xs font-semibold ${language === 'en' ? 'text-slate-900' : 'text-slate-400'}`}
              >
                EN
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => setLanguage('ms')}
                className={`text-xs font-semibold ${language === 'ms' ? 'text-slate-900' : 'text-slate-400'}`}
              >
                BM
              </button>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-100"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-3 py-3 text-base font-medium rounded-sm ${
                    activePage === item.id
                      ? 'bg-green-50 text-green-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
