import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { useCategoryStore } from '@/feature/catalog/categories/use-category-store';

import type { CategoryPathItem, PosterCategory } from '../types';

export const useCategoryNavigation = () => {
  const navigate = useNavigate();
  const { currentPath, setCurrentPath } = useCategoryStore();

  const handleCategoryClick = useCallback(
    ({ id, name }: PosterCategory) => {
      if (currentPath.some((item) => item.id === id)) {
        return;
      }
      const pathItem: CategoryPathItem = { id, name };
      const updatedPath: CategoryPathItem[] = [...currentPath, pathItem];
      setCurrentPath(updatedPath);
      void navigate(`/catalog/category/${id}`);
    },
    [navigate, setCurrentPath, currentPath],
  );

  const handleAllCategoriesClick = useCallback(() => {
    setCurrentPath([]);
    void navigate('/catalog');
  }, [navigate, setCurrentPath]);

  return {
    handleCategoryClick,
    handleAllCategoriesClick,
  };
};
