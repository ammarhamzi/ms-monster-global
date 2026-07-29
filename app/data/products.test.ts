import { describe, expect, it } from 'vitest';
import { catalogGroups, diffusers, essentialOils } from './products';

describe('catalogue integrity', () => {
  it('keeps all 23 documented models exactly once', () => {
    expect(diffusers).toHaveLength(23);
    expect(new Set(diffusers.map((item) => item.model)).size).toBe(23);
    expect(catalogGroups.flatMap((group) => group.modelIds).sort()).toEqual(
      diffusers.map((item) => item.model).sort(),
    );
  });

  it('omits the unresolved MF130R capacity', () => {
    expect(diffusers.find((item) => item.model === 'MF130R')?.capacity).toBeNull();
  });

  it('removes known copy errors and blanket technology claims', () => {
    const serialized = JSON.stringify({ diffusers, essentialOils }).toLowerCase();
    expect(serialized).not.toContain('tee tree oil');
    expect(serialized).not.toContain('beauty saloon');
    expect(serialized).not.toContain('all systems are waterless');
  });
});
