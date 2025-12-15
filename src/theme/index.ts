export { colors, type ColorKey } from './colors';
export { fontFamily, fontSize, fontWeight } from './typography';
export { spacing, borderRadius, boxShadow } from './spacing';

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export type Breakpoint = keyof typeof breakpoints;
