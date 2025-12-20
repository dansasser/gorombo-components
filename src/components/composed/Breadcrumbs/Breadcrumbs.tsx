import { cn } from '../../../utils/cn';
import { Icon } from '../../primitives/Icon';
import type { BreadcrumbsProps } from './Breadcrumbs.types';

export function Breadcrumbs({
  items,
  separator = '/',
  className,
}: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="flex items-center gap-1 text-text-sub hover:text-primary transition-colors"
                >
                  {item.iconName && <Icon name={item.iconName} size="sm" />}
                  {item.label}
                </a>
              ) : (
                <span
                  className={cn(
                    'flex items-center gap-1',
                    isLast ? 'text-text-main font-medium' : 'text-text-sub'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.iconName && <Icon name={item.iconName} size="sm" />}
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span className="text-text-sub" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

Breadcrumbs.displayName = 'Breadcrumbs';
