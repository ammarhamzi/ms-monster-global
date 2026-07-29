import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { BriefcaseBusiness, Compass, Flag, MapPin, ShieldCheck, Target, Users } from 'lucide-react';

export default function AboutPage() {
  const { t } = useLanguage();

  const principles = [
    { icon: Compass, title: t.about.vision, desc: t.about.visionDesc, color: 'blue' },
    { icon: Target, title: t.about.mission, desc: t.about.missionDesc, color: 'green' },
    { icon: Flag, title: t.about.objective, desc: t.about.objectiveDesc, color: 'amber' },
  ];

  return (
    <div className="pt-20 min-h-screen bg-white">
      <div className="bg-slate-50 py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <p className="text-sm font-bold tracking-widest text-green-600 uppercase mb-4">MS Monster Global Sdn Bhd</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              {t.about.title}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">{t.about.intro}</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 mb-24">
          <div className="bg-slate-900 p-8 md:p-10 text-white rounded-sm">
            <BriefcaseBusiness className="w-10 h-10 text-green-400 mb-6" />
            <h2 className="text-2xl font-bold mb-6">{t.about.companyInfo}</h2>
            <div className="space-y-5 text-slate-300">
              <p className="font-medium text-white">{t.about.regNo}</p>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <p className="leading-relaxed">{t.about.location}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {principles.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
              >
                <div className={`w-12 h-12 flex items-center justify-center mb-5 rounded-sm ${
                  item.color === 'blue'
                    ? 'bg-blue-50 text-blue-600'
                    : item.color === 'green'
                      ? 'bg-green-50 text-green-600'
                      : 'bg-amber-50 text-amber-600'
                }`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <Flag className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">{t.about.history}</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {t.about.timeline.map((item, idx) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-100"
              >
                <p className="text-3xl font-extrabold text-green-600 mb-4">{item.year}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mb-24">
          <div className="bg-slate-50 p-8 md:p-10 rounded-sm border border-slate-100">
            <Users className="w-10 h-10 text-blue-600 mb-6" />
            <h2 className="text-3xl font-bold text-slate-900 mb-8">{t.about.leadership}</h2>
            <div className="space-y-5">
              {t.about.leadershipItems.map((item) => (
                <p key={item} className="text-slate-600 leading-relaxed border-b border-slate-200 pb-5 last:border-0 last:pb-0">
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 p-8 md:p-10 text-center text-white relative rounded-sm">
            <ShieldCheck className="w-12 h-12 text-green-400 mx-auto mb-6 relative z-10" />
            <h2 className="text-3xl font-bold mb-10 relative z-10">{t.about.values}</h2>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              {t.about.valuesList.map((val) => (
                <span key={val} className="px-6 py-3 bg-slate-800 border border-slate-700 text-slate-200 font-medium text-sm tracking-wide uppercase rounded-sm">
                  {val}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
