import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import ItRoute from '../routes/it';

describe.each([
  {
    path: '/it-maintenance',
    breadcrumbLabel: 'Breadcrumb',
    breadcrumb: 'IT maintenance',
    heading: 'IT & AI Maintenance Services',
    services: [
      'Predictive maintenance',
      'Hardware and software support',
      'Network monitoring',
      'System troubleshooting and repair',
      'Data backup and recovery readiness',
      'Cloud infrastructure support',
      'On-site and remote support options',
    ],
    contacts: [
      ['Discuss your support needs', '/contact'],
      ['Enquire about IT maintenance', '/contact'],
    ],
  },
  {
    path: '/ms/penyelenggaraan-it',
    breadcrumbLabel: 'Jejak navigasi',
    breadcrumb: 'Penyelenggaraan IT',
    heading: 'Servis Penyelenggaraan IT & AI',
    services: [
      'Penyelenggaraan ramalan',
      'Sokongan perkakasan dan perisian',
      'Pemantauan rangkaian',
      'Penyelesaian masalah dan pembaikan sistem',
      'Kesiapsiagaan sandaran dan pemulihan data',
      'Sokongan infrastruktur awan',
      'Pilihan sokongan di lokasi dan jarak jauh',
    ],
    contacts: [
      ['Bincangkan keperluan sokongan', '/ms/hubungi'],
      ['Tanya tentang penyelenggaraan IT', '/ms/hubungi'],
    ],
  },
] as const)('IT route at $path', ({
  path,
  breadcrumbLabel,
  breadcrumb,
  heading,
  services,
  contacts,
}) => {
  it('renders the exact service inventory and localized contact paths without unsupported promises', () => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <ItRoute />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(heading);
    const breadcrumbNavigation = screen.getByRole('navigation', {
      name: breadcrumbLabel,
    });
    expect(breadcrumbNavigation).toHaveTextContent(breadcrumb);
    expect(breadcrumbNavigation.querySelectorAll('[aria-current="page"]')).toHaveLength(1);
    const serviceHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(serviceHeadings).toHaveLength(7);
    expect(serviceHeadings.map((service) => service.textContent)).toEqual(services);

    for (const [label, href] of contacts) {
      expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', href);
    }

    expect(screen.queryByText(/24\/7|guaranteed|nationwide/i)).not.toBeInTheDocument();
  });
});
