import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { diffusers } from '../data/products';
import AromaDiffusersPage from './AromaDiffusersPage';
import AromaSolutionsPage from './AromaSolutionsPage';
import CustomFragrancePage from './CustomFragrancePage';

beforeAll(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    class IntersectionObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
});

afterAll(() => {
  vi.unstubAllGlobals();
});

function renderPage(page: ReactNode) {
  return render(page);
}

describe.each([
  ['en', AromaSolutionsPage, 'Commercial Aroma Solutions'],
  ['ms', AromaSolutionsPage, 'Penyelesaian Aroma Komersial'],
  ['en', AromaDiffusersPage, 'Aroma diffusers for different environments'],
  ['ms', AromaDiffusersPage, 'Diffuser aroma untuk persekitaran berbeza'],
  ['en', CustomFragrancePage, 'Shape a scent identity around the experience'],
  ['ms', CustomFragrancePage, 'Bentuk identiti haruman mengikut pengalaman'],
] as const)('%s aroma page', (locale, Page, heading) => {
  it(`renders "${heading}" as the single H1`, () => {
    renderPage(<Page locale={locale} />);

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(heading);
  });
});

describe.each([
  [
    'en',
    ['Assess the space', 'Set the scent direction', 'Match the diffuser', 'Maintain the experience'],
  ],
  [
    'ms',
    ['Nilai ruang', 'Tetapkan arah wangian', 'Padankan diffuser', 'Kekalkan pengalaman'],
  ],
] as const)('aroma process in %s', (locale, steps) => {
  it('publishes the complete process in the selected language', () => {
    renderPage(<AromaSolutionsPage locale={locale} />);

    for (const step of steps) {
      expect(screen.getByRole('heading', { level: 3, name: step })).toBeInTheDocument();
    }
  });
});

describe.each([
  ['en', /develop samples/i, /OEM\/ODM/i],
  ['ms', /bangunkan sampel/i, /OEM\/ODM/i],
] as const)('custom fragrance scope in %s', (locale, sampling, oemOdm) => {
  it('states documented sampling and OEM/ODM support without manufacturing overreach', () => {
    const { container } = renderPage(<CustomFragrancePage locale={locale} />);

    expect(screen.getByText(sampling)).toBeInTheDocument();
    expect(screen.getAllByText(oemOdm).length).toBeGreaterThan(0);
    expect(container).not.toHaveTextContent(/manufactur|pembuatan|licen[cs]e|lesen/i);
  });
});

describe('Malay custom fragrance ingredients', () => {
  it('localizes ingredient chips and libraries while retaining technical names', () => {
    const { container } = renderPage(<CustomFragrancePage locale="ms" />);

    for (const label of ['Limau gedang', 'Minyak Pudina', 'Minyak Lada Hitam', 'Lobak merah']) {
      expect(container).toHaveTextContent(label);
    }
    expect(container).toHaveTextContent('Bois de Rose');
    expect(container).toHaveTextContent('Hoodia');
    expect(container).not.toHaveTextContent(/\bGrapefruit\b|\bPeppermint Oil\b|\bBlack Pepper Oil\b|\bCarrot\b/);
  });
});

describe.each([
  ['en', 'Primary catalogue format', 'Wall-mounted'],
  ['ms', 'Format katalog utama', 'Dipasang pada dinding'],
] as const)('diffuser catalogue in %s', (locale, formatLabel, formatValue) => {
  it('pre-renders all 23 model headings without an interaction', () => {
    const { container } = renderPage(<AromaDiffusersPage locale={locale} />);

    expect(container.querySelectorAll('details')).not.toHaveLength(0);
    const modelNames = new Set(diffusers.map((item) => item.model));
    const modelHeadings = screen
      .getAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent)
      .filter((heading): heading is string => heading !== null && modelNames.has(heading));
    expect(modelHeadings).toHaveLength(23);
    expect(modelHeadings.sort()).toEqual(diffusers.map((item) => item.model).sort());
  });

  it('labels the singular mounting value as the primary grouping format', () => {
    renderPage(<AromaDiffusersPage locale={locale} />);

    const article = screen.getByRole('heading', { level: 3, name: 'MF130R' }).closest('article');
    expect(article).toHaveTextContent(formatLabel);
    expect(article).toHaveTextContent(formatValue);
  });

  it('omits both disputed MF130R capacity values', () => {
    renderPage(<AromaDiffusersPage locale={locale} />);

    expect(screen.getByRole('heading', { level: 3, name: 'MF130R' }).closest('article')).not
      .toHaveTextContent(/\b(?:120|200)\s*ml\b/i);
  });

  it('does not publish a contradictory broad coverage promise', () => {
    renderPage(<AromaDiffusersPage locale={locale} />);

    expect(screen.queryByText(/500\s*[–-]\s*2800m²/i)).not.toBeInTheDocument();
  });
});
