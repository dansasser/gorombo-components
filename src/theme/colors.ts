export const colors = {
  primary: {
    DEFAULT: '#2e6b8a',
    dark: '#1f4b63',
    light: '#3d8ab0',
  },
  secondary: {
    DEFAULT: '#7BCFE8',
    dark: '#5bb8d4',
    light: '#a3e0f2',
  },
  accent: {
    DEFAULT: '#E8734A',
    hover: '#d65f36',
    light: '#f09070',
  },
  background: {
    light: '#FFFFFF',
    off: '#F5F7FA',
    dark: '#141b1e',
    'dark-alt': '#1A2E3D',
  },
  text: {
    main: '#1A2E3D',
    sub: '#5c7a8a',
    light: '#8ca3b0',
    inverse: '#FFFFFF',
  },
  border: {
    DEFAULT: '#e5e7eb',
    light: '#f3f4f6',
    dark: '#d1d5db',
  },
} as const;

export type ColorKey = keyof typeof colors;
