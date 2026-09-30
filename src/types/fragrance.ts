export type BottleSize = '75ml' | '30ml';
export type BottleFinish = 'gloss' | 'frosted' | 'gold';
export type StudioLightMode = 'studio' | 'goldenHour' | 'twilight';

export interface FragranceNote {
  category: 'Top Notes' | 'Heart Notes' | 'Base Notes';
  headline: string;
  notes: string[];
  description: string;
  color: string;
}
