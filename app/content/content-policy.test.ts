import { describe, expect, it } from 'vitest';
import { content, findUnsupportedClaims } from './index';

describe('public copy policy', () => {
  it('detects unsupported proof and service promises in both languages', () => {
    const unsafeExamples = [
      ['Support available 24/7', 'always available'],
      ['Sokongan tersedia 24 jam sehari', 'always available'],
      ['Nationwide on-site coverage', 'geographic coverage'],
      ['Liputan di seluruh Malaysia', 'geographic coverage'],
      ['Response guaranteed within 30 minutes', 'response guarantee'],
      ['Guaranteed 30-minute response time', 'response guarantee'],
      ['One-hour response guarantee', 'response guarantee'],
      ['Tindak balas dijamin dalam 30 minit', 'response guarantee'],
      ['Jaminan tindak balas 30 minit', 'response guarantee'],
      ['Masa tindak balas 30 minit dijamin', 'response guarantee'],
      ['MS Monster Global owns AMECO', 'ameco ownership'],
      ['MS Monster Global memiliki AMECO', 'ameco ownership'],
      ['Cosmetics manufacturing licence', 'cosmetics licence'],
      ['Lesen pembuatan kosmetik', 'cosmetics licence'],
      ['Trusted by 1,000 clients', 'client count'],
      ['Serving hundreds of customers', 'client count'],
      ['Dipercayai oleh 500 pelanggan', 'client count'],
      ['Dipercayai ribuan klien', 'client count'],
      ['Industry-accredited service', 'accreditation'],
      ['Perkhidmatan yang diakreditasi', 'accreditation'],
      ['Penyedia perkhidmatan bertauliah', 'accreditation'],
      ['Customer testimonials', 'testimonial'],
      ['Testimoni pelanggan', 'testimonial'],
    ] as const;

    for (const [copy, policy] of unsafeExamples) {
      expect(findUnsupportedClaims(copy), copy).toContain(policy);
    }
  });

  it('accepts the published bilingual content', () => {
    expect(findUnsupportedClaims(content)).toEqual([]);
  });

  it('states incorporation separately from business roots', () => {
    expect(content.en.about.incorporation).toContain('16 November 2022');
    expect(content.en.about.history[0].text).toContain('business roots');
    expect(content.ms.about.incorporation).toContain('16 November 2022');
    expect(content.ms.about.history[0].text).toContain('akar perniagaan');
  });
});
