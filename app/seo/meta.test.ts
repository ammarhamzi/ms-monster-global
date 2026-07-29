import { describe, expect, it } from 'vitest';
import { getRoute } from '../config/routes';
import { buildMeta, notFoundMeta, routeMeta } from './meta';

describe('route metadata', () => {
  it('emits canonical, reciprocal alternates, and large social cards', () => {
    const route = getRoute('en', 'it');
    const meta = buildMeta(route);

    expect(meta).toContainEqual({ title: route.title });
    expect(meta).toContainEqual({
      tagName: 'link',
      rel: 'canonical',
      href: 'https://msmonsterglobal.com/it-maintenance',
    });
    expect(meta).toContainEqual(
      expect.objectContaining({
        tagName: 'link',
        rel: 'alternate',
        hrefLang: 'ms',
        href: 'https://msmonsterglobal.com/ms/penyelenggaraan-it',
      }),
    );
    expect(meta).toContainEqual({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    expect(meta).toContainEqual({
      property: 'og:image',
      content: 'https://msmonsterglobal.com/assets/social/it-maintenance.jpg',
    });
  });

  it('localizes the document and selects social cards from the route registry', () => {
    const route = getRoute('ms', 'aroma');
    const meta = buildMeta(route);

    expect(meta).toContainEqual({ name: 'description', content: route.description });
    expect(meta).toContainEqual({
      name: 'robots',
      content: 'index,follow,max-image-preview:large',
    });
    expect(meta).toContainEqual({ property: 'og:locale', content: 'ms_MY' });
    expect(meta).toContainEqual({
      property: 'og:image',
      content: 'https://msmonsterglobal.com/assets/social/aroma-solutions.jpg',
    });
    expect(meta).toContainEqual({ property: 'og:image:width', content: '1200' });
    expect(meta).toContainEqual({ property: 'og:image:height', content: '630' });
    expect(meta).toContainEqual(
      expect.objectContaining({ property: 'og:image:alt', content: expect.any(String) }),
    );
    expect(meta).toContainEqual(
      expect.objectContaining({ name: 'twitter:image:alt', content: expect.any(String) }),
    );
    expect(meta).toContainEqual(
      expect.objectContaining({ 'script:ld+json': expect.any(Object) }),
    );
  });

  it('resolves route metadata from the location pathname', () => {
    expect(routeMeta({ location: { pathname: '/ms/hubungi/' } } as never)).toEqual(
      buildMeta(getRoute('ms', 'contact')),
    );
  });

  it('keeps not-found pages out of the index without a canonical', () => {
    const meta = notFoundMeta();

    expect(meta).toContainEqual({ name: 'robots', content: 'noindex,nofollow' });
    expect(meta).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ tagName: 'link', rel: 'canonical' }),
      ]),
    );
  });
});
