import Color from 'color';

type ColorMap = {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  outline: string;
  outlineBorder: string;
};

/**
 * Reduces the opacity of a color value such that it may be used as an outline for a button.
 */
const fadedOutline = (color: string): string => Color(color).fade(0.55).hsl().round().string();

export const gray: ColorMap = {
  0: '#f9fafb',
  1: '#f3f4f5',
  2: '#e5e7eb',
  3: '#d1d5db',
  4: '#9ca3af',
  5: '#6b7280',
  6: '#4b5563',
  7: '#374151',
  8: '#1f2937',
  9: '#111828',
  outline: fadedOutline('#6b7280'),
  outlineBorder: fadedOutline('#4b7280'),
};

export const indigo: ColorMap = {
  0: 'hsl(222, 67%, 97%)',
  1: 'hsl(222, 75%, 94%)',
  2: 'hsl(222, 72%, 89%)',
  3: 'hsl(222, 68%, 82%)',
  4: 'hsl(222, 66%, 71%)',
  5: 'hsl(222, 64%, 60%)',
  6: 'hsl(222, 62%, 52%)',
  7: 'hsl(222, 62%, 44%)',
  8: 'hsl(222, 66%, 36%)',
  9: 'hsl(222, 70%, 30%)',
  outline: fadedOutline('hsl(222, 66%, 71%)'),
  outlineBorder: fadedOutline('hsl(222, 62%, 52%)'),
};
