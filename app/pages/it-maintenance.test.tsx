import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ItMaintenancePage from './ItMaintenancePage';

describe.each([
  [
    'en',
    'IT & AI Maintenance Services',
    'Predictive maintenance',
    'Support for LAN, Wi-Fi, and 5G network maintenance and connectivity.',
    'Data backup and recovery readiness',
  ],
  [
    'ms',
    'Servis Penyelenggaraan IT & AI',
    'Penyelenggaraan ramalan',
    'Sokongan untuk penyelenggaraan dan sambungan rangkaian LAN, Wi-Fi, dan 5G.',
    'Kesiapsiagaan sandaran dan pemulihan data',
  ],
] as const)('IT page in %s', (locale, heading, service, networkService, backupService) => {
  it('renders the service scope without unsupported promises', () => {
    render(<ItMaintenancePage locale={locale} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(heading);
    expect(screen.getByText(service)).toBeVisible();
    expect(screen.getByText(networkService)).toBeVisible();
    expect(screen.getByText(backupService)).toBeVisible();
    expect(screen.queryByText(/24\/7|guaranteed|nationwide/i)).not.toBeInTheDocument();
  });
});
