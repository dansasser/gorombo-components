import { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '../../../utils/cn';
import { Button } from '../../primitives/Button';
import { Icon } from '../../primitives/Icon';
import type { ModalProps, ModalSize } from './Modal.types';

const sizeStyles: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-4xl',
};

export function Modal({
  triggerLabel,
  trigger,
  title,
  description,
  size = 'md',
  showClose = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  header,
  footer,
  className,
  children,
}: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    previousActiveElement.current = document.activeElement as HTMLElement;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    previousActiveElement.current?.focus();
  }, []);

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, close]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    firstElement?.focus();

    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const showDefaultHeader = !header && (title || showClose);

  return (
    <>
      {/* Trigger */}
      {trigger ? (
        <span onClick={open} className="cursor-pointer">
          {trigger}
        </span>
      ) : triggerLabel ? (
        <Button onClick={open}>{triggerLabel}</Button>
      ) : null}

      {/* Modal Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]',
          'transition-opacity duration-200',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={closeOnBackdrop ? close : undefined}
        aria-hidden="true"
      />

      {/* Modal Panel */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={description ? 'modal-description' : undefined}
        className={cn(
          'fixed inset-0 z-[101] flex items-center justify-center p-4',
          'transition-opacity duration-200',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        <div
          className={cn(
            'bg-white rounded-xl shadow-2xl w-full',
            'transform transition-transform duration-200',
            isOpen ? 'scale-100' : 'scale-95',
            sizeStyles[size],
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Custom Header */}
          {header}

          {/* Default Header */}
          {showDefaultHeader && (
            <div className="flex items-start justify-between p-6 border-b border-gray-100">
              <div>
                {title && (
                  <h2 id="modal-title" className="text-lg font-bold text-text-main">
                    {title}
                  </h2>
                )}
                {description && (
                  <p id="modal-description" className="mt-1 text-sm text-text-sub">
                    {description}
                  </p>
                )}
              </div>
              {showClose && (
                <button
                  type="button"
                  onClick={close}
                  className={cn(
                    'p-2 rounded-lg text-text-sub',
                    'hover:bg-background-off hover:text-text-main',
                    'transition-colors -mr-2 -mt-2'
                  )}
                  aria-label="Close modal"
                >
                  <Icon name="close" size="md" />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6">{children}</div>

          {/* Footer */}
          {footer && (
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

Modal.displayName = 'Modal';
