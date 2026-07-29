import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { getContent } from './content';
import * as rootModule from './root';

const malayNav = getContent('ms').nav;
const originalSkipLabel = malayNav.skipToContent;

afterEach(() => {
  malayNav.skipToContent = originalSkipLabel;
});

describe('root shell labels', () => {
  it('publishes the browser and device asset descriptors once', () => {
    expect(rootModule.links()).toEqual([
      {
        rel: 'icon',
        href: '/favicon.svg',
        type: 'image/svg+xml',
        sizes: 'any',
      },
      {
        rel: 'icon',
        href: '/favicon.ico',
        type: 'image/x-icon',
        sizes: '16x16 32x32',
      },
      {
        rel: 'apple-touch-icon',
        href: '/assets/brand/apple-touch-icon.png',
        sizes: '180x180',
      },
      { rel: 'manifest', href: '/site.webmanifest' },
    ]);
  });

  it('reads the skip-link label from canonical Malay content', () => {
    malayNav.skipToContent = 'Langkau melalui kandungan berkanun';
    const SkipToContentLink = rootModule.SkipToContentLink;

    expect(SkipToContentLink).toBeTypeOf('function');
    if (!SkipToContentLink) return;
    render(<SkipToContentLink locale="ms" />);

    expect(
      screen.getByRole('link', { name: 'Langkau melalui kandungan berkanun' }),
    ).toHaveAttribute('href', '#main-content');
  });
});
