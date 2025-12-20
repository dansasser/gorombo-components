export interface BreadcrumbItem {
  /** Display label */
  label: string;
  /** Link href (omit for current page) */
  href?: string;
  /** Icon name (Material Symbols) */
  iconName?: string;
}

export interface BreadcrumbsProps {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Separator between items */
  separator?: string;
  /** Additional CSS classes */
  className?: string;
}
