import { useState } from 'react';
import { cn } from '../../../utils/cn';
import { Icon } from '../../primitives/Icon';
import type { TabsProps, TabsVariant } from './Tabs.types';

const variantStyles: Record<TabsVariant, { list: string; tab: string; active: string }> = {
  underline: {
    list: 'border-b border-gray-200',
    tab: 'px-4 py-2 text-text-sub hover:text-text-main border-b-2 border-transparent -mb-px transition-colors',
    active: 'text-primary border-primary',
  },
  pills: {
    list: 'gap-2',
    tab: 'px-4 py-2 rounded-lg text-text-sub hover:bg-background-off transition-colors',
    active: 'bg-primary text-white hover:bg-primary',
  },
  enclosed: {
    list: 'border-b border-gray-200',
    tab: 'px-4 py-2 text-text-sub hover:text-text-main border border-transparent rounded-t-lg -mb-px transition-colors',
    active: 'text-text-main bg-white border-gray-200 border-b-white',
  },
};

export function Tabs({
  items,
  variant = 'underline',
  defaultTab,
  fullWidth = false,
  className,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id);
  const styles = variantStyles[variant];

  return (
    <div className={className}>
      {/* Tab List */}
      <div
        role="tablist"
        className={cn('flex', fullWidth && 'w-full', styles.list)}
      >
        {items.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={activeTab === item.id}
            aria-controls={`panel-${item.id}`}
            id={`tab-${item.id}`}
            disabled={item.disabled}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              'inline-flex items-center gap-2 font-medium',
              fullWidth && 'flex-1 justify-center',
              styles.tab,
              activeTab === item.id && styles.active,
              item.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {item.iconName && <Icon name={item.iconName} size="sm" />}
            {item.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`panel-${item.id}`}
          aria-labelledby={`tab-${item.id}`}
          hidden={activeTab !== item.id}
          className="py-4"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}

Tabs.displayName = 'Tabs';
