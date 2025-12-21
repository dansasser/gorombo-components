import { useState } from 'react';
import { cn } from '../../../utils/cn';
import { Icon } from '../../primitives/Icon';
import type { AccordionProps } from './Accordion.types';

export function Accordion({
  items,
  allowMultiple = false,
  variant = 'default',
  className,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    items.forEach((item) => {
      if (item.defaultOpen) initial.add(item.id);
    });
    return initial;
  });

  const toggle = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) {
          next.clear();
        }
        next.add(id);
      }
      return next;
    });
  };

  const variantStyles = {
    default: {
      container: 'divide-y divide-gray-200',
      item: '',
      trigger: 'py-4',
      content: 'pb-4',
    },
    bordered: {
      container: 'border border-gray-200 rounded-lg divide-y divide-gray-200',
      item: '',
      trigger: 'px-4 py-4',
      content: 'px-4 pb-4',
    },
    separated: {
      container: 'space-y-2',
      item: 'border border-gray-200 rounded-lg',
      trigger: 'px-4 py-4',
      content: 'px-4 pb-4',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className={cn(styles.container, className)}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);

        return (
          <div key={item.id} className={styles.item}>
            <button
              type="button"
              onClick={() => !item.disabled && toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              disabled={item.disabled}
              className={cn(
                'w-full flex items-center justify-between gap-4 text-left',
                'font-medium text-text-main',
                'hover:text-primary transition-colors',
                item.disabled && 'opacity-50 cursor-not-allowed',
                styles.trigger
              )}
            >
              <span className="flex items-center gap-3">
                {item.iconName && <Icon name={item.iconName} size="md" />}
                {item.title}
              </span>
              <Icon
                name="expand_more"
                size="md"
                className={cn('transition-transform duration-200', isOpen && 'rotate-180')}
              />
            </button>
            <div
              id={`accordion-content-${item.id}`}
              role="region"
              aria-labelledby={`accordion-trigger-${item.id}`}
              hidden={!isOpen}
              className={cn('text-text-sub', styles.content)}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}

Accordion.displayName = 'Accordion';
