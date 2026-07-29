import { describe, expect, it } from 'vitest';
import routeConfig from './routes';
import { ROUTES } from './config/routes';

describe('framework route tree', () => {
  it('maps every localized record to a stable route ID', () => {
    const publicEntries = routeConfig.filter((entry) => entry.id?.includes('-'));
    for (const record of ROUTES) {
      expect(publicEntries).toContainEqual(
        expect.objectContaining({ id: record.id, path: record.path }),
      );
    }
  });

  it('includes explicit and catch-all not-found routes', () => {
    expect(routeConfig).toContainEqual(
      expect.objectContaining({ id: 'not-found', path: '/404' }),
    );
    expect(routeConfig).toContainEqual(
      expect.objectContaining({ id: 'catch-all', path: '*' }),
    );
  });
});
