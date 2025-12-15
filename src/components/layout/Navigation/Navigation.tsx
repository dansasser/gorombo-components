import { useState, useRef } from 'react';
import { cn } from '../../../utils/cn';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { Icon } from '../../primitives/Icon';
import type { NavigationProps, NavDropdownProps, NavLink } from './Navigation.types';

function NavDropdown({ label, items, className }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setIsOpen(false), isOpen);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-1 text-sm font-medium text-text-main',
          'hover:text-primary transition-colors'
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <Icon
          name="expand_more"
          size="sm"
          className={cn(
            'transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute top-full left-0 mt-2 min-w-[200px]',
            'bg-white rounded-lg border border-gray-100 shadow-lg',
            'py-2 z-50'
          )}
        >
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'block px-4 py-2 text-sm text-text-main',
                'hover:bg-background-off hover:text-primary transition-colors'
              )}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function NavItem({ link }: { link: NavLink }) {
  if (link.children && link.children.length > 0) {
    return <NavDropdown label={link.label} items={link.children} />;
  }

  return (
    <a
      href={link.href}
      className={cn(
        'text-sm font-medium text-text-main',
        'hover:text-primary transition-colors'
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
        isVertical ? 'flex-col gap-4' : 'items-center gap-8',
        className
      )}
      role="navigation"
    >
      {links.map((link) => (
        <NavItem key={link.href} link={link} />
      ))}
    </nav>
  );
}

Navigation.displayName = 'Navigation';
