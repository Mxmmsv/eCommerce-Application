import { arrayToTree } from 'performant-array-to-tree';

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

export const useCategoryTree = (categories?: BasicCategory[]): CategoryNode[] => {
  if (!categories) return [];
  return arrayToTree(categories, {
    parentId: 'parent.obj.id',
    dataField: null,
  }) as CategoryNode[];
};
