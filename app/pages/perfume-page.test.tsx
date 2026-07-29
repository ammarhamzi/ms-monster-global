import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { diffusers } from '../data/products';
import PerfumePage from './PerfumePage';

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

describe.each(['en', 'ms'] as const)('unified perfume page in %s', (locale) => {
  it('renders Perfume & Aroma as the single H1', () => {
    renderPage(<PerfumePage locale={locale} />);

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Perfume & Aroma',
    );
  });

  it('publishes the complete localized service process', () => {
    const steps =
      locale === 'en'
        ? [
            'Assess the space',
            'Set the scent direction',
            'Match the diffuser',
            'Maintain the experience',
          ]
        : [
            'Nilai ruang',
            'Tetapkan arah wangian',
            'Padankan diffuser',
            'Kekalkan pengalaman',
          ];
    renderPage(<PerfumePage locale={locale} />);

    for (const step of steps) {
      expect(screen.getByRole('heading', { level: 3, name: step })).toBeInTheDocument();
    }
  });

  it('pre-renders all 23 documented diffuser models', () => {
    const { container } = renderPage(<PerfumePage locale={locale} />);
    const modelNames = new Set(diffusers.map((item) => item.model));
    const modelHeadings = [...container.querySelectorAll('h3')]
      .map((heading) => heading.textContent)
      .filter((heading): heading is string => heading !== null && modelNames.has(heading));

    expect(modelHeadings).toHaveLength(23);
    expect(modelHeadings.sort()).toEqual(diffusers.map((item) => item.model).sort());
    expect(container.querySelectorAll('details')).not.toHaveLength(0);
  });

  it('states sampling and OEM/ODM boundaries without manufacturing overreach', () => {
    const sampling = locale === 'en' ? /develop samples/i : /bangunkan sampel/i;
    const { container } = renderPage(<PerfumePage locale={locale} />);

    expect(screen.getByText(sampling)).toBeInTheDocument();
    expect(screen.getAllByText(/OEM\/ODM/i).length).toBeGreaterThan(0);
    expect(container).not.toHaveTextContent(/manufactur|pembuatan|licen[cs]e|lesen/i);
  });
});

describe.each(['en', 'ms'] as const)('unified diffuser catalogue in %s', (locale) => {
  it('labels the singular mounting value as the primary grouping format', () => {
    renderPage(<PerfumePage locale={locale} />);

    const article = screen.getByRole('heading', { level: 3, name: 'MF130R' }).closest('article');
    expect(article).toHaveTextContent(
      locale === 'en' ? 'Primary catalogue format' : 'Format katalog utama',
    );
    expect(article).toHaveTextContent(
      locale === 'en' ? 'Wall-mounted' : 'Dipasang pada dinding',
    );
  });

  it('omits both disputed MF130R capacity values', () => {
    renderPage(<PerfumePage locale={locale} />);

    expect(screen.getByRole('heading', { level: 3, name: 'MF130R' }).closest('article')).not
      .toHaveTextContent(/\b(?:120|200)\s*ml\b/i);
  });

  it('does not publish a contradictory broad coverage promise', () => {
    renderPage(<PerfumePage locale={locale} />);

    expect(screen.queryByText(/500\s*[–-]\s*2800m²/i)).not.toBeInTheDocument();
  });
});

describe('Malay unified perfume content', () => {
  it('localizes ingredient chips and libraries while retaining technical names', () => {
    const { container } = renderPage(<PerfumePage locale="ms" />);

    for (const label of ['Limau gedang', 'Minyak Pudina', 'Minyak Lada Hitam', 'Lobak merah']) {
      expect(container).toHaveTextContent(label);
    }
    expect(container).toHaveTextContent('Bois de Rose');
    expect(container).toHaveTextContent('Hoodia');
    expect(container).not.toHaveTextContent(
      /\bGrapefruit\b|\bPeppermint Oil\b|\bBlack Pepper Oil\b|\bCarrot\b/,
    );
  });
});
