export interface PaginationProps {
  /** Current page (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Base URL for page links (appends ?page=X) */
  baseUrl?: string;
  /** Number of page buttons to show around current page */
  siblingCount?: number;
  /** Show first/last page buttons */
  showEdges?: boolean;
  /** Additional CSS classes */
  className?: string;
}
