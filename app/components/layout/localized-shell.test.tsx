import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import Footer from './Footer';
import Navbar from './Navbar';

describe('localized route shell', () => {
  it('uses Malay labels, registry destinations, and current-link state on a Malay route', () => {
    render(
      <MemoryRouter initialEntries={['/ms/tentang']}>
        <Navbar />
        <Footer />
      </MemoryRouter>,
    );

    const navigation = screen.getByRole('navigation', { name: 'Navigasi utama' });
    expect(within(navigation).getByRole('link', { name: 'Tentang' })).toHaveAttribute(
      'href',
      '/ms/tentang',
    );
    expect(within(navigation).getByRole('link', { name: 'Tentang' })).toHaveAttribute(
      'aria-current',
      'page',
    );

    const footer = screen.getByRole('contentinfo');
    expect(within(footer).getByRole('heading', { name: 'Syarikat' })).toBeInTheDocument();
    expect(within(footer).getByRole('link', { name: 'Muat turun' })).toHaveAttribute(
      'href',
      '/ms/muat-turun',
    );
    expect(footer.querySelector('a[href="/downloads"]')).not.toBeInTheDocument();
  });

  it('closes the mobile menu after a client-side navigation', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
      </MemoryRouter>,
    );

    const menuButton = screen.getByRole('button', { name: 'Open navigation menu' });
    await user.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    const contactLinks = screen.getAllByRole('link', { name: 'Contact' });
    await user.click(contactLinks.at(-1)!);

    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });
});
