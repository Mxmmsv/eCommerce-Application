import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { ChevronRight } from 'lucide-react';

import type { CategoryNode, BasicCategory } from '../types';

type CategoryItemProps = {
  category: CategoryNode;
  onSelect: (category: BasicCategory) => void;
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
  const categoryName = category.name['en-GB'];

  return (
    <div className="relative">
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault();
          onSelect(category);
        }}
        className="flex items-center justify-between"
      >
        <span>{categoryName}</span>
        {hasChildren && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleSubmenu(category.id);
            }}
            className="rounded p-1 hover:bg-gray-100"
            aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${categoryName}`}
          >
            <ChevronRight className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
          </button>
        )}
      </DropdownMenuItem>
      {hasChildren && isOpen && (
        <div className="ml-4 border-l-2 border-gray-200 pl-2">
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
