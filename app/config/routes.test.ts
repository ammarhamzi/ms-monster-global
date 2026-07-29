import { describe, expect, it } from 'vitest';
import {
  INDEXABLE_PATHS,
  PRERENDER_PATHS,
  ROUTES,
  absoluteUrl,
  getCounterpart,
  getLocaleForPath,
  getRoute,
  getRouteByPath,
} from './routes';

describe('localized route registry', () => {
  it('defines eight reciprocal routes per locale', () => {
    expect(ROUTES).toHaveLength(16);
    expect(ROUTES.filter((route) => route.locale === 'en')).toHaveLength(8);
    expect(ROUTES.filter((route) => route.locale === 'ms')).toHaveLength(8);

    for (const route of ROUTES) {
      const counterpart = getCounterpart(route);
      expect(counterpart.locale).not.toBe(route.locale);
      expect(counterpart.key).toBe(route.key);
      expect(getCounterpart(counterpart).path).toBe(route.path);
    }
  });

  it('keeps paths, IDs, titles, and descriptions unique and complete', () => {
    expect(new Set(ROUTES.map((route) => route.path)).size).toBe(16);
    expect(new Set(ROUTES.map((route) => route.id)).size).toBe(16);

    for (const route of ROUTES) {
      expect(route.path).toMatch(/^\/(?:$|[a-z0-9/-]+$)/);
      expect(route.title.length).toBeGreaterThanOrEqual(25);
      expect(route.title.length).toBeLessThanOrEqual(65);
      expect(route.description.length).toBeGreaterThanOrEqual(110);
      expect(route.description.length).toBeLessThanOrEqual(165);
    }
  });

  it('exposes every indexable path to prerendering', () => {
    expect(INDEXABLE_PATHS).toEqual(ROUTES.map((route) => route.path));
    expect(PRERENDER_PATHS).toEqual([...INDEXABLE_PATHS, '/404']);
  });

  it('resolves normalized paths and absolute URLs', () => {
    expect(getRouteByPath('/ms/hubungi/')).toEqual(getRoute('ms', 'contact'));
    expect(absoluteUrl('/contact')).toBe('https://msmonsterglobal.com/contact');
  });

  it('derives the locale from both registered and missing paths', () => {
    expect(getLocaleForPath('/ms/diffuser-aroma')).toBe('ms');
    expect(getLocaleForPath('/ms/halaman-tiada')).toBe('ms');
    expect(getLocaleForPath('/missing')).toBe('en');
  });
});
