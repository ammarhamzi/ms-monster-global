import React from 'react';
import { MotionConfig, motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Building2, CloudCog, Droplet, MapPin, ShieldCheck, Sparkles, Wrench } from 'lucide-react';
import HeroBackgroundPaths from '../components/HeroBackgroundPaths';
import { Link } from 'react-router';

const heroEase = [0.22, 1, 0.36, 1] as const;

const heroReveal = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.68, delay, ease: heroEase },
});

export default function HomePage() {
  const { t } = useLanguage();

  const divisions = [
    {
      icon: Droplet,
      title: t.home.aromaTitle,
      desc: t.home.aromaDesc,
      color: 'green',
      items: ['Aroma space design', 'Commercial diffuser systems', 'Custom fragrance development'],
      cta: 'Explore perfume & aroma',
    },
    {
      icon: CloudCog,
      title: t.home.itTitle,
      desc: t.home.itDesc,
      color: 'blue',
      items: ['IT and AI infrastructure', 'Network monitoring', 'Data backup and recovery'],
      cta: 'Explore IT services',
    },
  ];

  return (
    <MotionConfig reducedMotion="user">
    <div className="flex min-h-screen flex-col">
      <section className="relative overflow-hidden bg-gray-50 pb-16 pt-28 sm:pb-24">
        <div className="absolute inset-0 z-0">
          <HeroBackgroundPaths />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <motion.p {...heroReveal(0.1)} className="text-sm font-bold tracking-widest uppercase text-green-600 mb-5">
              {t.hero.eyebrow}
            </motion.p>
            <motion.h1
              {...heroReveal(0.25)}
              className="mb-6 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-gray-900 sm:mb-8 sm:text-5xl md:text-7xl"
            >
              {t.hero.title}
            </motion.h1>
            <motion.p {...heroReveal(0.38)} className="mb-8 max-w-3xl text-lg leading-relaxed text-gray-600 sm:mb-10 sm:text-xl md:text-2xl">
              {t.hero.subtitle}
            </motion.p>
            <motion.div {...heroReveal(0.5)} className="grid gap-3 sm:flex sm:flex-row sm:gap-4">
              <Link
                to="/commercial-aroma-solutions"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-transparent bg-emerald-800 px-6 py-3 text-sm font-bold text-white shadow-sm transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] motion-safe:hover:-translate-y-0.5 hover:bg-emerald-700 active:scale-[0.98]"
              >
                Explore perfume & aroma
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/it-maintenance"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-blue-900 bg-blue-900 px-6 py-3 text-sm font-bold text-white shadow-sm transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] motion-safe:hover:-translate-y-0.5 hover:bg-blue-800 active:scale-[0.98]"
              >
                Explore IT Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl sm:mb-16">
            <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3">{t.home.overviewTitle}</h2>
            <p className="text-[1.75rem] font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              {t.home.overviewDesc}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 md:gap-8">
            {divisions.map((division) => (
              <Link
                key={division.title}
                to={division.color === 'green' ? '/commercial-aroma-solutions' : '/it-maintenance'}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-6 transition-all hover:border-slate-200 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 sm:p-8 md:p-10"
              >
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-sm mb-6 border ${
                  division.color === 'green'
                    ? 'bg-white border-green-100 text-green-600'
                    : 'bg-white border-blue-100 text-blue-600'
                }`}>
                  <division.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{division.title}</h3>
                <p className="mb-6 text-base leading-relaxed text-gray-600">{division.desc}</p>
                <ul className="space-y-3">
                  {division.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                      <ShieldCheck className={`w-4 h-4 ${division.color === 'green' ? 'text-green-500' : 'text-blue-500'}`} />
                      {item}
                    </li>
                  ))}
                </ul>
                <span className={`mt-8 inline-flex items-center gap-2 text-sm font-bold ${
                  division.color === 'green' ? 'text-green-700' : 'text-blue-700'
                }`}>
                  {division.cta}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <Wrench className="w-7 h-7" />
              </div>
              <h2 className="mb-5 text-[1.75rem] font-bold leading-tight text-slate-900 sm:text-3xl md:text-4xl">{t.home.proofTitle}</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {t.home.ctaDesc}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
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

      <section className="bg-blue-900 py-14 text-white sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-stretch justify-between gap-8 px-5 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div className="max-w-2xl">
            <h2 className="mb-4 text-[1.75rem] font-bold leading-tight sm:text-3xl">{t.home.ctaTitle}</h2>
            <p className="text-blue-200 text-lg">{t.home.ctaDesc}</p>
          </div>
          <Link
            to="/contact"
            className="inline-flex min-h-12 items-center justify-center border-2 border-white px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-blue-900 md:w-auto"
          >
            Contact MS Monster
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
    </MotionConfig>
  );
}
