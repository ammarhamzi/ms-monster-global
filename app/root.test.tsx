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
