import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import LanguageSwitcher from './LanguageSwitcher';

describe.each([
  {
    path: '/it-maintenance',
    currentLabel: 'EN',
    counterpartLabel: 'BM',
    counterpartPath: '/ms/penyelenggaraan-it',
    counterpartLocale: 'ms',
  },
  {
    path: '/ms/diffuser-aroma',
    currentLabel: 'BM',
    counterpartLabel: 'EN',
    counterpartPath: '/aroma-diffusers',
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
