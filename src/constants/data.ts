import type { FlavorConfig, LyricSnippet } from '../types';

export const FLAVORS: Record<string, FlavorConfig> = {
  classic: {
    id: 'classic',
    name: 'Meyer Lemon Meringue',
    subtitle: 'Classic Short n’ Sweet Edition',
    tagline: 'Sun-drenched citrus curd crowned with billowy, torch-kissed meringue peaks.',
    curdColor: '#ffea47',
    meringueColor: '#fffdf5',
    toastColor: '#c27803',
    crustColor: '#d99047',
    accentGlow: 'rgba(253, 224, 71, 0.45)',
    bgGradient: 'radial-gradient(circle at 50% 50%, #fefce8 0%, #fef3c7 45%, #fce7f3 100%)',
    lightIntensity: 1.2,
  },
  honey: {
    id: 'honey',
    name: 'Honey Butter Caramel Crunch',
    subtitle: 'Warm Golden Hour Edition',
    tagline: 'Infused with wildflower honeycomb nectar and drizzled in amber gold.',
    curdColor: '#f59e0b',
    meringueColor: '#fff7ed',
    toastColor: '#9a3412',
    crustColor: '#b45309',
    accentGlow: 'rgba(245, 158, 11, 0.45)',
    bgGradient: 'radial-gradient(circle at 50% 50%, #fffbeb 0%, #fed7aa 50%, #fed7aa 100%)',
    lightIntensity: 1.3,
  },
  strawberry: {
    id: 'strawberry',
    name: 'Pink Lemonade Glaze',
    subtitle: 'Blush Velvet Sugar Edition',
    tagline: 'Ruby strawberry reduction swirled with tart Sicilian lemon cream.',
    curdColor: '#fb7185',
    meringueColor: '#fff1f2',
    toastColor: '#e11d48',
    crustColor: '#e28e67',
    accentGlow: 'rgba(251, 113, 133, 0.45)',
    bgGradient: 'radial-gradient(circle at 50% 50%, #fff1f2 0%, #fce7f3 45%, #fed7aa 100%)',
    lightIntensity: 1.25,
  },
  blueberry: {
    id: 'blueberry',
    name: 'Midnight Lavender Citron',
    subtitle: 'Dreamy Twilight Afterparty Edition',
    tagline: 'Velvety blueberry lavender compote topped with marshmallow foam.',
    curdColor: '#818cf8',
    meringueColor: '#f8fafc',
    toastColor: '#4338ca',
    crustColor: '#c28359',
    accentGlow: 'rgba(129, 140, 248, 0.45)',
    bgGradient: 'radial-gradient(circle at 50% 50%, #f0f9ff 0%, #e0e7ff 50%, #fae8ff 100%)',
    lightIntensity: 1.15,
  },
};

export const LYRICS: LyricSnippet[] = [
  {
    id: 1,
    time: '0:14',
    verse: '“I got a sweet tooth that only your sour lemon kiss can satisfy...”',
    note: 'Verse 1 — Acoustic Guitar & Honey Synth intro',
    vibe: 'Sultry & Flirty',
  },
  {
    id: 2,
    time: '0:48',
    verse: '“Short n’ sweet, meringue piled high enough to graze the vintage sky.”',
    note: 'Chorus Hook — Multi-track harmonic swell',
    vibe: 'Dreamy Pop Euphoria',
  },
  {
    id: 3,
    time: '1:22',
    verse: '“You left powdered sugar on the counter like a bittersweet crime scene.”',
    note: 'Post-Chorus — Retro bassline groove',
    vibe: 'Witty & Playful',
  },
  {
    id: 4,
    time: '1:56',
    verse: '“Too rich to be good for me, too tart to ever let you walk away.”',
    note: 'Bridge — Chime arpeggios & brass warmth',
    vibe: 'Velvet Confession',
  },
  {
    id: 5,
    time: '2:31',
    verse: '“One bite, baby, and you’re begging for a slice to take home forever.”',
    note: 'Outro — Fade-out with vinyl crackle',
    vibe: 'Confident Encore',
  },
];

export const TASTING_NOTES = [
  {
    layer: 'Top Notes (Meringue Peaks)',
    ingredients: 'French vanilla bean fluff, toasted marshmallow tips, organic egg whites whipped to stiff peaks with powdered cane sugar.',
    aroma: 'Burnt sugar & sweet spun cotton',
  },
  {
    layer: 'Heart Notes (Citrus Curd)',
    ingredients: 'Freshly squeezed California Meyer lemons, fragrant grated zest, pasture-raised egg yolks, and sweet cultured butter.',
    aroma: 'Tart sunny brightness & golden honey',
  },
  {
    layer: 'Base Notes (Fluted Crust)',
    ingredients: 'Graham cracker crumbles, roasted Madagascar vanilla, pinch of sea salt, melted European butter baked to golden amber crisp.',
    aroma: 'Warm bakery comfort & caramelized butter',
  },
];
