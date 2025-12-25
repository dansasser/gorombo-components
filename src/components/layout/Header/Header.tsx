import { cn } from '../../../utils/cn';
import { useScrollDirection } from '../../../hooks/useScrollDirection';
import { openDrawer } from '../../../stores/drawerStore';
import { Icon } from '../../primitives/Icon';
import type { HeaderProps } from './Header.types';

/**
 * Header - Standalone header component.
 *
 * Communicates with Drawer via nanostores. When hamburger is clicked,
 * calls openDrawer() which updates the shared isDrawerOpen atom.
 * The Drawer component subscribes to this atom and shows/hides accordingly.
 *
 * @example
 * ```astro
 * <Header client:load logoText="Brand" sticky>
 *   <svg slot="logo">...</svg>
 *   <Navigation slot="nav" links={navLinks} />
 *   <div slot="actions">
 *     <Button>Login</Button>
 *   </div>
 * </Header>
 * ```
 */
export function Header({
  logo,
  logoText,
  logoHref = '/',
  sticky = true,
  hideOnScroll = false,
  showMobileMenu = true,
  className,
  nav,
  actions,
  children,
}: HeaderProps) {
  const scrollDirection = useScrollDirection();
  const isHidden = hideOnScroll && scrollDirection === 'down';

  return (
    <header
      className={cn(
        'w-full bg-white/95 backdrop-blur border-b border-[#eaeef1]',
        'transition-transform duration-300',
        sticky && 'sticky top-0 z-50',
        isHidden && '-translate-y-full',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          {(logo || logoText) && (
            <a href={logoHref} className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              {logo && <div className="w-8 h-8 text-primary">{logo}</div>}
              {logoText && (
                <span className="font-display font-bold text-xl text-text-main tracking-tight">
                  {logoText}
                </span>
              )}
            </a>
          )}

          {/* Desktop Navigation (slot="nav") */}
          {nav && <div className="hidden lg:flex flex-1 items-center justify-center">{nav}</div>}

          {/* Desktop Actions (slot="actions") */}
          {actions && <div className="hidden lg:flex items-center gap-4">{actions}</div>}

          {/* Mobile Hamburger - calls store to open drawer */}
          {showMobileMenu && (
            <button
              onClick={openDrawer}
              className="lg:hidden p-2 text-text-main hover:text-primary transition-colors"
              aria-label="Open menu"
            >
              <Icon name="menu" size="lg" />
            </button>
          )}

          {/* Additional flexible content */}
          {children}
        </div>
      </div>
    </header>
  );
}

Header.displayName = 'Header';
