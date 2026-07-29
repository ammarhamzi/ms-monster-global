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
  ['en', DownloadsPage, /Company profiles and brochures/i],
  ['ms', DownloadsPage, /Profil syarikat dan brosur/i],
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
  it('exposes every source PDF as an open and download link', () => {
    const { container } = render(<DownloadsPage locale={locale} />);
    const expectedDocuments = [
      '/downloads/ms-monster-it-maintenance-profile.pdf',
      '/downloads/ms-monster-perfume-profile.pdf',
      '/downloads/ms-monster-product-brochure.pdf',
    ];

    for (const href of expectedDocuments) {
      expect(container.querySelector(`a[href="${href}"]:not([download])`)).toBeInTheDocument();
      expect(container.querySelector(`a[href="${href}"][download]`)).toBeInTheDocument();
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
