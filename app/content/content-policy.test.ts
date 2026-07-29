import { describe, expect, it } from 'vitest';
import { content } from './index';

describe('public copy policy', () => {
  it('excludes unsupported claims in both languages', () => {
    const serialized = JSON.stringify(content).toLowerCase();

    for (const phrase of [
      '24/7',
      'nationwide',
      'guaranteed response',
      'owns ameco',
      'cosmetics manufacturing licence',
      'testimoni pelanggan',
    ]) {
      expect(serialized).not.toContain(phrase);
    }
  });

  it('states incorporation separately from business roots', () => {
    expect(content.en.about.incorporation).toContain('16 November 2022');
    expect(content.en.about.history[0].text).toContain('business roots');
    expect(content.ms.about.incorporation).toContain('16 November 2022');
    expect(content.ms.about.history[0].text).toContain('akar perniagaan');
  });
});
