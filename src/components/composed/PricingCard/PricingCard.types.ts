import type { ReactNode } from 'react';

export interface PricingFeature {
  /** Feature text */
  text: string;
  /** Whether the feature is included */
  included?: boolean;
}

export interface PricingCardProps {
  /** Plan name */
  name: string;
  /** Price display (e.g., "$99", "Custom") */
  price: string;
  /** Billing period (e.g., "/month", "/year") */
  period?: string;
  /** Short description */
  description?: string;
  /** List of features */
  features: PricingFeature[];
  /** Call-to-action button */
  cta?: ReactNode;
  /** Highlight this card as featured/recommended */
  featured?: boolean;
  /** Badge text (e.g., "Most Popular") */
  badge?: string;
  /** Additional CSS classes */
  className?: string;
}
