import type { MetaArgs, MetaDescriptor } from 'react-router';
import {
  absoluteUrl,
  getCounterpart,
  getRouteByPath,
  type Locale,
  type RouteRecord,
  type SocialCard,
} from '../config/routes';
import { SITE } from '../config/site';
import { buildSchema } from './schema';

const SOCIAL_CARD_PATHS: Record<SocialCard, string> = {
  corporate: '/assets/social/corporate.jpg',
  it: '/assets/social/it-maintenance.jpg',
  aroma: '/assets/social/aroma-solutions.jpg',
};

const SOCIAL_CARD_ALT: Record<Locale, Record<SocialCard, string>> = {
  en: {
    corporate: 'MS Monster Global IT maintenance and Perfume & Aroma solutions',
    it: 'MS Monster Global IT maintenance services',
    aroma: 'MS Monster Global Perfume & Aroma solutions',
  },
  ms: {
    corporate: 'MS Monster Global penyelenggaraan IT dan Perfume & Aroma',
    it: 'Servis penyelenggaraan IT MS Monster Global',
    aroma: 'Perfume & Aroma MS Monster Global',
  },
};

export function buildMeta(route: RouteRecord): MetaDescriptor[] {
  const counterpart = getCounterpart(route);
  const englishRoute = route.locale === 'en' ? route : counterpart;
  const malayRoute = route.locale === 'ms' ? route : counterpart;
  const canonicalUrl = absoluteUrl(route.path);
  const imageUrl = absoluteUrl(SOCIAL_CARD_PATHS[route.socialCard]);
  const imageAlt = SOCIAL_CARD_ALT[route.locale][route.socialCard];
  const ogLocale = route.locale === 'ms' ? 'ms_MY' : 'en_MY';
  const ogAlternateLocale = route.locale === 'ms' ? 'en_MY' : 'ms_MY';

  return [
    { title: route.title },
    { name: 'description', content: route.description },
    { name: 'robots', content: 'index,follow,max-image-preview:large' },
    { tagName: 'link', rel: 'canonical', href: canonicalUrl },
    {
      tagName: 'link',
      rel: 'alternate',
      hrefLang: 'en',
      href: absoluteUrl(englishRoute.path),
    },
    {
      tagName: 'link',
      rel: 'alternate',
      hrefLang: 'ms',
      href: absoluteUrl(malayRoute.path),
    },
    {
      tagName: 'link',
      rel: 'alternate',
      hrefLang: 'x-default',
      href: absoluteUrl(englishRoute.path),
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: SITE.name },
    { property: 'og:title', content: route.title },
    { property: 'og:description', content: route.description },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:locale', content: ogLocale },
    { property: 'og:locale:alternate', content: ogAlternateLocale },
    { property: 'og:image', content: imageUrl },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: imageAlt },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: route.title },
    { name: 'twitter:description', content: route.description },
    { name: 'twitter:image', content: imageUrl },
    { name: 'twitter:image:alt', content: imageAlt },
    { 'script:ld+json': buildSchema(route) },
  ];
}

export function routeMeta({ location }: MetaArgs): MetaDescriptor[] {
  return buildMeta(getRouteByPath(location.pathname));
}

export function notFoundMeta(): MetaDescriptor[] {
  const title = `Page Not Found | ${SITE.name}`;
  const description = 'The page you requested is not available.';
  const imageUrl = absoluteUrl(SOCIAL_CARD_PATHS.corporate);
  const imageAlt = SOCIAL_CARD_ALT.en.corporate;

  return [
    { title },
    { name: 'description', content: description },
    { name: 'robots', content: 'noindex,nofollow' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: SITE.name },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: imageUrl },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: imageAlt },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: imageUrl },
    { name: 'twitter:image:alt', content: imageAlt },
  ];
}
