import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Building2 } from 'lucide-react';

export default function DownloadsPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pt-20">
      <div className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold tracking-widest uppercase text-blue-200 mb-4">MS Monster Global Sdn Bhd</p>
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.profile.title}</h1>
          <p className="text-blue-200 text-lg max-w-3xl">
            {t.profile.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="max-w-3xl">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-10">
            <Building2 className="w-10 h-10 text-blue-600 mb-6" />
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.about.companyInfo}</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p className="font-semibold text-slate-900">{t.about.regNo}</p>
              <p>{t.about.location}</p>
              <p>{t.profile.certificates}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
