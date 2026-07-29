import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SITE } from '../config/site';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import DownloadsPage from './DownloadsPage';
import HomePage from './HomePage';

describe.each([
  ['en', HomePage, /Scent solutions and technology maintenance/i],
  ['ms', HomePage, /Penyelesaian aroma dan penyelenggaraan teknologi/i],
  ['en', AboutPage, /About MS Monster Global/i],
  ['ms', AboutPage, /Tentang MS Monster Global/i],
  ['en', DownloadsPage, /Product brochure and downloads/i],
  ['ms', DownloadsPage, /Brosur produk dan muat turun/i],
  ['en', ContactPage, /Contact MS Monster Global/i],
  ['ms', ContactPage, /Hubungi MS Monster Global/i],
] as const)('%s corporate page', (locale, Page, heading) => {
  it(`renders ${heading} as the single H1`, () => {
    render(<Page locale={locale} />);

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(heading);
  });
});

describe.each(['en', 'ms'] as const)('downloads in %s', (locale) => {
  it('publishes only the claim-safe product brochure', () => {
    const { container } = render(<DownloadsPage locale={locale} />);
    const publishedDocuments = [
      ...container.querySelectorAll<HTMLAnchorElement>('a[href$=".pdf"]'),
    ].map((link) => link.getAttribute('href'));

    expect(publishedDocuments).toEqual([
      '/downloads/ms-monster-product-brochure.pdf',
      '/downloads/ms-monster-product-brochure.pdf',
    ]);
  });
});

describe.each([
  [
    'en',
    'Perfume & Aroma',
    '/perfume',
    'IT maintenance',
    '/it-maintenance',
  ],
  [
    'ms',
    'Perfume & Aroma',
    '/ms/perfume',
    'Penyelenggaraan IT',
    '/ms/penyelenggaraan-it',
  ],
] as const)('downloads division paths in %s', (locale, aromaLabel, aromaPath, itLabel, itPath) => {
  it('links visibly to both localized service divisions', () => {
    render(<DownloadsPage locale={locale} />);

    expect(screen.getByRole('link', { name: aromaLabel })).toHaveAttribute('href', aromaPath);
    expect(screen.getByRole('link', { name: itLabel })).toHaveAttribute('href', itPath);
  });
});

describe.each([
  ['en', '/perfume'],
  ['ms', '/ms/perfume'],
] as const)('internal perfume CTAs in %s', (locale, perfumePath) => {
  it('use only the unified route or in-page anchors', () => {
    const pages = [
      <HomePage locale={locale} />,
      <AboutPage locale={locale} />,
      <DownloadsPage locale={locale} />,
      <ContactPage locale={locale} />,
    ];

    for (const page of pages) {
      const { container, unmount } = render(page);
      const perfumeLinks = [...container.querySelectorAll<HTMLAnchorElement>('a')].filter(
        (link) => {
          const href = link.getAttribute('href') ?? '';
          return (
            (href.startsWith('/') || href.startsWith('#')) &&
            /perfume|aroma|wangian|haruman|diffuser/i.test(link.textContent ?? '')
          );
        },
      );

      for (const link of perfumeLinks) {
        expect([perfumePath, '#diffuser-catalogue', '#custom-fragrance']).toContain(
          link.getAttribute('href'),
        );
      }
      unmount();
    }
  });
});

describe.each(['en', 'ms'] as const)('contact page in %s', (locale) => {
  it('exposes every direct contact channel as a native link', () => {
    const { container } = render(<ContactPage locale={locale} />);

    expect(container.querySelector(`a[href="tel:${SITE.telephone}"]`)).toBeInTheDocument();
    expect(container.querySelector(`a[href="mailto:${SITE.email}"]`)).toBeInTheDocument();
    expect(container.querySelector(`a[href="https://wa.me/${SITE.telephone.slice(1)}"]`)).toBeInTheDocument();
    expect(container.querySelector('a[href^="https://www.google.com/maps/search/"]')).toBeInTheDocument();
    expect(container.querySelector(`a[href="${SITE.facebook}"]`)).toBeInTheDocument();
  });
});
