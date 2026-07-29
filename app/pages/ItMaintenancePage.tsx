import { MotionConfig, motion } from 'motion/react';
import { Activity, ArrowRight, CloudCog, DatabaseBackup, HardDrive, Headset, Network, Server, Shield, Wrench } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';

const services = [
  { icon: Activity, title: 'Predictive Maintenance', desc: 'Improve reliability, lower maintenance costs, and extend asset life for IT and AI systems.' },
  { icon: HardDrive, title: 'Hardware & Software Support', desc: 'Maintenance and troubleshooting for IT equipment, AI equipment, business applications, and workstations.' },
  { icon: Network, title: 'Network Monitoring', desc: 'Support for LAN, Wi-Fi, and 5G network maintenance with stable and secure connectivity.' },
  { icon: Wrench, title: 'System Troubleshooting & Repair', desc: 'Fast technical issue resolution to reduce downtime and restore operations.' },
  { icon: DatabaseBackup, title: 'Data Backup & Recovery', desc: 'Secure protection for business-critical information and recovery readiness.' },
  { icon: Headset, title: 'On-Site & Remote Support', desc: 'Flexible support options tailored to client needs, locations, and operating requirements.' },
];

const heroReveal = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function ItMaintenancePage() {
  const { t } = useLanguage();

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-slate-50 pt-20">
      <section className="relative isolate overflow-hidden bg-blue-950 text-white">
        <picture className="absolute inset-0 -z-20 block">
          <source media="(max-width: 767px)" srcSet="/assets/it-infrastructure-hero-mobile.jpg" />
          <img
            src="/assets/it-infrastructure-hero.jpg"
            alt="Technician working among enterprise server racks in a data centre"
            fetchPriority="high"
            sizes="100vw"
            className="h-full w-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-950 via-blue-950/85 to-blue-950/25" />
        <div className="mx-auto grid min-h-[31rem] max-w-7xl gap-8 px-5 py-12 sm:min-h-[34rem] sm:px-6 sm:py-16 md:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:px-8">
          <div className="max-w-3xl">
            <motion.p {...heroReveal(0.04)} className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-blue-200">MS Monster Global</motion.p>
            <motion.h1 {...heroReveal(0.14)} className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">{t.products.itDiv}</motion.h1>
            <motion.p {...heroReveal(0.24)} className="mt-5 max-w-2xl text-lg leading-relaxed text-blue-100 md:mt-6 md:text-xl">{t.products.itDesc}</motion.p>
            <motion.div {...heroReveal(0.34)}>
              <Link
                to="/contact"
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-blue-950 transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] motion-safe:hover:-translate-y-0.5 hover:bg-blue-100 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:mt-9 sm:w-auto"
              >
                Discuss your support needs <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
          <motion.div {...heroReveal(0.28)} className="border border-blue-200/30 bg-blue-950/85 p-6 sm:p-8">
            <CloudCog className="mb-4 h-8 w-8 text-blue-200 sm:mb-6 sm:h-10 sm:w-10" />
            <h2 className="text-xl font-bold sm:text-2xl">Infrastructure covered</h2>
            <p className="mt-2 text-base leading-relaxed text-blue-100 md:mt-3">
              AI models and infrastructure, traditional hardware and software technologies, cloud infrastructure, LAN, Wi-Fi, and 5G networks.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">Service coverage</p>
          <h2 className="mt-3 text-[1.75rem] font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl md:text-4xl">Practical support across your IT environment.</h2>
        </motion.div>
        <div className="mt-10 grid gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="bg-white p-5 sm:p-6 md:p-8"
            >
              <service.icon className="mb-5 h-8 w-8 text-blue-700 sm:mb-7" />
              <h3 className="text-xl font-bold text-slate-950">{service.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-sm">{service.desc}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 sm:px-6 md:flex-row md:items-center md:justify-between md:py-14 lg:px-8"
        >
          <div className="flex max-w-3xl gap-5">
            <Shield className="mt-1 h-8 w-8 shrink-0 text-blue-700" />
            <div>
              <h2 className="text-2xl font-bold text-slate-950">Support shaped around your operations.</h2>
              <p className="mt-2 text-base leading-relaxed text-slate-600">Tell us about your environment, locations, and operational priorities. We will recommend a support approach that fits.</p>
            </div>
          </div>
          <Link to="/contact" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-950 px-6 py-3 text-sm font-bold text-white transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] motion-safe:hover:-translate-y-0.5 hover:bg-blue-800 active:scale-[0.98]">
            Contact MS Monster <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>
    </div>
    </MotionConfig>
  );
}
