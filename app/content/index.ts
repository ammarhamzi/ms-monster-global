import type { Locale } from '../config/routes';
import { enContent } from './en';
import { msContent } from './ms';
import type { SiteContent } from './types';

export const content = {
  en: enContent,
  ms: msContent,
} satisfies Record<Locale, SiteContent>;

export function getContent(locale: Locale): SiteContent {
  return content[locale];
}

export { findUnsupportedClaims } from './policy';

export type {
  AboutContent,
  AromaContent,
  ContactContent,
  ContactCtaContent,
  DiffusersContent,
  DownloadDocumentContent,
  DownloadsContent,
  FooterContent,
  FragranceContent,
  HomeContent,
  ItContent,
  NavContent,
  NotFoundContent,
  SiteContent,
} from './types';
