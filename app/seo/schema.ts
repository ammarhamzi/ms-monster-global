import { absoluteUrl, getRoute, type RouteRecord } from '../config/routes';
import { SITE } from '../config/site';

export interface LdNode {
  '@type': string;
  '@id'?: string;
  [key: string]: unknown;
}

export interface LdGraph {
  '@context': 'https://schema.org';
  '@graph': LdNode[];
}

const ORGANIZATION_ID = `${SITE.origin}/#organization`;
const WEBSITE_ID = `${SITE.origin}/#website`;

const corporationNode: LdNode = {
  '@type': 'Corporation',
  '@id': ORGANIZATION_ID,
  name: SITE.name,
  legalName: SITE.legalName,
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'SSM',
    value: SITE.registrationNumber,
  },
  foundingDate: SITE.foundingDate,
  url: SITE.origin,
  logo: absoluteUrl('/assets/brand/icon-512.png'),
  telephone: SITE.telephone,
  email: SITE.email,
  address: {
    streetAddress: SITE.address.streetAddress,
    addressLocality: SITE.address.addressLocality,
    addressRegion: SITE.address.addressRegion,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.addressCountry,
  },
  sameAs: [SITE.facebook],
  contactPoint: {
    telephone: SITE.telephone,
    email: SITE.email,
    availableLanguage: ['English', 'Malay'],
  },
  hasOfferCatalog: [
    {
      name: 'IT maintenance services',
      itemListElement: ['IT maintenance services'],
    },
    {
      name: 'Aroma and scent solutions',
      itemListElement: [
        'Commercial aroma solutions',
        'Aroma diffusers',
        'Custom fragrance development',
      ],
    },
  ],
};

const websiteNode: LdNode = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE.origin,
  name: SITE.name,
  publisher: { '@id': ORGANIZATION_ID },
  inLanguage: ['en', 'ms'],
};

const SERVICE_KEYS = new Set<RouteRecord['key']>([
  'it',
  'aroma',
  'diffusers',
  'fragrance',
]);

function serviceNodeFor(route: RouteRecord): LdNode | undefined {
  if (!SERVICE_KEYS.has(route.key)) {
    return undefined;
  }

  const url = absoluteUrl(route.path);
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: route.title,
    description: route.description,
    url,
    inLanguage: route.locale,
    provider: { '@id': ORGANIZATION_ID },
  };
}

function breadcrumbNodeFor(route: RouteRecord): LdNode {
  const home = getRoute(route.locale, 'home');
  const url = absoluteUrl(route.path);

  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: route.locale === 'ms' ? 'Utama' : 'Home',
        item: absoluteUrl(home.path),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: route.title,
        item: url,
      },
    ],
  };
}

export function buildSchema(route: RouteRecord): LdGraph {
  const serviceNode = serviceNodeFor(route);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      corporationNode,
      websiteNode,
      ...(serviceNode ? [serviceNode] : []),
      ...(route.key === 'home' ? [] : [breadcrumbNodeFor(route)]),
    ],
  };
}
