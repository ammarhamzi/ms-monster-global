import { SITE } from './site';

export type Locale = 'en' | 'ms';
export type PageKey =
  | 'home'
  | 'about'
  | 'it'
  | 'aroma'
  | 'diffusers'
  | 'fragrance'
  | 'downloads'
  | 'contact';
export type SocialCard = 'corporate' | 'it' | 'aroma';

export interface RouteRecord {
  id: `${PageKey}-${Locale}`;
  key: PageKey;
  locale: Locale;
  path: string;
  title: string;
  description: string;
  socialCard: SocialCard;
}

export const ROUTES: RouteRecord[] = [
  {
    id: 'home-en',
    key: 'home',
    locale: 'en',
    path: '/',
    title: 'MS Monster Global | IT Maintenance & Aroma Solutions',
    description:
      'MS Monster Global provides dependable IT maintenance and commercial aroma solutions for Malaysian workplaces, retail spaces, and hospitality environments.',
    socialCard: 'corporate',
  },
  {
    id: 'home-ms',
    key: 'home',
    locale: 'ms',
    path: '/ms',
    title: 'MS Monster Global | Penyelenggaraan IT & Penyelesaian Aroma',
    description:
      'MS Monster Global menyediakan servis penyelenggaraan IT dan penyelesaian aroma komersial untuk tempat kerja, runcit dan hospitaliti di Malaysia.',
    socialCard: 'corporate',
  },
  {
    id: 'about-en',
    key: 'about',
    locale: 'en',
    path: '/about',
    title: 'About MS Monster Global Sdn Bhd | Nilai, Malaysia',
    description:
      'Learn about MS Monster Global Sdn Bhd, a Nilai-based company serving Malaysian organisations with practical IT maintenance and commercial aroma services.',
    socialCard: 'corporate',
  },
  {
    id: 'about-ms',
    key: 'about',
    locale: 'ms',
    path: '/ms/tentang',
    title: 'Tentang MS Monster Global Sdn Bhd | Nilai, Malaysia',
    description:
      'Ketahui tentang MS Monster Global Sdn Bhd, syarikat di Nilai yang menyediakan servis penyelenggaraan IT dan aroma komersial kepada organisasi Malaysia.',
    socialCard: 'corporate',
  },
  {
    id: 'it-en',
    key: 'it',
    locale: 'en',
    path: '/it-maintenance',
    title: 'IT Maintenance Services Malaysia | MS Monster Global',
    description:
      'MS Monster Global delivers practical IT maintenance services in Malaysia, supporting business computers, networks, troubleshooting, and ongoing technology needs.',
    socialCard: 'it',
  },
  {
    id: 'it-ms',
    key: 'it',
    locale: 'ms',
    path: '/ms/penyelenggaraan-it',
    title: 'Servis Penyelenggaraan IT Malaysia | MS Monster Global',
    description:
      'MS Monster Global menyediakan servis penyelenggaraan IT di Malaysia untuk komputer, rangkaian, penyelesaian masalah dan keperluan teknologi perniagaan.',
    socialCard: 'it',
  },
  {
    id: 'aroma-en',
    key: 'aroma',
    locale: 'en',
    path: '/commercial-aroma-solutions',
    title: 'Commercial Aroma Solutions Malaysia | MS Monster Global',
    description:
      'Create a welcoming atmosphere with commercial aroma solutions from MS Monster Global for Malaysian offices, retail environments, and hospitality spaces.',
    socialCard: 'aroma',
  },
  {
    id: 'aroma-ms',
    key: 'aroma',
    locale: 'ms',
    path: '/ms/penyelesaian-aroma-komersial',
    title: 'Penyelesaian Aroma Komersial Malaysia | MS Monster Global',
    description:
      'Cipta suasana yang mengalu-alukan dengan penyelesaian aroma komersial MS Monster Global untuk pejabat, runcit dan ruang hospitaliti di Malaysia.',
    socialCard: 'aroma',
  },
  {
    id: 'diffusers-en',
    key: 'diffusers',
    locale: 'en',
    path: '/aroma-diffusers',
    title: 'Commercial Aroma Diffusers Malaysia | MS Monster Global',
    description:
      'Explore commercial aroma diffusers from MS Monster Global for consistent scent delivery in Malaysian offices, stores, showrooms, and hospitality spaces.',
    socialCard: 'aroma',
  },
  {
    id: 'diffusers-ms',
    key: 'diffusers',
    locale: 'ms',
    path: '/ms/diffuser-aroma',
    title: 'Diffuser Aroma Komersial Malaysia | MS Monster Global',
    description:
      'Terokai diffuser aroma komersial MS Monster Global untuk penyebaran haruman konsisten di pejabat, kedai, bilik pameran dan ruang hospitaliti Malaysia.',
    socialCard: 'aroma',
  },
  {
    id: 'fragrance-en',
    key: 'fragrance',
    locale: 'en',
    path: '/custom-fragrance-development',
    title: 'Custom Fragrance Development Malaysia | MS Monster Global',
    description:
      'Develop a distinctive scent identity with custom fragrance development from MS Monster Global for Malaysian brands, spaces, campaigns, and guest experiences.',
    socialCard: 'aroma',
  },
  {
    id: 'fragrance-ms',
    key: 'fragrance',
    locale: 'ms',
    path: '/ms/pembangunan-wangian-tersuai',
    title: 'Pembangunan Wangian Tersuai Malaysia | MS Monster Global',
    description:
      'Bangunkan identiti haruman tersendiri melalui pembangunan wangian tersuai MS Monster Global untuk jenama, ruang, kempen dan pengalaman tetamu di Malaysia.',
    socialCard: 'aroma',
  },
  {
    id: 'downloads-en',
    key: 'downloads',
    locale: 'en',
    path: '/downloads',
    title: 'Company Profiles & Brochures | MS Monster Global',
    description:
      'Download MS Monster Global company profiles and brochures for an overview of our IT maintenance, commercial aroma solutions, diffusers, and fragrance services.',
    socialCard: 'corporate',
  },
  {
    id: 'downloads-ms',
    key: 'downloads',
    locale: 'ms',
    path: '/ms/muat-turun',
    title: 'Profil Syarikat & Brosur | MS Monster Global',
    description:
      'Muat turun profil syarikat dan brosur MS Monster Global untuk maklumat servis penyelenggaraan IT, aroma komersial, diffuser dan pembangunan wangian.',
    socialCard: 'corporate',
  },
  {
    id: 'contact-en',
    key: 'contact',
    locale: 'en',
    path: '/contact',
    title: 'Contact MS Monster Global | Nilai, Negeri Sembilan',
    description:
      'Contact MS Monster Global in Nilai, Negeri Sembilan to discuss IT maintenance, commercial aroma solutions, diffusers, custom fragrance, or company information.',
    socialCard: 'corporate',
  },
  {
    id: 'contact-ms',
    key: 'contact',
    locale: 'ms',
    path: '/ms/hubungi',
    title: 'Hubungi MS Monster Global | Nilai, Negeri Sembilan',
    description:
      'Hubungi MS Monster Global di Nilai, Negeri Sembilan untuk berbincang tentang penyelenggaraan IT, aroma komersial, diffuser, wangian tersuai atau maklumat syarikat.',
    socialCard: 'corporate',
  },
];

export const INDEXABLE_PATHS = ROUTES.map((route) => route.path);
export const PRERENDER_PATHS = [...INDEXABLE_PATHS, '/404'];

function normalizePath(pathname: string): string {
  return pathname === '/' ? pathname : pathname.replace(/\/+$/, '');
}

export function getRoute(locale: Locale, key: PageKey): RouteRecord {
  const route = ROUTES.find((candidate) => candidate.locale === locale && candidate.key === key);

  if (!route) {
    throw new Error(`Unknown route for locale "${locale}" and key "${key}".`);
  }

  return route;
}

export function getRouteByPath(pathname: string): RouteRecord {
  const normalizedPathname = normalizePath(pathname);
  const route = ROUTES.find((candidate) => candidate.path === normalizedPathname);

  if (!route) {
    throw new Error(`Unknown route pathname "${pathname}".`);
  }

  return route;
}

export function getCounterpart(route: RouteRecord): RouteRecord {
  const counterpartLocale: Locale = route.locale === 'en' ? 'ms' : 'en';
  return getRoute(counterpartLocale, route.key);
}

export function absoluteUrl(pathname: string): string {
  return `${SITE.origin}${normalizePath(pathname)}`;
}
