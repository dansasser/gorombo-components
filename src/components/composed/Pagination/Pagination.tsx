import { cn } from '../../../utils/cn';
import { Icon } from '../../primitives/Icon';
import type { PaginationProps } from './Pagination.types';

function getPageUrl(baseUrl: string | undefined, page: number): string {
  if (!baseUrl) return `?page=${page}`;
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}page=${page}`;
}

function getPageNumbers(
  current: number,
  total: number,
  siblingCount: number,
  showEdges: boolean
): (number | 'ellipsis')[] {
  const pages: (number | 'ellipsis')[] = [];

  const leftSibling = Math.max(current - siblingCount, 1);
  const rightSibling = Math.min(current + siblingCount, total);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < total - 1;

  if (showEdges && leftSibling > 1) {
    pages.push(1);
    if (showLeftEllipsis) pages.push('ellipsis');
  }

  for (let i = leftSibling; i <= rightSibling; i++) {
    pages.push(i);
  }

  if (showEdges && rightSibling < total) {
    if (showRightEllipsis) pages.push('ellipsis');
    pages.push(total);
  }

  return pages;
}

export function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  siblingCount = 1,
  showEdges = true,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages, siblingCount, showEdges);

  const buttonClass = cn(
    'inline-flex items-center justify-center',
    'w-10 h-10 rounded-lg',
    'text-sm font-medium transition-colors',
    'hover:bg-background-off'
  );

  return (
    <nav aria-label="Pagination" className={className}>
      <ul className="flex items-center gap-1">
        {/* Previous */}
        <li>
          {currentPage > 1 ? (
            <a
              href={getPageUrl(baseUrl, currentPage - 1)}
              className={buttonClass}
              aria-label="Previous page"
            >
              <Icon name="chevron_left" size="sm" />
            </a>
          ) : (
            <span className={cn(buttonClass, 'opacity-50 cursor-not-allowed')}>
              <Icon name="chevron_left" size="sm" />
            </span>
          )}
        </li>

        {/* Page numbers */}
        {pages.map((page, index) =>
          page === 'ellipsis' ? (
            <li key={`ellipsis-${index}`}>
              <span className={cn(buttonClass, 'cursor-default')}>...</span>
            </li>
          ) : (
            <li key={page}>
              {page === currentPage ? (
                <span
                  className={cn(buttonClass, 'bg-primary text-white')}
                  aria-current="page"
                >
                  {page}
                </span>
              ) : (
                <a
                  href={getPageUrl(baseUrl, page)}
                  className={cn(buttonClass, 'text-text-main')}
                >
                  {page}
                </a>
              )}
            </li>
          )
        )}

        {/* Next */}
        <li>
          {currentPage < totalPages ? (
            <a
              href={getPageUrl(baseUrl, currentPage + 1)}
              className={buttonClass}
              aria-label="Next page"
            >
              <Icon name="chevron_right" size="sm" />
            </a>
          ) : (
            <span className={cn(buttonClass, 'opacity-50 cursor-not-allowed')}>
              <Icon name="chevron_right" size="sm" />
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}

Pagination.displayName = 'Pagination';
