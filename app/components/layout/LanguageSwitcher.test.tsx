import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { afterEach, describe, expect, it } from 'vitest';
import { getContent } from '../../content';
import LanguageSwitcher from './LanguageSwitcher';

const malayNav = getContent('ms').nav;
const originalLanguageSelectionLabel = malayNav.languageSelectionLabel;

afterEach(() => {
  malayNav.languageSelectionLabel = originalLanguageSelectionLabel;
});

describe.each([
  {
    path: '/it-maintenance',
    currentLabel: 'EN',
    counterpartLabel: 'BM',
    counterpartPath: '/ms/penyelenggaraan-it',
    counterpartLocale: 'ms',
  },
  {
    path: '/ms/perfume',
    currentLabel: 'BM',
    counterpartLabel: 'EN',
    counterpartPath: '/perfume',
    counterpartLocale: 'en',
  },
] as const)('language switching from $path', ({
  path,
  currentLabel,
  counterpartLabel,
  counterpartPath,
  counterpartLocale,
}) => {
  it('uses a crawlable localized counterpart link without language-state buttons', () => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <LanguageSwitcher />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: counterpartLabel })).toHaveAttribute(
      'href',
      counterpartPath,
    );
    expect(screen.getByRole('link', { name: counterpartLabel })).toHaveAttribute(
      'hreflang',
      counterpartLocale,
    );
    expect(screen.getByRole('link', { name: currentLabel })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});

it('reads the language-selection label from canonical Malay content', () => {
  malayNav.languageSelectionLabel = 'Pilihan bahasa daripada kandungan';

  const { container } = render(
    <MemoryRouter initialEntries={['/ms']}>
      <LanguageSwitcher />
    </MemoryRouter>,
  );

  expect(
    container.querySelector('[aria-label="Pilihan bahasa daripada kandungan"]'),
  ).toBeInTheDocument();
});
