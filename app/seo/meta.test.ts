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

  it('localizes the document and selects social cards from the route registry', () => {
    const meta = buildMeta(getRoute('ms', 'aroma'));

    expect(meta).toContainEqual({
      name: 'description',
      content:
        'Cipta suasana yang mengalu-alukan dengan penyelesaian aroma komersial MS Monster Global untuk pejabat, runcit dan ruang hospitaliti di Malaysia.',
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
          content: 'Penyelesaian Aroma Komersial Malaysia | MS Monster Global',
        },
        {
          property: 'og:description',
          content:
            'Cipta suasana yang mengalu-alukan dengan penyelesaian aroma komersial MS Monster Global untuk pejabat, runcit dan ruang hospitaliti di Malaysia.',
        },
        {
          property: 'og:url',
          content: 'https://msmonsterglobal.com/ms/penyelesaian-aroma-komersial',
        },
        {
          property: 'og:image',
          content: 'https://msmonsterglobal.com/assets/social/aroma-solutions.jpg',
        },
        {
          property: 'og:image:alt',
          content: 'Penyelesaian aroma komersial MS Monster Global',
        },
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'twitter:title',
          content: 'Penyelesaian Aroma Komersial Malaysia | MS Monster Global',
        },
        {
          name: 'twitter:description',
          content:
            'Cipta suasana yang mengalu-alukan dengan penyelesaian aroma komersial MS Monster Global untuk pejabat, runcit dan ruang hospitaliti di Malaysia.',
        },
        {
          name: 'twitter:image',
          content: 'https://msmonsterglobal.com/assets/social/aroma-solutions.jpg',
        },
        {
          name: 'twitter:image:alt',
          content: 'Penyelesaian aroma komersial MS Monster Global',
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
    expect(notFoundMeta()).toEqual([
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
        content: 'MS Monster Global IT maintenance and commercial aroma solutions',
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
        content: 'MS Monster Global IT maintenance and commercial aroma solutions',
      },
    ]);
  });
});
