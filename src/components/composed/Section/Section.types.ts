import type { ReactNode } from 'react';

export type SectionBackground = 'light' | 'off' | 'dark';
export type SectionSpacing = 'compact' | 'normal' | 'spacious';

export interface SectionProps {
  /** Section title */
  title?: string;
  /** Section subtitle or description */
  subtitle?: string;
  /** Background color variant */
  background?: SectionBackground;
  /** Vertical spacing */
  spacing?: SectionSpacing;
  /** Center the header text */
  centered?: boolean;
  /** Render as a different HTML element */
  as?: 'section' | 'div' | 'article';
  /** Additional CSS classes */
  className?: string;
  /** Section content */
  children: ReactNode;
}
