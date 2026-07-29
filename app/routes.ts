import { route, type RouteConfig } from '@react-router/dev/routes';
import { ROUTES } from './config/routes';

const moduleByKey = {
  home: './routes/home.tsx',
  about: './routes/about.tsx',
  it: './routes/it.tsx',
  aroma: './routes/aroma.tsx',
  diffusers: './routes/diffusers.tsx',
  fragrance: './routes/fragrance.tsx',
  downloads: './routes/downloads.tsx',
  contact: './routes/contact.tsx',
} as const;

export default [
  ...ROUTES.map((record) =>
    route(record.path, moduleByKey[record.key], { id: record.id }),
  ),
  route('/404', './routes/not-found.tsx', { id: 'not-found' }),
  route('*', './routes/not-found.tsx', { id: 'catch-all' }),
] satisfies RouteConfig;
