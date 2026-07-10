import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Building2, CloudCog, Droplet, MapPin, ShieldCheck, Sparkles, Wrench } from 'lucide-react';
import HeroBackgroundPaths from '../components/HeroBackgroundPaths';

const heroEase = [0.22, 1, 0.36, 1] as const;

const heroReveal = (delay: number) => ({
  initial: { opacity: 0, y: 28, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 1.1, delay, ease: heroEase },
});

type HomeProps = {
  setActivePage: (page: string) => void;
};

export default function Home({ setActivePage }: HomeProps) {
  const { t } = useLanguage();

  const divisions = [
    {
      icon: Droplet,
      title: t.home.aromaTitle,
      desc: t.home.aromaDesc,
      color: 'green',
      items: ['Aroma space design', 'Commercial diffuser systems', 'Custom fragrance development'],
    },
    {
      icon: CloudCog,
      title: t.home.itTitle,
      desc: t.home.itDesc,
      color: 'blue',
      items: ['IT and AI infrastructure', 'Network monitoring', 'Data backup and recovery'],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative bg-gray-50 pt-28 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <HeroBackgroundPaths />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <motion.p {...heroReveal(0.1)} className="text-sm font-bold tracking-widest uppercase text-green-600 mb-5">
              {t.hero.eyebrow}
            </motion.p>
            <motion.h1
              {...heroReveal(0.25)}
              className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight"
            >
              {t.hero.title}
            </motion.h1>
            <motion.p {...heroReveal(0.45)} className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl leading-relaxed">
              {t.hero.subtitle}
            </motion.p>
            <motion.div {...heroReveal(0.65)} className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setActivePage('products')}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-blue-900 border border-transparent rounded-lg hover:bg-blue-800 transition-colors shadow-lg hover:shadow-xl"
              >
                {t.hero.primaryCta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3">{t.home.overviewTitle}</h2>
            <p className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {t.home.overviewDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {divisions.map((division) => (
              <div key={division.title} className="bg-gray-50 p-8 md:p-10 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-sm mb-6 border ${
                  division.color === 'green'
                    ? 'bg-white border-green-100 text-green-600'
                    : 'bg-white border-blue-100 text-blue-600'
                }`}>
                  <division.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{division.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{division.desc}</p>
                <ul className="space-y-3">
                  {division.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                      <ShieldCheck className={`w-4 h-4 ${division.color === 'green' ? 'text-green-500' : 'text-blue-500'}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-start">
            <div>
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <Wrench className="w-7 h-7" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5">{t.home.proofTitle}</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {t.home.ctaDesc}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {t.home.proofItems.map((item, idx) => {
                const icons = [Building2, MapPin, Sparkles, CloudCog];
                const Icon = icons[idx] || ShieldCheck;
                return (
                  <div key={item} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <Icon className="w-6 h-6 text-blue-600 mb-5" />
                    <p className="font-semibold text-slate-900 leading-snug">{item}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">{t.home.ctaTitle}</h2>
            <p className="text-blue-200 text-lg">{t.home.ctaDesc}</p>
          </div>
          <button
            onClick={() => setActivePage('contact')}
            className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-medium rounded-lg text-white hover:bg-white hover:text-blue-900 transition-colors whitespace-nowrap"
          >
            Contact MS Monster
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
