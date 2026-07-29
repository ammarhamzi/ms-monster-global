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

describe.each(['en', 'ms'] as const)('diffuser catalogue in %s', (locale) => {
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

  it('omits the unresolved MF130R capacity row', () => {
    renderPage(<AromaDiffusersPage locale={locale} />);

    expect(screen.getByRole('heading', { level: 3, name: 'MF130R' }).closest('article')).not
      .toHaveTextContent('200 ml');
  });

  it('does not publish a contradictory broad coverage promise', () => {
    renderPage(<AromaDiffusersPage locale={locale} />);

    expect(screen.queryByText(/500\s*[–-]\s*2800m²/i)).not.toBeInTheDocument();
  });
});
