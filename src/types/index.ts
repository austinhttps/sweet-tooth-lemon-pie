export type FlavorType = 'classic' | 'honey' | 'strawberry' | 'blueberry';

export interface FlavorConfig {
  id: FlavorType;
  name: string;
  subtitle: string;
  tagline: string;
  curdColor: string;
  meringueColor: string;
  toastColor: string;
  crustColor: string;
  accentGlow: string;
  bgGradient: string;
  lightIntensity: number;
}

export interface LyricSnippet {
  id: number;
  time: string;
  verse: string;
  note: string;
  vibe: string;
}
