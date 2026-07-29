import type { ReactElement } from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter, useLocation, useNavigate } from 'react-router';
import { describe, expect, it } from 'vitest';
import DownloadCard from './components/downloads/DownloadCard';
import Breadcrumbs from './components/layout/Breadcrumbs';
import Footer from './components/layout/Footer';
import LanguageSwitcher from './components/layout/LanguageSwitcher';
import Navbar from './components/layout/Navbar';
import { getContent } from './content';
import AboutPage from './pages/AboutPage';
import AromaDiffusersPage from './pages/AromaDiffusersPage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import ItMaintenancePage from './pages/ItMaintenancePage';
import AromaRoute from './routes/aroma';

function renderAt(pathname: string, element: ReactElement) {
  return render(
    <MemoryRouter initialEntries={[pathname]}>
      {element}
    </MemoryRouter>,
  );
}

function PathnameControl() {
  const navigate = useNavigate();

  return (
    <button type="button" onClick={() => navigate('/contact')}>
      Change pathname
    </button>
  );
}

function PathnameProbe() {
  const { pathname } = useLocation();

  return <output aria-label="Current pathname">{pathname}</output>;
}

describe.each([
  ['home', '/', <HomePage locale="en" />],
  ['contact', '/contact', <ContactPage locale="en" />],
  ['IT maintenance', '/it-maintenance', <ItMaintenancePage locale="en" />],
  ['diffuser catalogue', '/aroma-diffusers', <AromaDiffusersPage locale="en" />],
] as const)('%s page semantics', (_name, pathname, page) => {
  it('has exactly one H1 and does not skip heading levels', () => {
    const { container } = renderAt(pathname, page);
    const headings = [...container.querySelectorAll('h1, h2, h3, h4, h5, h6')];
    const levels = headings.map((heading) => Number(heading.tagName.slice(1)));

    expect(levels.filter((level) => level === 1)).toHaveLength(1);
    for (let index = 1; index < levels.length; index += 1) {
      expect(levels[index] - levels[index - 1]).toBeLessThanOrEqual(1);
    }
  });

  it('gives informative images stable intrinsic dimensions and useful alternatives', () => {
    const { container } = renderAt(pathname, page);
    const images = [...container.querySelectorAll('img')];

    for (const image of images) {
      expect(image).toHaveAttribute('alt');
      expect(image.getAttribute('alt')?.trim()).not.toBe('');
      expect(Number(image.getAttribute('width'))).toBeGreaterThan(0);
      expect(Number(image.getAttribute('height'))).toBeGreaterThan(0);
    }
  });

  it('hides decorative SVG icons from the accessibility tree', () => {
    const { container } = renderAt(pathname, page);

    for (const icon of container.querySelectorAll('svg')) {
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    }
  });
});

describe('About page heading identity', () => {
  it('labels incorporation and company history with distinct H2 names', () => {
    render(<AboutPage locale="en" />);
    const names = screen
      .getAllByRole('heading', { level: 2 })
      .map((heading) => heading.textContent?.trim());

    expect(new Set(names).size).toBe(names.length);
  });
});

