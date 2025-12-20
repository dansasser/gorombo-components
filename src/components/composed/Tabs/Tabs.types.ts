import type { ReactNode } from 'react';

export type TabsVariant = 'underline' | 'pills' | 'enclosed';

export interface TabItem {
  /** Unique identifier for the tab */
  id: string;
  /** Label shown in tab button */
  label: string;
  /** Optional icon name (Material Symbols) */
  iconName?: string;
  /** Tab panel content - string for Astro, ReactNode for React */
  content?: ReactNode;
  /** Disable this tab */
  disabled?: boolean;
}

export interface TabsProps {
  /** Array of tab items */
  items: TabItem[];
  /** Visual style variant */
  variant?: TabsVariant;
  /** ID of initially active tab */
  defaultTab?: string;
  /** Full width tabs */
  fullWidth?: boolean;
  /** Additional CSS classes */
  className?: string;
}
