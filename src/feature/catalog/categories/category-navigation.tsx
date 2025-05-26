import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';

import { Spinner } from '@/components/ui/spiner';
import { useCategoryStore } from '@/service/store/use-category-store';

import { fetchCategories } from '../api/fetch-categories';
import type { BasicCategory } from '../types';

import { CategoryDropdown } from './category-dropdown';
import { getFullPath } from './category-path';
import { useCategoryNavigation } from './use-category-navigation';
import { useCategoryTree } from './use-category-tree';

export const CategoryNavigation = () => {
  const { id: categoryId } = useParams();
  const {
    data: categories,
    error,
    isLoading,
  } = useSWR<BasicCategory[], Error>('commercetools/categories', fetchCategories);

  const { setCurrentPath } = useCategoryStore();
  const [openedSubmenus, setOpenedSubmenus] = useState<Record<string, boolean>>({});
  const { handleCategoryClick } = useCategoryNavigation();

  useEffect(() => {
    if (categories) {
      if (categoryId) {
        const category = categories.find((c) => c.id === categoryId);
        if (!category) return;
        setCurrentPath(getFullPath(category, categories));
      } else {
        setCurrentPath([]);
      }
    }
  }, [categoryId, categories, setCurrentPath]);

  const categoryTree = useCategoryTree(categories);

  const toggleSubmenu = (categoryId: string) => {
    setOpenedSubmenus((prev) => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };

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
