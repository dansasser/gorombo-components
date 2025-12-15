import type { Config } from 'tailwindcss';
import { colors } from './theme/colors';
import { fontFamily, fontSize } from './theme/typography';
import { borderRadius, boxShadow } from './theme/spacing';

export const goromboPreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,
        background: colors.background,
        'text-main': colors.text.main,
        'text-sub': colors.text.sub,
      },
      fontFamily: {
        display: fontFamily.display,
        body: fontFamily.body,
      },
      fontSize,
      borderRadius,
      boxShadow,
    },
  },
};

export default goromboPreset;
