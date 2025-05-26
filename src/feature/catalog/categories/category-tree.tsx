import type { BasicCategory, CategoryNode } from '../types';

import { CategoryItem } from './category-item';

type Props = {
  categories: CategoryNode[];
  onSelect: (category: BasicCategory) => void;
  openedSubmenus: Record<string, boolean>;
  toggleSubmenu: (id: string) => void;
};

export const CategoryTree = ({ categories, onSelect, openedSubmenus, toggleSubmenu }: Props) => (
  <>
    {categories.map((category) => (
      <CategoryItem
        key={category.id}
        category={category}
        onSelect={onSelect}
        openedSubmenus={openedSubmenus}
        toggleSubmenu={toggleSubmenu}
      />
    ))}
  </>
);
