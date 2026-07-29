import {
  ArrowRight,
  ArrowUpRight,
  Facebook,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { MotionConfig, motion } from 'motion/react';
import SectionHeading from '../components/content/SectionHeading';
import type { Locale } from '../config/routes';
import { getRoute } from '../config/routes';
import { SITE } from '../config/site';
import { getContent } from '../content';

const address = [
  SITE.address.streetAddress,
  `${SITE.address.postalCode} ${SITE.address.addressLocality}`,
  SITE.address.addressRegion,
  'Malaysia',
].join(', ');

const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
const whatsappUrl = `https://wa.me/${SITE.telephone.slice(1)}`;

interface ContactPageProps {
  locale: Locale;
}

export default function ContactPage({ locale }: ContactPageProps) {
  const { contact, nav } = getContent(locale);
  const channels = [
    {
      key: 'address',
      icon: MapPin,
      content: contact.address,
      href: mapUrl,
      external: true,
      className: 'sm:col-span-2',
      iconClassName: 'bg-emerald-50 text-emerald-700',
    },
    {
      key: 'phone',
      icon: Phone,
      content: contact.phone,
      href: `tel:${SITE.telephone}`,
      external: false,
      className: '',
      iconClassName: 'bg-blue-50 text-blue-700',
    },
    {
      key: 'email',
      icon: Mail,
      content: contact.email,
      href: `mailto:${SITE.email}`,
      external: false,
      className: '',
      iconClassName: 'bg-amber-50 text-amber-700',
    },
    {
      key: 'whatsapp',
      icon: MessageCircle,
      content: contact.whatsapp,
      href: whatsappUrl,
      external: true,
      className: '',
      iconClassName: 'bg-green-50 text-green-700',
    },
    {
      key: 'facebook',
      icon: Facebook,
      content: contact.facebook,
      href: SITE.facebook,
      external: true,
      className: '',
      iconClassName: 'bg-blue-50 text-blue-700',
    },
  ] as const;

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-white pt-20">
        <header className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
            <nav aria-label={nav.breadcrumbLabel} className="mb-7 text-sm text-slate-500">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <a
                    href={getRoute(locale, 'home').path}
                    className="rounded-sm hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
                  >
                    {nav.home}
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-semibold text-slate-800">
                  {contact.breadcrumb}
                </li>
              </ol>
            </nav>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
              {contact.eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
              {contact.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
              {contact.introduction}
            </p>
          </div>
        </header>

        <section className="py-14 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow={contact.channelsEyebrow}
              title={contact.channelsTitle}
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 md:gap-5">
              {channels.map((channel, index) => {
                const Icon = channel.icon;

                return (
                  <motion.a
                    key={channel.key}
                    href={channel.href}
                    target={channel.external ? '_blank' : undefined}
                    rel={channel.external ? 'noreferrer' : undefined}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                    className={`group border border-slate-200 bg-white p-6 shadow-sm transition-[transform,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] motion-safe:hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 sm:p-8 ${channel.className}`}
                  >
                    <span
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${channel.iconClassName}`}
                    >
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-xl font-bold text-slate-950">
                      {channel.content.title}
                    </h3>
                    <p className="mt-2 break-words text-base leading-relaxed text-slate-600">
                      {channel.content.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-800">
                      {channel.content.action}
                      {channel.external ? (
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      )}
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-950 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-20 lg:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">
                {contact.enquiriesEyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                {contact.enquiriesTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
                {contact.enquiriesDescription}
              </p>
            </div>
            <div className="grid gap-3">
              <a
                href={getRoute(locale, 'aroma').path}
                className="inline-flex min-h-12 items-center justify-between gap-3 rounded-lg bg-white px-5 py-3 text-sm font-bold text-emerald-950 transition-colors hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {contact.aromaLink.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={getRoute(locale, 'it').path}
                className="inline-flex min-h-12 items-center justify-between gap-3 rounded-lg border border-blue-200/40 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {contact.itLink.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}
