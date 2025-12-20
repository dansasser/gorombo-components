import type { ReactNode } from 'react';

export interface AccordionItem {
  /** Unique identifier */
  id: string;
  /** Header/trigger text */
  title: string;
  /** Optional icon name (Material Symbols) */
  iconName?: string;
  /** Panel content */
  content: ReactNode;
  /** Initially expanded */
  defaultOpen?: boolean;
  /** Disable this item */
  disabled?: boolean;
}

export interface AccordionProps {
  /** Array of accordion items */
  items: AccordionItem[];
  /** Allow multiple panels open at once */
  allowMultiple?: boolean;
  /** Visual variant */
  variant?: 'default' | 'bordered' | 'separated';
  /** Additional CSS classes */
  className?: string;
}
