import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { Activity, ArrowRight, CloudCog, DatabaseBackup, Droplet, ExternalLink, HardDrive, Headset, Network, Server, Shield, SoapDispenserDroplet, TestTube, Wind, Wrench } from 'lucide-react';
import { diffusers, essentialOils, extracts } from '../data/products';

export default function Products() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'it' | 'perfume' | 'ameco'>('ameco');

  const itServices = [
    { icon: Activity, title: 'Predictive Maintenance', desc: 'Improve reliability, lower maintenance costs, and extend asset life for IT and AI systems.' },
    { icon: HardDrive, title: 'Hardware & Software Support', desc: 'Maintenance and troubleshooting for IT equipment, AI equipment, business applications, and workstations.' },
    { icon: Network, title: 'Network Monitoring', desc: 'Support for LAN, Wi-Fi, and 5G network maintenance with stable and secure connectivity.' },
    { icon: Wrench, title: 'System Troubleshooting & Repair', desc: 'Fast technical issue resolution to reduce downtime and restore operations.' },
    { icon: DatabaseBackup, title: 'Data Backup & Recovery', desc: 'Secure protection for business-critical information and recovery readiness.' },
    { icon: Headset, title: 'On-Site & Remote Support', desc: 'Flexible support options tailored to client needs, locations, and operating requirements.' },
  ];

  const scentServices = [
    { icon: Droplet, title: 'Essential Oils & Fragrance Oils', desc: 'Non-alcoholic, water-free fragrance oils crafted from concentrated essence for long-lasting diffusion.' },
    { icon: Wind, title: 'Commercial Diffuser Systems', desc: 'Desktop, wall-mounted, HVAC, hanging, and freestanding systems for small through large commercial spaces.' },
    { icon: TestTube, title: 'Custom Scent Development', desc: 'Original aroma design matched to client needs, products, premises, and brand experiences.' },
  ];

  const catalogGroups = [
    { title: 'Small and personal spaces', range: '10-200m²', models: diffusers.filter((item) => ['MF120A', 'MF130R', 'MC50L', 'MF50L', 'MF140A', 'MS105', 'MS600'].includes(item.model)) },
    { title: 'Medium commercial spaces', range: '200-600m²', models: diffusers.filter((item) => ['MF300R', 'MS1300A', 'MS1400A', 'MF1200A', 'MS3800R'].includes(item.model)) },
    { title: 'Large spaces and HVAC', range: '500-2800m²', models: diffusers.filter((item) => ['MF1500A', 'MF3000A', 'MS3000R', 'MS1500A', 'MS3500A', 'MS3600A', 'MS6000A', 'MS500', 'MS501F', 'MS-18', 'MS-43'].includes(item.model)) },
  ];

  const tabs = [
    {
      id: 'ameco' as const,
      label: t.products.tabs.ameco,
      icon: SoapDispenserDroplet,
      activeClass: 'bg-pink-600 text-white shadow-md',
      inactiveClass: 'text-slate-600 hover:text-pink-700 hover:bg-pink-50',
    },
    {
      id: 'perfume' as const,
      label: t.products.tabs.perfume,
      icon: Wind,
      activeClass: 'bg-green-600 text-white shadow-md',
      inactiveClass: 'text-slate-600 hover:text-green-700 hover:bg-green-50',
    },
    {
      id: 'it' as const,
      label: t.products.tabs.it,
      icon: Server,
      activeClass: 'bg-blue-900 text-white shadow-md',
      inactiveClass: 'text-slate-600 hover:text-blue-900 hover:bg-blue-50',
    },
  ];

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-12 md:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            {t.products.title}
          </h1>
          <p className="max-w-3xl mx-auto text-base md:text-lg text-slate-600 leading-relaxed">{t.products.intro}</p>
          <div className="w-24 h-1 bg-green-500 mx-auto rounded-full mt-6 md:mt-8" />

          <div className="mt-8 md:mt-10 grid grid-cols-3 w-full sm:w-auto sm:inline-flex sm:flex-row bg-white border border-slate-200 rounded-2xl p-1.5 sm:p-2 shadow-sm gap-1.5 sm:gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === tab.id ? tab.activeClass : tab.inactiveClass
                }`}
              >
                <tab.icon className="w-4 h-4 shrink-0" />
                <span className="leading-tight">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'it' && (
        <section>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-11 h-11 md:w-12 md:h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{t.products.itDiv}</h2>
              <p className="text-slate-600 mt-2 max-w-3xl text-sm md:text-base">{t.products.itDesc}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-10">
            {itServices.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <item.icon className="w-8 h-8 text-blue-500 mb-4 md:mb-6" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 md:mt-10 bg-blue-900 text-white p-6 md:p-10 rounded-2xl md:rounded-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <CloudCog className="w-9 h-9 text-blue-200 mb-4" />
                <h3 className="text-2xl font-bold mb-3">Infrastructure covered</h3>
                <p className="text-blue-100 max-w-3xl leading-relaxed">
                  AI models and infrastructure, traditional hardware and software technologies, cloud infrastructure, LAN, Wi-Fi, and 5G networks.
                </p>
              </div>
              <Shield className="w-16 h-16 text-blue-200 flex-shrink-0" />
            </div>
          </div>
        </section>
        )}

        {activeTab === 'perfume' && (
        <>
        <section className="mb-16 md:mb-24">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-11 h-11 md:w-12 md:h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center shrink-0">
              <Wind className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{t.products.scentDiv}</h2>
              <p className="text-slate-600 mt-2 max-w-3xl text-sm md:text-base">{t.products.scentDesc}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-10 mb-10 md:mb-16">
            {scentServices.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <item.icon className="w-8 h-8 text-green-500 mb-4 md:mb-6" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 mb-10 md:mb-16 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="text-sm font-bold tracking-widest text-green-600 uppercase mb-2">Monster Perfume</p>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Official Facebook</h3>
              <p className="text-slate-600">Follow Monster Perfume updates, products, and customer enquiries on Facebook.</p>
            </div>
            <a
              href="https://www.facebook.com/HqMonsterPerfume/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Open Facebook
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="bg-white p-6 md:p-12 rounded-3xl border border-slate-100 mb-10 md:mb-16 shadow-sm">
            <div className="flex items-start gap-5 md:gap-6 flex-col md:flex-row">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <TestTube className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 md:mb-4">{t.products.labTitle}</h3>
                <p className="text-slate-600 leading-relaxed text-base md:text-lg mb-4">
                  {t.products.labDesc}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12 md:mb-20">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 md:mb-8">{t.products.elementsTitle}</h3>
            <div className="grid md:grid-cols-2 gap-4 md:gap-8">
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="text-xl font-bold text-green-600 mb-5 md:mb-6 flex items-center gap-2">
                  <Droplet className="w-5 h-5" /> Essential Oils
                </h4>
                <ul className="grid grid-cols-2 gap-x-3 md:gap-x-4 gap-y-2">
                  {essentialOils.map((oil) => (
                    <li key={oil} className="text-sm text-slate-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> {oil}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="text-xl font-bold text-amber-600 mb-5 md:mb-6 flex items-center gap-2">
                  <TestTube className="w-5 h-5" /> Extracts
                </h4>
                <ul className="grid grid-cols-2 gap-x-3 md:gap-x-4 gap-y-2">
                  {extracts.map((extract) => (
                    <li key={extract} className="text-sm text-slate-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> {extract}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 md:mb-8">{t.products.catalogTitle}</h3>
          <div className="space-y-10 md:space-y-12">
            {catalogGroups.map((group) => (
              <div key={group.title}>
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-5">
                  <h4 className="text-xl font-bold text-slate-900">{group.title}</h4>
                  <span className="text-sm font-semibold text-slate-500">{group.range}</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {group.models.map((diffuser) => (
                    <motion.div
                      key={diffuser.model}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-green-300 transition-colors shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-lg font-bold text-slate-900">{diffuser.model}</h4>
                        <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded">
                          {diffuser.capacity}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mb-4 font-medium flex items-center gap-1">
                        <Wind className="w-4 h-4" /> Coverage: {diffuser.coverage}
                      </p>
                      <ul className="space-y-1 mb-4">
                        {diffuser.features.slice(0, 3).map((feat) => (
                          <li key={feat} className="text-xs text-slate-600 flex items-start gap-1.5">
                            <ArrowRight className="w-3 h-3 mt-0.5 text-green-500 flex-shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <p className="text-xs text-slate-500 line-clamp-2">
                          <span className="font-semibold text-slate-700">Suitable for:</span> {diffuser.applicable}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        </>
        )}

        {activeTab === 'ameco' && (
        <section>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-11 h-11 md:w-12 md:h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center shrink-0">
              <SoapDispenserDroplet className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold tracking-widest text-pink-600 uppercase mb-1">AMECO</p>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{t.products.amecoTitle}</h2>
            </div>
          </div>

          <div className="bg-white p-6 md:p-12 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 md:gap-10">
              <div className="max-w-3xl">
                <p className="text-base md:text-xl text-slate-600 leading-relaxed mb-6 md:mb-8">{t.products.amecoDesc}</p>
                <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                  {['Laundry detergent', 'Fabric softener', 'Floor cleaner', 'Scented home-care products'].map((item) => (
                    <div key={item} className="rounded-lg bg-pink-50 border border-pink-100 px-4 py-3 text-sm font-semibold text-slate-700">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <a
                href="https://ameco.my/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full lg:w-auto items-center justify-center gap-2 rounded-lg bg-pink-600 px-6 py-3 text-sm font-semibold text-white hover:bg-pink-700 transition-colors whitespace-nowrap"
              >
                {t.products.amecoCta}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
        )}
      </div>
    </div>
  );
}
