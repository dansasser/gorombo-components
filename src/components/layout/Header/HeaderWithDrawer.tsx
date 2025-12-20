import { useState } from 'react';
import { cn } from '../../../utils/cn';
import { Icon } from '../../primitives/Icon';
import { Header } from './Header';
import { HeaderActions } from './HeaderActions';
import { MobileDrawer } from '../MobileDrawer';
import type { LegacyHeaderProps, NavLink } from './Header.types';

// Desktop dropdown with CSS hover (matches original behavior)
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
function MobileSubmenu({ label, items, onItemClick }: { label: string; items: NavLink[]; onItemClick?: () => void }) {
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
            onClick={onItemClick}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}

/**
 * HeaderWithDrawer - Backwards compatible header with built-in mobile drawer.
 *
 * For new projects, prefer using the composable Header with Navigation,
 * MobileDrawer, and HeaderActions components separately.
 *
 * @deprecated Consider migrating to composable Header pattern
 */
export function HeaderWithDrawer({
  logo,
  logoText,
  logoHref = '/',
  links = [],
  actions,
  iconButtons,
  sticky = true,
  hideOnScroll = false,
  className,
}: LegacyHeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <Header
        logo={logo}
        logoText={logoText}
        logoHref={logoHref}
        sticky={sticky}
        hideOnScroll={hideOnScroll}
        className={className}
      >
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
        <HeaderActions hideOnMobile>
          {iconButtons}
          {actions}
        </HeaderActions>

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
      </Header>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        header={
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
        }
        footer={actions ? <div>{actions}</div> : undefined}
        showClose={false}
        className="lg:hidden border-r border-gray-100"
      >
        <nav className="flex flex-col gap-1">
          {links.map((link) =>
            link.children && link.children.length > 0 ? (
              <MobileSubmenu
                key={link.label}
                label={link.label}
                items={link.children}
                onItemClick={closeDrawer}
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
      </MobileDrawer>
    </>
  );
}

HeaderWithDrawer.displayName = 'HeaderWithDrawer';
