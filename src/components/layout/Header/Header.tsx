import { useState } from 'react';
import { cn } from '../../../utils/cn';
import { useScrollDirection } from '../../../hooks/useScrollDirection';
import { Icon } from '../../primitives/Icon';
import type { HeaderProps, NavLink } from './Header.types';

// Desktop dropdown - CSS hover based (like original)
function DesktopDropdown({ label, items }: { label: string; items: NavLink[] }) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1 text-text-main hover:text-primary font-medium text-sm transition-colors py-2 focus:outline-none">
        {label}
        <Icon name="keyboard_arrow_down" size="sm" />
      </button>
      <div className="absolute top-full -left-4 w-64 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2 flex flex-col gap-1">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-4 py-2.5 hover:bg-background-off rounded-lg text-sm text-text-main hover:text-primary font-medium transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// Mobile expandable submenu with border-left indicator
function MobileSubmenu({ label, items }: { label: string; items: NavLink[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-text-main hover:bg-background-off rounded-lg font-medium font-display transition-colors text-left group"
      >
        {label}
        <Icon
          name="expand_more"
          size="md"
          className={cn(
            'transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'flex-col pl-4 gap-1 mt-1 border-l-2 border-gray-100 ml-4 mb-2',
          isOpen ? 'flex' : 'hidden'
        )}
      >
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="px-4 py-2 text-text-sub hover:text-primary hover:bg-background-off rounded-lg text-sm font-medium transition-colors block"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export function Header({
  logo,
  logoText,
  logoHref = '/',
  links = [],
  actions,
  iconButtons,
  sticky = true,
  hideOnScroll = false,
  className,
}: HeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const scrollDirection = useScrollDirection();

  const isHidden = hideOnScroll && scrollDirection === 'down';

  const openDrawer = () => {
    setIsDrawerOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      {/* Header */}
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
            <a
              href={logoHref}
              className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <div className="w-8 h-8 text-primary">{logo}</div>
              {logoText && (
                <span className="font-display font-bold text-xl text-text-main tracking-tight">
                  {logoText}
                </span>
              )}
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-1 items-center justify-center gap-8">
              {links.map((link) =>
                link.children && link.children.length > 0 ? (
                  <DesktopDropdown
                    key={link.label}
                    label={link.label}
                    items={link.children}
                  />
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-text-main hover:text-primary font-medium text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>

            {/* Desktop Right Side */}
            <div className="hidden lg:flex items-center gap-4">
              {iconButtons}
              {actions}
            </div>

            {/* Mobile Right Side */}
            <div className="flex lg:hidden items-center gap-2">
              {iconButtons}
              <button
                onClick={openDrawer}
                className="p-2 text-text-main hover:text-primary transition-colors"
                aria-label="Open menu"
              >
                <Icon name="menu" size="lg" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-[55] lg:hidden"
          onClick={closeDrawer}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 w-[280px] bg-white shadow-2xl z-[60] flex flex-col lg:hidden border-r border-gray-100',
          'transform transition-transform duration-300 ease-in-out',
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Drawer Header */}
        <div className="p-5 flex items-center justify-between border-b border-gray-100">
          <a href={logoHref} className="flex items-center gap-2">
            <div className="w-6 h-6 text-primary">{logo}</div>
            {logoText && (
              <span className="font-display font-bold text-lg text-text-main">
                {logoText}
              </span>
            )}
          </a>
          <button
            onClick={closeDrawer}
            className="p-2 text-text-sub hover:text-text-main"
            aria-label="Close menu"
          >
            <Icon name="close" size="md" />
          </button>
        </div>

        {/* Drawer Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="flex flex-col gap-1 px-3">
            {links.map((link) =>
              link.children && link.children.length > 0 ? (
                <MobileSubmenu
                  key={link.label}
                  label={link.label}
                  items={link.children}
                />
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-text-main hover:bg-background-off rounded-lg font-medium font-display"
                  onClick={closeDrawer}
                >
                  {link.label}
                </a>
              )
            )}
          </nav>
        </div>

        {/* Drawer Footer */}
        {actions && (
          <div className="p-4 border-t border-gray-100">{actions}</div>
        )}
      </div>
    </>
  );
}

Header.displayName = 'Header';
