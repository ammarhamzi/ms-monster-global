export type PerfumeCatalogGroupId = 'small' | 'medium' | 'large';

export interface PerfumeCatalogGroup {
  id: PerfumeCatalogGroupId;
  modelIds: string[];
}

export const perfumeCatalogGroups: PerfumeCatalogGroup[] = [
  {
    id: 'small',
    modelIds: ['MF120A', 'MF130R', 'MC50L', 'MF50L', 'MF140A', 'MS105', 'MS600'],
  },
  {
    id: 'medium',
    modelIds: ['MF300R', 'MS1300A', 'MS1400A', 'MF1200A', 'MS3800R'],
  },
  {
    id: 'large',
    modelIds: [
      'MF1500A',
      'MF3000A',
      'MS3000R',
      'MS1500A',
      'MS3500A',
      'MS3600A',
      'MS6000A',
      'MS500',
      'MS501F',
      'MS-18',
      'MS-43',
    ],
  },
];
