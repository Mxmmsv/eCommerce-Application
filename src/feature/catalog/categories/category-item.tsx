import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

import type { PosterCategory, PosterCategoryNode } from '../types';

type CategoryItemProps = {
  category: PosterCategoryNode;
  onSelect: (category: PosterCategory) => void;
  openedSubmenus: Record<string, boolean>;
  toggleSubmenu: (id: string) => void;
};

export const CategoryItem = ({
  category,
  onSelect,
  openedSubmenus,
  toggleSubmenu,
}: CategoryItemProps) => {
  const hasChildren = category.children.length > 0;
  const isOpen = openedSubmenus[category.id];
  const categoryName = category.name;

  return (
    <div className="relative">
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault();
          onSelect(category);
        }}
        className={cn(
          'rounded-lg px-3 py-2',
          'cursor-pointer transition-colors',
          'hover:bg-accent focus:bg-accent',
          'flex items-center justify-between',
        )}
      >
        <span>{categoryName}</span>
        {hasChildren && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleSubmenu(category.id);
            }}
            aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${categoryName}`}
          >
            <ChevronRight
              className={cn(
                'h-4 w-4 transition-transform duration-200',
                isOpen ? 'rotate-90' : '',
                'text-muted-foreground hover:text-primary',
              )}
            />
          </button>
        )}
      </DropdownMenuItem>
      {hasChildren && isOpen && (
        <div className="ml-4 pl-2">
          {category.children.map((child) => (
            <CategoryItem
              key={child.id}
              category={child}
              onSelect={onSelect}
              openedSubmenus={openedSubmenus}
              toggleSubmenu={toggleSubmenu}
            />
          ))}
        </div>
      )}
    </div>
  );
};
