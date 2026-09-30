import type { FragranceNote } from '../types/fragrance';

export const FRAGRANCE_DETAILS = {
  name: 'Sweet Tooth Lemon Pie',
  subtitle: 'Eau De Parfum',
  tagline: 'Fresh Gourmand Citrus with Warm Vanilla Graham Crust',
  description:
    'Sweet Tooth Lemon Pie by Sabrina Carpenter is a fresh gourmand fragrance with a bright burst of lemon and a lingering trace of sultry sweetness. Zesty citrus unfolds into delicate notes of creamy vanilla and graham cracker crust, evoking the irresistible scent of a freshly baked lemon meringue pie.',
  prices: {
    '75ml': 54.99,
    '30ml': 34.99,
  },
  sku: {
    '75ml': '50003-09-000',
    '30ml': '50003-08-000',
  },
  specs: [
    { label: 'Category', value: 'Eau de Parfum (EDP)' },
    { label: 'Fragrance Family', value: 'Fresh Gourmand Citrus' },
    { label: 'Bottle Design', value: 'Chocolate Bar Flacon with Signature Bite' },
    { label: 'Sillage', value: 'Intimate to Moderate' },
    { label: 'Longevity', value: '6–8 Hours' },
  ],
};

export const OLFACTORY_PYRAMID: FragranceNote[] = [
  {
    category: 'Top Notes',
    headline: 'Sparkling Citrus Burst',
    notes: ['Candied Meyer Lemon Zest', 'Italian Bergamot', 'Crisp Lemon Blossom'],
    description:
      'The initial spray opens with radiant, mouthwatering citrus brightness—crisp sun-ripened Meyer lemon zest sweetened with crystal sugar.',
    color: '#facc15',
  },
  {
    category: 'Heart Notes',
    headline: 'Creamy Vanilla Fluff',
    notes: ['Whipped Vanilla Mousse', 'Fluffy Marshmallow', 'Sweet Coconut Nectar'],
    description:
      'As the citrus sparkles settle, the heart reveals an airy, velvety cloud of whipped French vanilla and pillowy marshmallow fluff.',
    color: '#fed7aa',
  },
  {
    category: 'Base Notes',
    headline: 'Golden Graham Warmth',
    notes: ['Golden Graham Cracker Crust', 'Sugared Musk', 'Warm Honeycomb Caramel'],
    description:
      'A warm, addictive dry-down of toasted buttery graham crust, melted golden amber honey, and skin-like sugared musk that lingers for hours.',
    color: '#d97706',
  },
];
