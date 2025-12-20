import { cn } from '../../../utils/cn';
import { Icon } from '../../primitives/Icon';
import type { NavigationProps, NavDropdownProps, NavLink } from './Navigation.types';

/**
 * Desktop dropdown - CSS hover only, no JS
 */
export function NavDropdown({ label, items, className }: NavDropdownProps) {
  return (
    <div className={cn('nav-dropdown relative', className)}>
      <style dangerouslySetInnerHTML={{ __html: `
        .nav-dropdown:hover .nav-dropdown-menu { opacity: 1; visibility: visible; transform: translateY(0); }
        .nav-dropdown:hover .nav-dropdown-icon { transform: rotate(180deg); }
      `}} />
      <button
        type="button"
        className={cn(
          'flex items-center gap-1 text-sm font-medium text-text-main',
          'hover:text-primary transition-colors'
        )}
      >
        {label}
        <span className="nav-dropdown-icon transition-transform duration-200">
          <Icon name="expand_more" size="sm" />
        </span>
      </button>

      <div
        className={cn(
          'nav-dropdown-menu absolute top-full left-0 mt-2 min-w-[200px]',
          'bg-white rounded-lg border border-gray-100 shadow-lg',
          'py-2 z-50 transition-all duration-200',
          'opacity-0 invisible -translate-y-2'
        )}
      >
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={cn(
              'block px-4 py-2 text-sm text-text-main',
              'hover:bg-gray-50 hover:text-primary transition-colors'
            )}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}

NavDropdown.displayName = 'NavDropdown';

/**
 * Vertical accordion using native details/summary - no JS needed
 */
function NavAccordion({ label, items }: { label: string; items: NavLink[] }) {
  return (
    <details className="w-full">
      <summary
        className={cn(
          'flex items-center justify-between w-full py-2 text-base font-medium text-text-main',
          'hover:text-primary transition-colors cursor-pointer list-none',
          '[&::-webkit-details-marker]:hidden'
        )}
      >
        {label}
        <Icon name="expand_more" size="sm" />
      </summary>
      <div className="pl-4 py-2 space-y-2">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={cn(
              'block py-1 text-sm text-text-sub',
              'hover:text-primary transition-colors'
            )}
          >
            {item.label}
          </a>
        ))}
      </div>
    </details>
  );
}

function NavItem({ link, isVertical }: { link: NavLink; isVertical: boolean }) {
  if (link.children && link.children.length > 0) {
    if (isVertical) {
      return <NavAccordion label={link.label} items={link.children} />;
    }
    return <NavDropdown label={link.label} items={link.children} />;
  }

  return (
    <a
      href={link.href}
      className={cn(
        'font-medium text-text-main',
        'hover:text-primary transition-colors',
        isVertical ? 'text-base py-2 block' : 'text-sm'
      )}
    >
      {link.label}
    </a>
  );
}

export function Navigation({
  links,
  orientation = 'horizontal',
  className,
}: NavigationProps) {
  const isVertical = orientation === 'vertical';

  return (
    <nav
      className={cn(
        'flex',
        isVertical ? 'flex-col gap-1' : 'items-center gap-8',
        className
      )}
      role="navigation"
    >
      {links.map((link) => (
        <NavItem key={link.href} link={link} isVertical={isVertical} />
      ))}
    </nav>
  );
}

Navigation.displayName = 'Navigation';
