import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import NotFoundRoute from './not-found';

describe('localized not-found route', () => {
  it('renders one Malay H1 with canonical Malay recovery links for a /ms path', () => {
    render(
      <MemoryRouter initialEntries={['/ms/halaman-tiada']}>
        <NotFoundRoute />
      </MemoryRouter>,
    );

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Halaman ini tidak tersedia',
    );
    expect(screen.getByRole('link', { name: 'Kembali ke laman utama' })).toHaveAttribute(
      'href',
      '/ms',
    );
    expect(screen.getByRole('link', { name: 'Hubungi pasukan kami' })).toHaveAttribute(
      'href',
      '/ms/hubungi',
    );
    expect(screen.queryByText('Page not found')).not.toBeInTheDocument();
  });
});
