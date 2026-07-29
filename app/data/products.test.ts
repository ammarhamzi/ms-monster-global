import { describe, expect, it } from 'vitest';
import { catalogGroups, diffuserMsCopy, diffusers, essentialOils } from './products';

const documentedModels = [
  'MF120A',
  'MF130R',
  'MC50L',
  'MF50L',
  'MF140A',
  'MF300R',
  'MS1300A',
  'MS1400A',
  'MF1200A',
  'MF1500A',
  'MF3000A',
  'MS3000R',
  'MS1500A',
  'MS3500A',
  'MS3600A',
  'MS6000A',
  'MS3800R',
  'MS105',
  'MS500',
  'MS501F',
  'MS-18',
  'MS-43',
  'MS600',
] as const;

describe('catalogue integrity', () => {
  it('keeps all 23 documented models exactly once', () => {
    expect(diffusers.map((item) => item.model).sort()).toEqual([...documentedModels].sort());
    expect(catalogGroups.flatMap((group) => group.modelIds).sort()).toEqual(
      [...documentedModels].sort(),
    );
  });

  it('omits both disputed MF130R capacity values', () => {
    const mf130r = diffusers.find((item) => item.model === 'MF130R');

    expect(mf130r?.capacity).toBeNull();
    expect(JSON.stringify(mf130r)).not.toMatch(/\b(?:120|200)\s*ml\b/i);
  });

  it('removes known copy errors and limits waterless claims to documented models', () => {
    const serialized = JSON.stringify({ diffusers, diffuserMsCopy, essentialOils }).toLowerCase();
    const waterlessModels = diffusers
      .filter((item) => JSON.stringify(item.features).toLowerCase().includes('waterless'))
      .map((item) => item.model)
      .sort();

    expect(serialized).not.toContain('tee tree oil');
    expect(serialized).not.toContain('beauty saloon');
    expect(waterlessModels).toEqual(['MS-18', 'MS-43', 'MS501F']);
    expect(serialized).not.toMatch(
      /(?:all|every)\s+(?:diffusers?|systems?|models?)[^.]{0,50}waterless/,
    );
    expect(serialized).not.toMatch(
      /(?:semua|setiap)\s+(?:diffuser|sistem|model)[^.]{0,50}tanpa air/,
    );
    expect(serialized).not.toMatch(
      /(?:diffusers?|systems?|models?)\s+(?:are|use|operate)[^.]{0,50}waterless/,
    );
    expect(serialized).not.toMatch(
      /(?:diffuser|sistem|model)\s+(?:adalah|menggunakan|beroperasi)[^.]{0,50}tanpa air/,
    );
  });
});
