import { describe, expect, it } from 'vitest';
import { getRoute } from '../config/routes';
import { buildMeta, notFoundMeta, routeMeta } from './meta';

describe('route metadata', () => {
  it('emits a canonical and large social card', () => {
    const route = getRoute('en', 'it');
    const meta = buildMeta(route);

    expect(meta).toContainEqual({ title: route.title });
    expect(meta).toContainEqual({
      tagName: 'link',
      rel: 'canonical',
      href: 'https://msmonsterglobal.com/it-maintenance',
    });
    expect(meta).toContainEqual({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    expect(meta).toContainEqual({
      property: 'og:image',
      content: 'https://msmonsterglobal.com/assets/social/it-maintenance.jpg',
    });
  });

  it.each([
    {
      locale: 'en' as const,
      alternates: [
        {
          tagName: 'link',
          rel: 'alternate',
          hrefLang: 'en',
          href: 'https://msmonsterglobal.com/it-maintenance',
        },
        {
          tagName: 'link',
          rel: 'alternate',
          hrefLang: 'ms',
          href: 'https://msmonsterglobal.com/ms/penyelenggaraan-it',
        },
        {
          tagName: 'link',
          rel: 'alternate',
          hrefLang: 'x-default',
          href: 'https://msmonsterglobal.com/it-maintenance',
        },
      ],
    },
    {
      locale: 'ms' as const,
      alternates: [
        {
          tagName: 'link',
          rel: 'alternate',
          hrefLang: 'en',
          href: 'https://msmonsterglobal.com/it-maintenance',
        },
        {
          tagName: 'link',
          rel: 'alternate',
          hrefLang: 'ms',
          href: 'https://msmonsterglobal.com/ms/penyelenggaraan-it',
        },
        {
          tagName: 'link',
          rel: 'alternate',
          hrefLang: 'x-default',
          href: 'https://msmonsterglobal.com/it-maintenance',
        },
      ],
    },
  ])('emits all reciprocal alternates for the $locale route', ({ locale, alternates }) => {
    const meta = buildMeta(getRoute(locale, 'it'));

    expect(
      meta.filter(
        (descriptor) =>
          'tagName' in descriptor &&
          descriptor.tagName === 'link' &&
          descriptor.rel === 'alternate',
      ),
    ).toEqual(alternates);
  });

  it('localizes the unified perfume document and selects its social card', () => {
    const meta = buildMeta(getRoute('ms', 'perfume'));

    expect(meta).toContainEqual({
      name: 'description',
      content:
        'Terokai Perfume & Aroma MS Monster Global untuk perancangan ruang, sistem diffuser, 23 model terdokumen dan pembangunan wangian tersuai.',
    });
    expect(meta).toContainEqual({
      name: 'robots',
      content: 'index,follow,max-image-preview:large',
    });
    expect(meta).toContainEqual({ property: 'og:locale', content: 'ms_MY' });
    expect(meta).toEqual(
      expect.arrayContaining([
        { property: 'og:locale:alternate', content: 'en_MY' },
        {
          property: 'og:title',
          content: 'Perfume & Aroma Malaysia | MS Monster Global',
        },
        {
          property: 'og:description',
          content:
            'Terokai Perfume & Aroma MS Monster Global untuk perancangan ruang, sistem diffuser, 23 model terdokumen dan pembangunan wangian tersuai.',
        },
        {
          property: 'og:url',
          content: 'https://msmonsterglobal.com/ms/perfume',
        },
        {
          property: 'og:image',
          content: 'https://msmonsterglobal.com/assets/social/aroma-solutions.jpg',
        },
        {
          property: 'og:image:alt',
          content: 'Perfume & Aroma MS Monster Global',
        },
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'twitter:title',
          content: 'Perfume & Aroma Malaysia | MS Monster Global',
        },
        {
          name: 'twitter:description',
          content:
            'Terokai Perfume & Aroma MS Monster Global untuk perancangan ruang, sistem diffuser, 23 model terdokumen dan pembangunan wangian tersuai.',
        },
        {
          name: 'twitter:image',
          content: 'https://msmonsterglobal.com/assets/social/aroma-solutions.jpg',
        },
        {
          name: 'twitter:image:alt',
          content: 'Perfume & Aroma MS Monster Global',
        },
      ]),
    );
    expect(meta).toContainEqual({ property: 'og:image:width', content: '1200' });
    expect(meta).toContainEqual({ property: 'og:image:height', content: '630' });
    expect(meta).toContainEqual(
      expect.objectContaining({ 'script:ld+json': expect.any(Object) }),
    );
  });

  it('resolves route metadata from the location pathname', () => {
    expect(routeMeta({ location: { pathname: '/ms/hubungi/' } } as never)).toEqual(
      buildMeta(getRoute('ms', 'contact')),
    );
  });

  it('emits the complete not-found descriptor policy without canonical or JSON-LD', () => {
    expect(
      notFoundMeta({ location: { pathname: '/404' } } as never),
    ).toEqual([
      { title: 'Page Not Found | MS Monster Global' },
      {
        name: 'description',
        content: 'The page you requested is not available.',
      },
      { name: 'robots', content: 'noindex,nofollow' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'MS Monster Global' },
      {
        property: 'og:title',
        content: 'Page Not Found | MS Monster Global',
      },
      {
        property: 'og:description',
        content: 'The page you requested is not available.',
      },
      {
        property: 'og:image',
        content: 'https://msmonsterglobal.com/assets/social/corporate.jpg',
      },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      {
        property: 'og:image:alt',
        content: 'MS Monster Global IT maintenance and Perfume & Aroma solutions',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      {
        name: 'twitter:title',
        content: 'Page Not Found | MS Monster Global',
      },
      {
        name: 'twitter:description',
        content: 'The page you requested is not available.',
      },
      {
        name: 'twitter:image',
        content: 'https://msmonsterglobal.com/assets/social/corporate.jpg',
      },
      {
        name: 'twitter:image:alt',
        content: 'MS Monster Global IT maintenance and Perfume & Aroma solutions',
      },
    ]);
  });

  it('localizes not-found metadata from the requested Malay path', () => {
    const meta = notFoundMeta({
      location: { pathname: '/ms/halaman-tiada' },
    } as never);

    expect(meta).toContainEqual({
      title: 'Halaman Tidak Ditemukan | MS Monster Global',
    });
    expect(meta).toContainEqual({
      name: 'description',
      content: 'Halaman yang anda minta tidak tersedia.',
    });
    expect(meta).toContainEqual({
      property: 'og:image:alt',
      content: 'MS Monster Global penyelenggaraan IT dan Perfume & Aroma',
    });
  });
});
