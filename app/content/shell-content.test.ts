import { describe, expect, it } from 'vitest';
import { getContent } from '.';

describe.each([
  {
    locale: 'en',
    labels: {
      skipToContent: 'Skip to main content',
      openMenuLabel: 'Open navigation menu',
      closeMenuLabel: 'Close navigation menu',
      languageSelectionLabel: 'Language selection',
    },
  },
  {
    locale: 'ms',
    labels: {
      skipToContent: 'Langkau ke kandungan utama',
      openMenuLabel: 'Buka menu navigasi',
      closeMenuLabel: 'Tutup menu navigasi',
      languageSelectionLabel: 'Pilihan bahasa',
    },
  },
] as const)('$locale shell content', ({ locale, labels }) => {
  it('provides localized accessibility labels through the typed nav contract', () => {
    expect(getContent(locale).nav).toMatchObject(labels);
  });
});
