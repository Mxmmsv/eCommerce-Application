import { useCallback, useState } from 'react';
import useSWR from 'swr';

import { Spinner } from '@/components/ui/spiner';
import { useCategoryStore } from '@/service/store/use-category-store';

import { fetchCategories } from '../api/fetch-categories';
import type { BasicCategory } from '../types';

import { CategoryDropdown } from './category-dropdown';
import { getFullPath } from './category-path';
import { useCategoryTree } from './use-category-tree';

export const CategoryNavigation = () => {
  const {
    data: categories,
    error,
    isLoading,
  } = useSWR<BasicCategory[], Error>('commercetools/categories', fetchCategories);
  const { setCurrentPath } = useCategoryStore();
  const [openedSubmenus, setOpenedSubmenus] = useState<Record<string, boolean>>({});

  const categoryTree = useCategoryTree(categories);

  const toggleSubmenu = useCallback((categoryId: string) => {
    setOpenedSubmenus((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  }, []);

  const handleCategoryClick = useCallback(
    (category: BasicCategory) => {
      if (!categories) return;
      const path = getFullPath(category, categories);
      setCurrentPath(path);
    },
    [categories, setCurrentPath],
  );

  if (isLoading) return <Spinner className="mx-auto" />;
  if (error) return <div>Error loading categories</div>;
  if (!categories) return null;

  return (
    <CategoryDropdown
      categoryTree={categoryTree}
      onSelect={handleCategoryClick}
      openedSubmenus={openedSubmenus}
      toggleSubmenu={toggleSubmenu}
    />
  );
};
