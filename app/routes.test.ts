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

  it('maps only the unified perfume records to the public perfume module', () => {
    const publicEntries = routeConfig.filter((entry) => entry.id?.includes('-'));

    expect(publicEntries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'perfume-en', path: '/perfume' }),
        expect.objectContaining({ id: 'perfume-ms', path: '/ms/perfume' }),
      ]),
    );
    expect(publicEntries.map((entry) => entry.id)).not.toEqual(
      expect.arrayContaining([
        'aroma-en',
        'aroma-ms',
        'diffusers-en',
        'diffusers-ms',
        'fragrance-en',
        'fragrance-ms',
      ]),
    );
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
