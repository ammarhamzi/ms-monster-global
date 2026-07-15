import { useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { ArrowRight, Check, ChevronDown, Droplet, ExternalLink, FlaskConical, MapPinned, Settings2, Sparkles, TestTube, Wind } from 'lucide-react';
import { Link } from 'react-router-dom';
import { diffusers, essentialOils, extracts } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

const scentServices = [
  { icon: Droplet, title: 'Essential Oils & Fragrance Oils', desc: 'Non-alcoholic, water-free fragrance oils crafted from concentrated essence for long-lasting diffusion.' },
  { icon: Wind, title: 'Commercial Diffuser Systems', desc: 'Desktop, wall-mounted, HVAC, hanging, and freestanding systems for small through large commercial spaces.' },
  { icon: TestTube, title: 'Custom Scent Development', desc: 'Original aroma design matched to client needs, products, premises, and brand experiences.' },
];

const aromaSystem = [
  { number: '01', icon: MapPinned, title: 'Read the space', desc: 'We start with your space type, customer flow, coverage area, ventilation, and the atmosphere you want people to remember.' },
  { number: '02', icon: FlaskConical, title: 'Build the scent profile', desc: 'Select essential oils, fragrance oils, and botanical extracts, or develop a signature scent that fits your brand.' },
  { number: '03', icon: Settings2, title: 'Match the diffuser system', desc: 'Choose desktop, wall-mounted, freestanding, hanging, or HVAC-ready equipment for reliable, waterless diffusion.' },
  { number: '04', icon: Sparkles, title: 'Maintain the experience', desc: 'Keep the scent consistent with practical refill, tuning, and support options for your operating environment.' },
];

const scentPalette = [
  {
    shortLabel: 'Fresh',
    direction: 'Fresh & bright',
    description: 'A clean, uplifting direction for entrances, daytime spaces, and moments that should feel open and energised.',
    idealFor: 'Entrances, cafés, daytime retail',
    ingredients: ['Grapefruit', 'Lemon', 'Peppermint Oil'],
    color: 'text-lime-800',
    image: '/assets/scent-fresh.jpg',
    mobileImage: '/assets/scent-fresh-mobile.jpg',
    imageAlt: 'Grapefruit, lemon peel, peppermint, and a fragrance oil bottle',
  },
  {
    shortLabel: 'Floral',
    direction: 'Floral & soft',
    description: 'A gentle, expressive direction that brings warmth and a more personal character to a space.',
    idealFor: 'Boutiques, salons, guest-facing spaces',
    ingredients: ['Jasmine Absolute Oil', 'Rose Absolute Oil', 'Bois De Rose Oil'],
    color: 'text-rose-800',
    image: '/assets/scent-floral.jpg',
    mobileImage: '/assets/scent-floral-mobile.jpg',
    imageAlt: 'Jasmine, rose, botanical branches, and a fragrance oil bottle',
  },
  {
    shortLabel: 'Woody',
    direction: 'Woody & grounded',
    description: 'A calm, refined direction with depth, suited to longer stays and more considered environments.',
    idealFor: 'Lobbies, showrooms, executive spaces',
    ingredients: ['Cedarwood Virginian Oil', 'Cypress Oil', 'Sandalwood Oil'],
    color: 'text-amber-900',
    image: '/assets/scent-woody.jpg',
    mobileImage: '/assets/scent-woody-mobile.jpg',
    imageAlt: 'Cedarwood, cypress, sandalwood, and a fragrance oil bottle',
  },
];

const reasonsToChoose = [
  { title: 'One connected aroma system', desc: 'Scent direction, ingredient exploration, fragrance oils, and diffuser equipment are considered together.' },
  { title: 'Built around your environment', desc: 'Choose a solution for personal spaces, commercial settings, or large HVAC-connected environments.' },
  { title: 'A clear path from idea to experience', desc: 'Move from the feeling you want to create to a practical diffusion system suited to the space.' },
];

const catalogGroups = [
  { title: 'Small and personal spaces', range: '10-200m²', models: diffusers.filter((item) => ['MF120A', 'MF130R', 'MC50L', 'MF50L', 'MF140A', 'MS105', 'MS600'].includes(item.model)) },
  { title: 'Medium commercial spaces', range: '200-600m²', models: diffusers.filter((item) => ['MF300R', 'MS1300A', 'MS1400A', 'MF1200A', 'MS3800R'].includes(item.model)) },
  { title: 'Large spaces and HVAC', range: '500-2800m²', models: diffusers.filter((item) => ['MF1500A', 'MF3000A', 'MS3000R', 'MS1500A', 'MS3500A', 'MS3600A', 'MS6000A', 'MS500', 'MS501F', 'MS-18', 'MS-43'].includes(item.model)) },
];

const spaceSolutions = [
  {
    group: 'Small and personal spaces',
    range: '10–200m²',
    spaces: 'Homes, cars, private rooms, salons, cafés, and smaller retail settings.',
    image: '/assets/perfume-space-boutique.jpg',
    mobileImage: '/assets/perfume-space-boutique-mobile.jpg',
    imageAlt: 'Boutique interior with a discreet wall-mounted aroma diffuser',
  },
  {
    group: 'Medium commercial spaces',
    range: '200–600m²',
    spaces: 'Boutiques, showrooms, restaurants, offices, fitness studios, and customer-facing spaces.',
    image: '/assets/perfume-space-office.jpg',
    mobileImage: '/assets/perfume-space-office-mobile.jpg',
    imageAlt: 'Modern office reception with a commercial aroma diffuser',
  },
  {
    group: 'Large spaces and HVAC',
    range: '500–2800m²',
    spaces: 'Hotels, lobbies, malls, event venues, shared facilities, and HVAC-connected environments.',
    image: '/assets/perfume-space-hospitality.jpg',
    mobileImage: '/assets/perfume-space-hospitality-mobile.jpg',
    imageAlt: 'Hotel lobby with a discreet aroma diffuser integrated into the interior',
  },
];

const featuredDiffusers = [
  {
    model: 'MF120A',
    name: 'Personal & compact',
    coverage: '40–200m²',
    capacity: '200 ml',
    image: '/assets/diffuser-small-collection.jpg',
    imageAlt: 'MF120A desktop aroma diffuser in silver, rose gold, and black finishes',
    group: 'Small and personal spaces',
    detail: 'A practical starting point for guest rooms, salons, cafés, and smaller spaces.',
  },
  {
    model: 'MF300R',
    name: 'Commercial & discreet',
    coverage: '260–490m²',
    capacity: '175 ml',
    image: '/assets/diffuser-medium-collection.jpg',
    imageAlt: 'MF300R commercial aroma diffuser product photograph',
    group: 'Medium commercial spaces',
    detail: 'A compact commercial option for customer-facing environments and workspaces.',
  },
  {
    model: 'MS3000R',
    name: 'Large-space & standing',
    coverage: '670–1200m²',
    capacity: '500 ml / 1000 ml',
    image: '/assets/diffuser-large-collection.jpg',
    imageAlt: 'MS3000R standing aroma diffuser in multiple finishes',
    group: 'Large spaces and HVAC',
    detail: 'A freestanding option for hotel lobbies, malls, and larger shared environments.',
  },
];

const heroReveal = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Perfume() {
  const { t } = useLanguage();
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const [showAllIngredients, setShowAllIngredients] = useState(false);
  const [activeScent, setActiveScent] = useState(0);
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null);
  const visibleOils = showAllIngredients ? essentialOils : essentialOils.slice(0, 8);
  const visibleExtracts = showAllIngredients ? extracts : extracts.slice(0, 8);
  const openCatalogueGroup = (group: string) => {
    setOpenGroups((current) => current.includes(group) ? current : [...current, group]);
    setSelectedSpace(group);
    window.setTimeout(() => {
      const target = document.getElementById(`catalogue-${group.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`);
      if (!target) return;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      target.focus({ preventScroll: true });
    }, 0);
  };

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-stone-50 pt-20">
      <section className="relative isolate overflow-hidden border-b border-emerald-950/10 bg-emerald-950 text-white">
        <picture className="absolute inset-0 -z-20 block">
          <source media="(max-width: 767px)" srcSet="/assets/perfume-aroma-hero-mobile.jpg" />
          <img
            src="/assets/perfume-aroma-hero.jpg"
            alt="Aroma diffuser and fragrance oils arranged in a refined commercial interior"
            fetchPriority="high"
            sizes="100vw"
            className="h-full w-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-950 via-emerald-950/85 to-emerald-950/30" />
        <div className="mx-auto grid min-h-[31rem] max-w-7xl gap-8 px-5 py-12 sm:min-h-[34rem] sm:px-6 sm:py-16 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:px-8">
          <div className="max-w-3xl">
            <motion.p {...heroReveal(0.04)} className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-emerald-200">Monster Perfume</motion.p>
            <motion.h1 {...heroReveal(0.14)} className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">{t.products.scentDiv}</motion.h1>
            <motion.p {...heroReveal(0.24)} className="mt-5 max-w-2xl text-lg leading-relaxed text-emerald-100 md:mt-6 md:text-xl">{t.products.scentDesc}</motion.p>
            <motion.div {...heroReveal(0.34)} className="mt-7 grid gap-3 sm:mt-9 sm:flex">
              <Link to="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-emerald-950 transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] motion-safe:hover:-translate-y-0.5 hover:bg-emerald-100 active:scale-[0.98]">
                Request a recommendation <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#diffuser-catalogue" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-100/45 px-6 py-3 text-sm font-bold text-white transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] motion-safe:hover:-translate-y-0.5 hover:bg-white/10 active:scale-[0.98]">
                Explore systems <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
          <motion.div {...heroReveal(0.28)} className="border border-emerald-200/30 bg-emerald-950/85 p-6 sm:p-8">
            <Wind className="mb-4 h-8 w-8 text-emerald-200 sm:mb-6 sm:h-10 sm:w-10" />
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-200">Fragrance oils + systems</p>
            <h2 className="mt-2 text-xl font-bold sm:text-2xl">Choose the scent. Match the system.</h2>
            <p className="mt-2 text-base leading-relaxed text-emerald-100 md:mt-3">A practical route from fragrance direction to the right diffuser, coverage, and refill support for your space.</p>
          </motion.div>
        </div>
      </section>

      <section id="find-system" className="scroll-mt-24 bg-stone-100">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-24 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div className="max-w-xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">Find your scent system</p>
              <h2 className="mt-3 text-[1.9rem] font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl md:text-4xl">Start with the setting. We will take it from there.</h2>
            </div>
            <p className="max-w-2xl text-base leading-relaxed text-slate-600">Choose the type of space you are working with. Each route opens a curated group of suitable diffuser models, then you can refine the recommendation with our team.</p>
          </div>

          <div className="mt-9 grid gap-3 md:grid-cols-3 lg:mt-12">
            {spaceSolutions.map((solution, index) => (
              <motion.button
                key={solution.group}
                type="button"
                onClick={() => openCatalogueGroup(solution.group)}
                aria-pressed={selectedSpace === solution.group}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative min-h-[24rem] overflow-hidden border border-emerald-950/10 text-left text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 sm:min-h-[28rem] ${index === 1 ? 'md:translate-y-10' : ''}`}
              >
                <picture className="absolute inset-0 block">
                  <source media="(max-width: 767px)" srcSet={solution.mobileImage} />
                  <img src={solution.image} alt={solution.imageAlt} loading="lazy" decoding="async" sizes="(max-width: 767px) 100vw, 33vw" className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] motion-safe:group-hover:scale-[1.035]" />
                </picture>
                <span className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/58 to-emerald-950/5" />
                <span className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <span className="mb-10 flex items-center justify-between text-sm font-bold tracking-[0.12em] text-emerald-100">
                    <span>0{index + 1}</span>
                    <span>{solution.range}</span>
                  </span>
                  <span className="block text-2xl font-bold leading-tight">{solution.group}</span>
                  <span className="mt-3 block max-w-sm text-sm leading-relaxed text-emerald-50">{solution.spaces}</span>
                  <span className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white">
                    View suitable systems <ArrowRight className="h-4 w-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" />
                  </span>
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-white">
        <div className="mx-auto grid max-w-7xl gap-0 px-5 py-14 sm:px-6 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[28rem] overflow-hidden bg-stone-100 sm:min-h-[34rem]"
          >
            <picture className="absolute inset-0 block">
              <source media="(max-width: 767px)" srcSet="/assets/perfume-diffuser-feature-mobile.jpg" />
              <img src="/assets/perfume-diffuser-feature.jpg" alt="A premium commercial aroma diffuser with fragrance oil bottles" loading="lazy" decoding="async" sizes="(max-width: 767px) 100vw, 45vw" className="h-full w-full object-cover" />
            </picture>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="bg-emerald-950 p-7 text-white sm:p-10 lg:p-14"
          >
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-200">Featured system</p>
            <h2 className="mt-3 max-w-xl text-[1.9rem] font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl">Scent that looks considered, and works hard behind the scenes.</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-emerald-100">Our systems are selected around the atmosphere you want, the area you need to cover, and how discreetly the equipment should live in the space.</p>
            <ul className="mt-8 space-y-4 border-y border-emerald-200/20 py-6">
              {['Fragrance oils and equipment considered as one system', 'Formats for desktop, wall-mounted, standing, hanging, and HVAC-ready use', 'Practical support for refill, tuning, and consistency'].map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-emerald-50"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-200" />{point}</li>
              ))}
            </ul>
            <a href="#diffuser-catalogue" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-lg bg-white px-5 text-sm font-bold text-emerald-950 transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] motion-safe:hover:-translate-y-0.5 hover:bg-emerald-100 active:scale-[0.98]">
              See diffuser options <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>

      <section id="perfume-about" className="scroll-mt-24 bg-white">
        <div className="mx-auto grid max-w-7xl gap-0 px-5 py-14 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <picture className="block h-full">
              <source media="(max-width: 767px)" srcSet="/assets/perfume-development-mobile.jpg" />
              <img
                src="/assets/perfume-development.jpg"
                alt="Fragrance specialist blending aromatic oils and botanicals"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 767px) 100vw, 50vw"
                className="h-72 w-full object-cover sm:h-80 lg:h-full lg:min-h-[42rem]"
              />
            </picture>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white p-6 sm:p-10 lg:p-14"
          >
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">About Monster Perfume</p>
            <h2 className="mt-3 text-[1.75rem] font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl md:text-4xl">Scent made for the way a space is lived in.</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">Monster Perfume brings together fragrance direction, ingredient exploration, and practical aroma diffusion for homes and commercial environments. We begin with the atmosphere you want people to feel, then help shape a scent and system that supports it.</p>

            <div className="mt-8 border-t border-emerald-900/10 pt-7 sm:mt-10 sm:pt-8">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">Why choose us</p>
              <ol className="mt-6 space-y-4">
                {reasonsToChoose.map((reason) => (
                  <li key={reason.title} className="grid grid-cols-[2rem_1fr] gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-800"><Check className="h-4 w-4" /></span>
                    <div>
                      <h3 className="font-bold text-slate-950">{reason.title}</h3>
                      <p className="mt-1 text-base leading-relaxed text-slate-600 md:text-sm">{reason.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-24 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">The aroma system</p>
            <h2 className="mt-3 text-[1.75rem] font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl md:text-4xl">A complete scent programme, not just a diffuser.</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">From first brief to ongoing diffusion, each part of the system works together to make your space feel intentional and consistent.</p>
            <motion.picture
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 block overflow-hidden bg-stone-200"
            >
              <source media="(max-width: 767px)" srcSet="/assets/perfume-service-refill-mobile.jpg" />
              <img src="/assets/perfume-service-refill.jpg" alt="Fragrance specialist preparing a refill for an aroma diffuser" loading="lazy" decoding="async" sizes="(max-width: 767px) 100vw, 35vw" className="h-64 w-full object-cover sm:h-80" />
            </motion.picture>
          </div>
          <ol className="divide-y divide-emerald-900/10 border-y border-emerald-900/10">
            {aromaSystem.map((step, index) => (
              <motion.li
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="grid grid-cols-[2.25rem_1fr] gap-4 py-6 sm:grid-cols-[3.5rem_1fr] sm:gap-6"
              >
                <span className="text-sm font-bold text-emerald-700">{step.number}</span>
                <div className="flex gap-4">
                  <step.icon className="mt-0.5 h-6 w-6 shrink-0 text-emerald-700" />
                  <div>
                  <h3 className="text-xl font-bold text-slate-950">{step.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-slate-600 md:text-sm">{step.desc}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section id="scent-direction" className="scroll-mt-24 border-y border-emerald-900/10 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">The scent edit</p>
            <h2 className="mt-3 text-[1.75rem] font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl md:text-4xl">Find a scent people will remember the space by.</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">Start with the mood your space needs to create. These directions shape the ingredient story, then we tailor the final fragrance and its diffusion to suit the environment.</p>
          </div>
          <div role="tablist" aria-label="Scent directions" className="mt-7 grid grid-cols-3 gap-1 rounded-lg border border-emerald-900/10 bg-stone-50 p-1 md:hidden">
            {scentPalette.map((palette, index) => (
              <button
                key={palette.direction}
                type="button"
                role="tab"
                aria-selected={activeScent === index}
                aria-controls={`scent-panel-${index}`}
                onClick={() => setActiveScent(index)}
                className={`min-h-12 rounded-md px-2 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${activeScent === index ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:bg-white hover:text-slate-950'}`}
              >
                {palette.shortLabel}
              </button>
            ))}
          </div>
          <ol className="mt-5 overflow-hidden rounded-2xl border border-emerald-900/10 bg-white shadow-sm md:mt-10 md:rounded-none md:shadow-none">
            {scentPalette.map((palette, index) => (
              <motion.li
                key={palette.direction}
                id={`scent-panel-${index}`}
                role="tabpanel"
                aria-label={palette.direction}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.42, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className={`${activeScent === index ? 'grid' : 'hidden md:grid'} border-b border-emerald-900/10 last:border-b-0 md:grid-cols-2`}
              >
                <div className={`flex min-h-0 flex-col justify-center p-6 sm:p-10 md:min-h-72 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <p className="mb-4 text-sm font-bold tracking-[0.16em] text-slate-400 sm:mb-5">0{index + 1}</p>
                  <h3 className={`text-xl font-bold ${palette.color}`}>{palette.direction}</h3>
                  <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-600 md:text-sm">{palette.description}</p>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Ideal for: {palette.idealFor}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {palette.ingredients.map((ingredient) => (
                      <li key={ingredient} className="border border-emerald-900/10 bg-stone-50 px-3 py-1.5 text-xs font-bold text-slate-700">{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <picture className={`order-first block md:order-none ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <source media="(max-width: 767px)" srcSet={palette.mobileImage} />
                  <img
                    src={palette.image}
                    alt={palette.imageAlt}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 767px) 100vw, 50vw"
                    className="h-56 w-full object-cover sm:h-64 md:h-full"
                  />
                </picture>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-emerald-900 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-6 md:grid-cols-3 md:py-12 lg:px-8">
          {scentServices.map((service) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-emerald-400/45 pt-5"
            >
              <service.icon className="mb-4 h-7 w-7 text-emerald-200 sm:mb-6" />
              <h2 className="text-xl font-bold">{service.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-emerald-100 md:text-sm">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-y border-emerald-900/10 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20 lg:px-8">
          <div className="border border-emerald-900/10 bg-stone-50 p-5 sm:p-6 md:p-10">
            <div className="flex flex-col gap-5 border-b border-emerald-900/10 pb-7 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">Fragrance elements</p>
                <h2 className="mt-3 text-[1.75rem] font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl">{t.products.labTitle}</h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">{t.products.labDesc}</p>
              </div>
              <p className="shrink-0 text-sm font-bold text-emerald-800">{essentialOils.length + extracts.length} ingredients available</p>
            </div>
            <div className="mt-7 grid h-56 grid-cols-[1.08fr_0.92fr] gap-1 overflow-hidden sm:h-72">
              <picture className="block h-full overflow-hidden">
                <source media="(max-width: 767px)" srcSet="/assets/scent-fresh-mobile.jpg" />
                <img src="/assets/scent-fresh.jpg" alt="Grapefruit, lemon, peppermint, and fragrance oil" loading="lazy" decoding="async" sizes="(max-width: 767px) 55vw, 38vw" className="h-full w-full object-cover" />
              </picture>
              <div className="grid gap-1">
                <picture className="block overflow-hidden">
                  <source media="(max-width: 767px)" srcSet="/assets/scent-floral-mobile.jpg" />
                  <img src="/assets/scent-floral.jpg" alt="Jasmine and rose fragrance ingredients" loading="lazy" decoding="async" sizes="(max-width: 767px) 45vw, 30vw" className="h-full w-full object-cover" />
                </picture>
                <picture className="block overflow-hidden">
                  <source media="(max-width: 767px)" srcSet="/assets/scent-woody-mobile.jpg" />
                  <img src="/assets/scent-woody.jpg" alt="Cedarwood and sandalwood fragrance ingredients" loading="lazy" decoding="async" sizes="(max-width: 767px) 45vw, 30vw" className="h-full w-full object-cover" />
                </picture>
              </div>
            </div>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <div className="border border-emerald-900/10 bg-white p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-emerald-800"><Droplet className="h-5 w-5" /> Essential oils</h3>
                  <span className="text-xs font-bold text-emerald-700">{essentialOils.length} types</span>
                </div>
                <ul className="mt-5 grid gap-x-6 gap-y-3 text-base text-slate-600 sm:grid-cols-2 sm:gap-y-2 sm:text-sm">
                  {visibleOils.map((oil) => <li key={oil}>{oil}</li>)}
                </ul>
              </div>
              <div className="border border-amber-900/10 bg-white p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-amber-800"><TestTube className="h-5 w-5" /> Extracts</h3>
                  <span className="text-xs font-bold text-amber-700">{extracts.length} types</span>
                </div>
                <ul className="mt-5 grid gap-x-6 gap-y-3 text-base text-slate-600 sm:grid-cols-2 sm:gap-y-2 sm:text-sm">
                  {visibleExtracts.map((extract) => <li key={extract}>{extract}</li>)}
                </ul>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowAllIngredients((current) => !current)}
              aria-expanded={showAllIngredients}
              className="mt-7 inline-flex min-h-11 items-center gap-2 px-1 text-sm font-bold text-emerald-800 transition-colors hover:text-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
            >
              {showAllIngredients ? 'Show ingredient overview' : 'View full ingredient library'}
              <ChevronDown className={`h-4 w-4 transition-transform ${showAllIngredients ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </section>

      <section className="bg-stone-100">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-24 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">Featured diffuser formats</p>
              <h2 className="mt-3 text-[1.9rem] font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl md:text-4xl">A clear place to start, whatever the scale.</h2>
            </div>
            <p className="max-w-2xl text-base leading-relaxed text-slate-600">These selected formats show the practical range of the collection. Choose one to open the matching product group, or contact us for a recommendation based on your exact setting.</p>
          </div>

          <div className="mt-9 grid gap-4 lg:mt-12 lg:grid-cols-12">
            {featuredDiffusers.map((diffuser, index) => (
              <motion.article
                key={diffuser.model}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className={`overflow-hidden border border-emerald-950/10 bg-white ${index === 0 ? 'lg:col-span-5' : index === 1 ? 'lg:col-span-3' : 'lg:col-span-4'}`}
              >
                <div className={`bg-stone-50 p-5 ${index === 0 ? 'sm:p-8' : 'sm:p-6'}`}>
                  <img src={diffuser.image} alt={diffuser.imageAlt} loading="lazy" decoding="async" className={`w-full object-contain mix-blend-multiply ${index === 0 ? 'h-64 sm:h-80' : 'h-52 sm:h-60'}`} />
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">{diffuser.name}</p>
                      <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">{diffuser.model}</h3>
                    </div>
                    <span className="shrink-0 border border-emerald-900/10 px-2 py-1 text-xs font-bold text-emerald-800">{diffuser.coverage}</span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">{diffuser.detail}</p>
                  <div className="mt-5 flex items-center justify-between gap-4 border-t border-emerald-900/10 pt-4">
                    <span className="text-sm font-bold text-slate-700">{diffuser.capacity}</span>
                    <button type="button" onClick={() => openCatalogueGroup(diffuser.group)} className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-emerald-800 transition-colors hover:text-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">
                      View group <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="diffuser-catalogue" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-14 sm:px-6 md:py-24 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">Diffuser catalogue</p>
            <h2 className="mt-3 text-[1.75rem] font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl">{t.products.catalogTitle}</h2>
          </div>
          <a href="https://www.facebook.com/HqMonsterPerfume/" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">
            Follow Monster Perfume <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-9 divide-y divide-emerald-900/10 border-y border-emerald-900/10">
          {catalogGroups.map((group) => {
            const isOpen = openGroups.includes(group.title);
            const groupId = `catalogue-${group.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`;
            return (
              <div key={group.title}>
                <button
                  id={groupId}
                  type="button"
                  onClick={() => setOpenGroups((current) => current.includes(group.title) ? current.filter((title) => title !== group.title) : [...current, group.title])}
                  aria-expanded={isOpen}
                  className={`flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 ${selectedSpace === group.title ? 'bg-emerald-50/70' : ''}`}
                >
                  <span>
                    <span className="block text-xl font-bold text-slate-950">{group.title}</span>
                    <span className="mt-1 block text-base font-medium text-slate-500 sm:text-sm">{group.range} · {group.models.length} models</span>
                  </span>
                  <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
                    className="grid gap-4 pb-8 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    {group.models.map((diffuser) => (
                      <article key={diffuser.model} className="border border-emerald-900/10 bg-white p-5">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-lg font-bold text-slate-950">{diffuser.model}</h3>
                          <span className="shrink-0 bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-800">{diffuser.capacity}</span>
                        </div>
                        <p className="mt-3 text-base font-medium text-slate-500 md:text-sm">Coverage: {diffuser.coverage}</p>
                        <ul className="mt-5 space-y-2 text-base text-slate-600 md:text-sm">
                          {diffuser.features.slice(0, 3).map((feature) => <li key={feature}>{feature}</li>)}
                        </ul>
                        <p className="mt-5 border-t border-emerald-900/10 pt-4 text-sm leading-relaxed text-slate-500"><span className="font-bold text-slate-700">Suitable for:</span> {diffuser.applicable}</p>
                      </article>
                    ))}
                  </motion.div>
                )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-emerald-950 text-white">
        <picture className="absolute inset-0 -z-20 block">
          <source media="(max-width: 767px)" srcSet="/assets/perfume-space-hospitality-mobile.jpg" />
          <img src="/assets/perfume-space-hospitality.jpg" alt="Refined hospitality lobby enhanced with a discreet aroma diffuser" loading="lazy" decoding="async" sizes="100vw" className="h-full w-full object-cover" />
        </picture>
        <div className="absolute inset-0 -z-10 bg-emerald-950/85" />
        <div className="mx-auto flex min-h-[25rem] max-w-7xl items-end px-5 py-14 sm:px-6 md:min-h-[30rem] md:py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-200">Ready when your space is</p>
            <h2 className="mt-3 text-[2rem] font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">Tell us what your space should feel like.</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-emerald-100 sm:text-lg">Share the setting, coverage, and atmosphere you have in mind. We will help you choose a fragrance direction and a practical diffuser system to match.</p>
            <Link to="/contact" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-lg bg-white px-6 text-sm font-bold text-emerald-950 transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] motion-safe:hover:-translate-y-0.5 hover:bg-emerald-100 active:scale-[0.98]">
              Request your scent recommendation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
    </MotionConfig>
  );
}
