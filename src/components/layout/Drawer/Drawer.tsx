import { useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { cn } from '../../../utils/cn';
import { Icon } from '../../primitives/Icon';
import { isDrawerOpen, closeDrawer } from '../../../stores/drawerStore';
import type { DrawerProps, DrawerSide, DrawerWidth } from './Drawer.types';

const widthStyles: Record<DrawerWidth, string> = {
  sm: 'w-[240px]',
  md: 'w-[280px]',
  lg: 'w-[320px]',
};

const sideStyles: Record<DrawerSide, { position: string; transform: string; open: string }> = {
  left: {
    position: 'left-0',
    transform: '-translate-x-full',
    open: 'translate-x-0',
  },
  right: {
    position: 'right-0',
    transform: 'translate-x-full',
    open: 'translate-x-0',
  },
};

/**
 * Drawer - Standalone drawer component that subscribes to nanostores.
 *
 * Communicates with Header via shared drawerStore. When Header's hamburger
 * is clicked, it calls openDrawer() which updates isDrawerOpen atom.
 * This component subscribes to that atom and shows/hides accordingly.
 *
 * @example
 * ```astro
 * <Drawer client:load side="left">
 *   <Navigation links={navLinks} orientation="vertical" />
 *   <div slot="footer">
 *     <Button fullWidth>Login</Button>
 *   </div>
 * </Drawer>
 * ```
 */
export function Drawer({
  side = 'left',
  width = 'md',
  title,
  showClose = true,
  hideOverlay = false,
  className,
  header,
  footer,
  children,
}: DrawerProps) {
  const $isOpen = useStore(isDrawerOpen);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && $isOpen) {
        closeDrawer();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [$isOpen]);

  // Focus trap
  useEffect(() => {
    if ($isOpen && drawerRef.current) {
      const focusableElements = drawerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      firstElement?.focus();
    }
  }, [$isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if ($isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [$isOpen]);

  const sideStyle = sideStyles[side];
  const showDefaultHeader = !header && (title || showClose);

  return (
    <>
      {/* Backdrop - click to close */}
      {!hideOverlay && (
        <div
          className={cn(
            'fixed inset-0 bg-black/20 backdrop-blur-sm z-[55]',
            'transition-opacity duration-300',
            $isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Navigation menu'}
        className={cn(
          'fixed inset-y-0 bg-white shadow-2xl z-[60] flex flex-col',
          'transform transition-transform duration-300 ease-out',
          widthStyles[width],
          sideStyle.position,
          $isOpen ? sideStyle.open : sideStyle.transform,
          className
        )}
      >
        {/* Custom Header (slot="header") */}
        {header}

        {/* Default Header */}
        {showDefaultHeader && (
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            {title && <span className="font-bold text-text-main">{title}</span>}
            {showClose && (
              <button
                type="button"
                onClick={closeDrawer}
                className={cn(
                  'p-2 rounded-lg text-text-sub',
                  'hover:bg-background-off hover:text-text-main',
                  'transition-colors',
                  !title && 'ml-auto'
                )}
                aria-label="Close menu"
              >
                <Icon name="close" size="md" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 p-4 overflow-y-auto">{children}</div>

        {/* Footer (slot="footer") */}
        {footer && <div className="p-4 border-t border-gray-100">{footer}</div>}
      </div>
    </>
  );
}

Drawer.displayName = 'Drawer';
