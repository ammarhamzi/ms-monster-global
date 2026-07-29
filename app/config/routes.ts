import { SITE } from './site';

export type Locale = 'en' | 'ms';
export type PageKey =
  | 'home'
  | 'about'
  | 'it'
  | 'perfume'
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
    title: 'MS Monster Global | IT Maintenance, Perfume & Aroma',
    description:
      'MS Monster Global provides dependable IT maintenance and Perfume & Aroma solutions for Malaysian workplaces, retail spaces, and hospitality environments.',
    socialCard: 'corporate',
  },
  {
    id: 'home-ms',
    key: 'home',
    locale: 'ms',
    path: '/ms',
    title: 'MS Monster Global | Penyelenggaraan IT, Perfume & Aroma',
    description:
      'MS Monster Global menyediakan penyelenggaraan IT serta Perfume & Aroma untuk tempat kerja, persekitaran runcit dan ruang hospitaliti di Malaysia.',
    socialCard: 'corporate',
  },
  {
    id: 'about-en',
    key: 'about',
    locale: 'en',
    path: '/about',
    title: 'About MS Monster Global Sdn Bhd | Nilai, Malaysia',
    description:
      'Learn about MS Monster Global Sdn Bhd, a Nilai-based company serving Malaysian organisations with practical IT maintenance and Perfume & Aroma solutions.',
    socialCard: 'corporate',
  },
  {
    id: 'about-ms',
    key: 'about',
    locale: 'ms',
    path: '/ms/tentang',
    title: 'Tentang MS Monster Global Sdn Bhd | Nilai, Malaysia',
    description:
      'Ketahui tentang MS Monster Global Sdn Bhd, syarikat di Nilai yang menyediakan penyelenggaraan IT serta Perfume & Aroma kepada organisasi Malaysia.',
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
    id: 'perfume-en',
    key: 'perfume',
    locale: 'en',
    path: '/perfume',
    title: 'Perfume & Aroma Solutions Malaysia | MS Monster Global',
    description:
      'Explore Perfume & Aroma solutions from MS Monster Global, including space planning, 23 documented diffuser models, and custom fragrance development.',
    socialCard: 'aroma',
  },
  {
    id: 'perfume-ms',
    key: 'perfume',
    locale: 'ms',
    path: '/ms/perfume',
    title: 'Perfume & Aroma Malaysia | MS Monster Global',
    description:
      'Terokai Perfume & Aroma MS Monster Global untuk perancangan ruang, sistem diffuser, 23 model terdokumen dan pembangunan wangian tersuai.',
    socialCard: 'aroma',
  },
  {
    id: 'downloads-en',
    key: 'downloads',
    locale: 'en',
    path: '/downloads',
    title: 'Product Brochure & Downloads | MS Monster Global',
    description:
      'Download the MS Monster Global product brochure for documented diffuser models, coverage, capacity, mounting options, and fragrance oil information.',
    socialCard: 'corporate',
  },
  {
    id: 'downloads-ms',
    key: 'downloads',
    locale: 'ms',
    path: '/ms/muat-turun',
    title: 'Brosur Produk & Muat Turun | MS Monster Global',
    description:
      'Muat turun brosur produk MS Monster Global untuk model diffuser terdokumen, liputan, kapasiti, pilihan pemasangan dan maklumat minyak wangian.',
    socialCard: 'corporate',
  },
  {
    id: 'contact-en',
    key: 'contact',
    locale: 'en',
    path: '/contact',
    title: 'Contact MS Monster Global | Nilai, Negeri Sembilan',
    description:
      'Contact MS Monster Global in Nilai, Negeri Sembilan to discuss IT maintenance, Perfume & Aroma, diffuser systems, custom fragrance, or company information.',
    socialCard: 'corporate',
  },
  {
    id: 'contact-ms',
    key: 'contact',
    locale: 'ms',
    path: '/ms/hubungi',
    title: 'Hubungi MS Monster Global | Nilai, Negeri Sembilan',
    description:
      'Hubungi MS Monster Global di Nilai untuk berbincang tentang penyelenggaraan IT, Perfume & Aroma, sistem diffuser, wangian tersuai atau maklumat syarikat.',
    socialCard: 'corporate',
  },
];

export const INDEXABLE_PATHS = ROUTES.map((route) => route.path);
export const PRERENDER_PATHS = [...INDEXABLE_PATHS, '/404', '/ms/404'];

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

export function getLocaleForPath(pathname: string): Locale {
  try {
    return getRouteByPath(pathname).locale;
  } catch {
    return normalizePath(pathname).startsWith('/ms/') ||
      normalizePath(pathname) === '/ms'
      ? 'ms'
      : 'en';
  }
}

export function getCounterpart(route: RouteRecord): RouteRecord {
  const counterpartLocale: Locale = route.locale === 'en' ? 'ms' : 'en';
  return getRoute(counterpartLocale, route.key);
}

export function absoluteUrl(pathname: string): string {
  return `${SITE.origin}${normalizePath(pathname)}`;
}
