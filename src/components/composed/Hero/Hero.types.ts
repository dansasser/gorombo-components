import type { ReactNode } from 'react';

export type HeroLayout = 'centered' | 'twoColumn' | 'dark';

export interface HeroProps {
  /** Page title */
  title: string;
  /** Subtitle or tagline */
  subtitle?: string;
  /** Longer description text */
  description?: string;
  /** Layout variant */
  layout?: HeroLayout;
  /** Image or media content (for twoColumn layout) */
  media?: ReactNode;
  /** Call-to-action buttons */
  actions?: ReactNode;
  /** Show decorative background blobs */
  decorative?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Additional content */
  children?: ReactNode;
}
