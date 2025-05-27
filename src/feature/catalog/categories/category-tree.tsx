import type { PosterCategory, PosterCategoryNode } from '../types';

import { CategoryItem } from './category-item';

type Props = {
  categories: PosterCategoryNode[];
  onSelect: (category: PosterCategory) => void;
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
