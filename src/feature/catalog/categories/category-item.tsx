import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { ChevronRight } from 'lucide-react';

<<<<<<< HEAD
import { cn } from '@/lib/utils';

import type { PosterCategory, PosterCategoryNode } from '../types';

type CategoryItemProps = {
  category: PosterCategoryNode;
  onSelect: (category: PosterCategory) => void;
=======
import type { CategoryNode, BasicCategory } from '../types';

type Props = {
  category: CategoryNode;
  onSelect: (category: BasicCategory) => void;
>>>>>>> 4c113d4 (refactor: change category file structure)
  openedSubmenus: Record<string, boolean>;
  toggleSubmenu: (id: string) => void;
};

<<<<<<< HEAD
export const CategoryItem = ({
  category,
  onSelect,
  openedSubmenus,
  toggleSubmenu,
}: CategoryItemProps) => {
  const hasChildren = category.children.length > 0;
  const isOpen = openedSubmenus[category.id];
  const categoryName = category.name;
=======
export const CategoryItem = ({ category, onSelect, openedSubmenus, toggleSubmenu }: Props) => {
  const hasChildren = category.children.length > 0;
  const isOpen = openedSubmenus[category.id];
>>>>>>> 4c113d4 (refactor: change category file structure)

  return (
    <div className="relative">
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault();
          onSelect(category);
        }}
<<<<<<< HEAD
        className={cn(
          'rounded-lg px-3 py-2',
          'cursor-pointer transition-colors',
          'hover:bg-accent focus:bg-accent',
          'flex items-center justify-between',
        )}
      >
        <span>{categoryName}</span>
=======
        className="flex items-center justify-between"
      >
        <span>{category.name['en-GB']}</span>
>>>>>>> 4c113d4 (refactor: change category file structure)
        {hasChildren && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleSubmenu(category.id);
            }}
<<<<<<< HEAD
            aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${categoryName}`}
          >
            <ChevronRight
              className={cn(
                'h-4 w-4 transition-transform duration-200',
                isOpen ? 'rotate-90' : '',
                'text-muted-foreground hover:text-primary',
              )}
            />
=======
            className="rounded p-1 hover:bg-gray-100"
            aria-label="Toggle submenu"
          >
            <ChevronRight className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
>>>>>>> 4c113d4 (refactor: change category file structure)
          </button>
        )}
      </DropdownMenuItem>
      {hasChildren && isOpen && (
<<<<<<< HEAD
        <div className="ml-4 pl-2">
=======
        <div className="ml-4 border-l-2 border-gray-200 pl-2">
>>>>>>> 4c113d4 (refactor: change category file structure)
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
