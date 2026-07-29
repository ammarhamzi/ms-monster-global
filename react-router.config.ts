import type { Config } from '@react-router/dev/config';
import { PRERENDER_PATHS } from './app/config/routes';

export default {
  ssr: false,
  prerender: PRERENDER_PATHS,
} satisfies Config;
