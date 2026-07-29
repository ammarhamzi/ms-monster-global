import { describe, expect, it } from 'vitest';
import { getRoute, ROUTES } from '../config/routes';
import { buildSchema } from './schema';

const PROHIBITED_SCHEMA_TERMS = [
  'LocalBusiness',
  '"@type":"Product"',
  'aggregateRating',
  'ratingValue',
  'review',
  'openingHours',
  'geo',
  'latitude',
  'longitude',
  'price',
  'priceCurrency',
  'areaServed',
  'national coverage',
  'nationwide',
  'AMECO',
  'licence',
  'license',
  '24/7',
  'guarantee',
  'clientCount',
  'client count',
  'clients served',
  'accreditation',
  'testimonial',
];

describe('structured data policy', () => {
  it('publishes the verified corporation identity', () => {
    const graph = buildSchema(getRoute('en', 'home'))['@graph'];
    const corporation = graph.find((node) => node['@type'] === 'Corporation');

    expect(corporation).toMatchObject({
      '@id': 'https://msmonsterglobal.com/#organization',
      legalName: 'MS Monster Global Sdn Bhd',
      foundingDate: '2022-11-16',
      telephone: '+60126665658',
      email: 'solehin@msmonsterglobal.com',
      url: 'https://msmonsterglobal.com',
      logo: 'https://msmonsterglobal.com/assets/brand/icon-512.png',
      identifier: {
        '@type': 'PropertyValue',
        propertyID: 'SSM',
        value: '202201042816 (1488513-W)',
      },
      address: {
        streetAddress: 'No 31-G, No 31-1, No 31-2, Jalan BBN 6/3B, Desa Cempaka, Putra Nilai',
        addressLocality: 'Nilai',
        addressRegion: 'Negeri Sembilan',
        postalCode: '71800',
        addressCountry: 'MY',
      },
      sameAs: ['https://www.facebook.com/HqMonsterPerfume/'],
      contactPoint: {
        availableLanguage: ['English', 'Malay'],
      },
    });
    expect(corporation?.hasOfferCatalog).toHaveLength(2);
  });

  it('never emits prohibited schema types, fields, or claims on any route', () => {
    for (const route of ROUTES) {
      const serialized = JSON.stringify(buildSchema(route)).toLowerCase();

      for (const term of PROHIBITED_SCHEMA_TERMS) {
        expect(serialized, `${route.path} emitted prohibited term "${term}"`).not.toContain(
          term.toLowerCase(),
        );
      }
    }
  });

  it('adds services only to factual service routes', () => {
    const service = buildSchema(getRoute('ms', 'perfume'))['@graph'].find(
      (node) => node['@type'] === 'Service',
    );

    expect(service).toMatchObject({
      '@id': 'https://msmonsterglobal.com/ms/perfume#service',
      description:
        'Terokai Perfume & Aroma MS Monster Global untuk perancangan ruang, sistem diffuser, 23 model terdokumen dan pembangunan wangian tersuai.',
      provider: { '@id': 'https://msmonsterglobal.com/#organization' },
    });
    expect(buildSchema(getRoute('en', 'about'))['@graph']).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ '@type': 'Service' })]),
    );
  });

  it('omits breadcrumbs on home routes and localizes non-home trails', () => {
    expect(buildSchema(getRoute('en', 'home'))['@graph']).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ '@type': 'BreadcrumbList' })]),
    );

    const breadcrumb = buildSchema(getRoute('ms', 'contact'))['@graph'].find(
      (node) => node['@type'] === 'BreadcrumbList',
    );
    expect(breadcrumb).toMatchObject({
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Utama',
          item: 'https://msmonsterglobal.com/ms',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Hubungi MS Monster Global | Nilai, Negeri Sembilan',
          item: 'https://msmonsterglobal.com/ms/hubungi',
        },
      ],
    });
  });
});
