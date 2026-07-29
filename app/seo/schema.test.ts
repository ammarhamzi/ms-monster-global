import { describe, expect, it } from 'vitest';
import { getRoute } from '../config/routes';
import { buildSchema } from './schema';

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

  it('never emits unverified rich-result fields', () => {
    const serialized = JSON.stringify(buildSchema(getRoute('en', 'it')));
    for (const field of [
      'LocalBusiness',
      'aggregateRating',
      'openingHours',
      'geo',
      'price',
      'areaServed',
    ]) {
      expect(serialized).not.toContain(field);
    }
  });

  it('adds services only to factual service routes', () => {
    const service = buildSchema(getRoute('ms', 'fragrance'))['@graph'].find(
      (node) => node['@type'] === 'Service',
    );

    expect(service).toMatchObject({
      '@id': 'https://msmonsterglobal.com/ms/pembangunan-wangian-tersuai#service',
      description:
        'Bangunkan identiti haruman tersendiri melalui pembangunan wangian tersuai MS Monster Global untuk jenama, ruang, kempen dan pengalaman tetamu di Malaysia.',
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
          position: 1,
          name: 'Utama',
          item: 'https://msmonsterglobal.com/ms',
        },
        {
          position: 2,
          name: 'Hubungi MS Monster Global | Nilai, Negeri Sembilan',
          item: 'https://msmonsterglobal.com/ms/hubungi',
        },
      ],
    });
  });
});
