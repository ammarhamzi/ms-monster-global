interface UnsupportedClaimRule {
  label: string;
  pattern: RegExp;
}

const unsupportedClaimRules: UnsupportedClaimRule[] = [
  {
    label: 'always available',
    pattern: /\b24\s*\/\s*7\b|\b24[- ]hour\b|\b24 jam(?: sehari)?\b/i,
  },
  {
    label: 'geographic coverage',
    pattern:
      /\bnationwide\b|\bacross (?:all of )?malaysia\b|\bthroughout malaysia\b|\b(?:di )?seluruh (?:negara|malaysia)\b/i,
  },
  {
    label: 'response guarantee',
    pattern:
      /\bguaranteed\b.{0,40}\b(?:response|turnaround|within)\b|\b(?:response|turnaround)(?: time)? guarantee(?:d)?\b|\bresponse within \d+\b|\b(?:masa )?(?:tindak balas|respons)\b.{0,40}\bdijamin\b|\bdijamin dalam \d+\b|\bjaminan (?:masa )?(?:tindak balas|respons)\b/i,
  },
  {
    label: 'ameco ownership',
    pattern: /\bowns ameco\b|\bmemiliki ameco\b/i,
  },
  {
    label: 'cosmetics licence',
    pattern:
      /\bcosmetics manufacturing\b.{0,60}\blicen[cs]e\b|\blesen (?:pembuatan|pengilangan) kosmetik\b/i,
  },
  {
    label: 'client count',
    pattern:
      /\b\d[\d,.]*\+?\s*(?:clients?|customers?|pelanggan|klien)\b|\b(?:hundreds|thousands) of (?:clients?|customers?)\b|\b(?:ratusan|ribuan) (?:pelanggan|klien)\b/i,
  },
  {
    label: 'accreditation',
    pattern: /\baccredit(?:ed|ation|ations)\b|\bdiakreditasi\b|\bakreditasi\b|\bbertauliah\b/i,
  },
  {
    label: 'testimonial',
    pattern: /\btestimonials?\b|\btestimoni\b/i,
  },
];

export function findUnsupportedClaims(value: unknown): string[] {
  const serialized = typeof value === 'string' ? value : (JSON.stringify(value) ?? '');

  return unsupportedClaimRules
    .filter(({ pattern }) => pattern.test(serialized))
    .map(({ label }) => label);
}
