import { useState } from 'react';
import useSWR from 'swr';

import { useCategoryStore } from '@/service/store/use-category-store';

import { fetchCategories } from '../api/fetch-categories';
import type { BasicCategory } from '../types';

import { CategoryDropdown } from './category-dropdown';
import { getFullPath } from './category-path';
import { useCategoryTree } from './category-tree';

export const CategoryNavigation = () => {
  const { data: categories } = useSWR('commercetools/categories', fetchCategories);
  const { setCurrentPath } = useCategoryStore();
  const [openedSubmenus, setOpenedSubmenus] = useState<Record<string, boolean>>({});

  const categoryTree = useCategoryTree(categories);

  const toggleSubmenu = (categoryId: string) => {
    setOpenedSubmenus((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleCategoryClick = (category: BasicCategory) => {
    if (!categories) return;
    const path = getFullPath(category, categories);
    setCurrentPath(path);
  };

  return (
    <CategoryDropdown
      categoryTree={categoryTree}
      onSelect={handleCategoryClick}
      openedSubmenus={openedSubmenus}
      toggleSubmenu={toggleSubmenu}
    />
  );
};