describe('shell accessible names and states', () => {
  it('labels navigation, language selection, menu disclosure, and the current page', () => {
    renderAt(
      '/about',
      <>
        <Navbar />
        <LanguageSwitcher />
      </>,
    );

    const navigation = screen.getByRole('navigation', { name: 'Primary navigation' });
    expect(
      within(navigation).getByRole('link', { name: /MS Monster Global/ }),
    ).toHaveAccessibleName(/MS Monster Global/);
    expect(
      within(navigation).getByRole('button', { name: 'Open navigation menu' }),
    ).toHaveAttribute('aria-expanded', 'false');
    expect(
      within(navigation).getByRole('link', { name: 'About' }),
    ).toHaveAttribute('aria-current', 'page');
    expect(
      screen.getAllByRole('group', { name: 'Language selection' }).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'EN' }).at(-1)).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('renders short shell links with both 44px target guardrails', () => {
    renderAt(
      '/',
      <>
        <Navbar />
        <Breadcrumbs locale="en" current="Current page" />
        <Footer />
      </>,
    );

    const shortLinks = [
      within(
        screen.getByRole('navigation', { name: 'Primary navigation' }),
      ).getByRole('link', { name: 'Home' }),
      within(
        screen.getByRole('navigation', { name: 'Breadcrumb' }),
      ).getByRole('link', { name: 'Home' }),
      within(screen.getByRole('contentinfo')).getByRole('link', {
        name: 'Home',
      }),
    ];

    for (const link of shortLinks) {
      expect(link).toHaveClass('min-h-11');
      expect(link).toHaveClass('min-w-11');
    }
  });

  it('keeps desktop navigation targets without cumulative inline padding', () => {
    renderAt('/', <Navbar />);
    const navigation = screen.getByRole('navigation', {
      name: 'Primary navigation',
    });
    const desktopLabels = [
      'Home',
      'About',
      'Commercial aroma solutions',
      'IT maintenance',
      'Downloads',
      'Contact',
    ];

    for (const label of desktopLabels) {
      const link = within(navigation).getByRole('link', { name: label });

      expect(link).toHaveClass('min-h-11');
      expect(link).toHaveClass('min-w-11');
      expect(link).not.toHaveClass('px-2');
    }
  });

  it('keeps visible labels in the accessible names of social and download links', () => {
    const document = getContent('en').downloads.documents[0];
    renderAt(
      '/',
      <>
        <Footer />
        <DownloadCard
          document={document}
          openLabel="Open PDF"
          downloadLabel="Download PDF"
        />
      </>,
    );

    expect(
      within(screen.getByRole('contentinfo')).getByRole('img', {
        name: 'MS Monster Global',
      }),
    ).toHaveAttribute('loading', 'lazy');
    expect(
      screen.getByRole('link', { name: /Facebook/ }),
    ).toHaveAccessibleName(/Facebook/);
    expect(screen.getByRole('link', { name: 'Open PDF' })).toHaveAccessibleName(
      /Open PDF/,
    );
    expect(
      screen.getByRole('link', { name: 'Download PDF' }),
    ).toHaveAccessibleName(/Download PDF/);
  });
});

describe('mobile navigation lifecycle', () => {
  it('closes on Escape and restores focus to the disclosure button', async () => {
    const user = userEvent.setup();
    renderAt('/', <Navbar />);
    const button = screen.getByRole('button', { name: 'Open navigation menu' });

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    await user.keyboard('{Escape}');

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveFocus();
  });

  it('closes when the pathname changes independently of a menu-link click', async () => {
    const user = userEvent.setup();
    renderAt(
      '/',
      <>
        <Navbar />
        <PathnameControl />
      </>,
    );
    const button = screen.getByRole('button', { name: 'Open navigation menu' });

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    await user.click(screen.getByRole('button', { name: 'Change pathname' }));

    expect(
      screen.getByRole('button', { name: 'Open navigation menu' }),
    ).toHaveAttribute('aria-expanded', 'false');
  });

  it('navigates and closes after clicking a rendered mobile route link', async () => {
    const user = userEvent.setup();
    renderAt(
      '/',
      <>
        <Navbar />
        <PathnameProbe />
      </>,
    );
    const button = screen.getByRole('button', { name: 'Open navigation menu' });

    await user.click(button);
    const mobileNavigation = document.getElementById('mobile-navigation');
    expect(mobileNavigation).not.toBeNull();

    await user.click(
      within(mobileNavigation!).getByRole('link', { name: 'Contact' }),
    );

    expect(screen.getByLabelText('Current pathname')).toHaveTextContent(
      '/contact',
    );
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('server-rendered aroma route localization', () => {
  it('wires the Malay URL locale to Malay copy and localized CTA destinations', () => {
    const markup = renderToStaticMarkup(
      <MemoryRouter initialEntries={['/ms/penyelesaian-aroma-komersial']}>
        <AromaRoute />
      </MemoryRouter>,
    );

    expect(markup).toContain('Penyelesaian Aroma Komersial');
    expect(markup).toContain('href="/ms/hubungi"');
    expect(markup).toContain('href="/ms/diffuser-aroma"');
    expect(markup).not.toContain('href="/contact"');
  });
});
