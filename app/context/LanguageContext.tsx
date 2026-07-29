import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Locale } from '../config/routes';
import { translations } from '../i18n/translations';

interface LanguageContextType {
  language: Locale;
  setLanguage: (lang: Locale) => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({
  children,
  initialLanguage,
}: {
  children: ReactNode;
  initialLanguage: Locale;
}) => {
  const [language, setLanguage] = useState<Locale>(initialLanguage);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
