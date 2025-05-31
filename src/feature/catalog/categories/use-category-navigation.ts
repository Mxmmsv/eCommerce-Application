import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { useCategoryStore } from '@/service/store/use-category-store';

import type { CategoryPathItem, PosterCategory } from '../types';

export const useCategoryNavigation = () => {
  const navigate = useNavigate();
  const { currentPath, setCurrentPath } = useCategoryStore();

  const handleCategoryClick = useCallback(
    ({ id, name }: PosterCategory) => {
      const pathItem: CategoryPathItem = { id, name };
      setCurrentPath([...currentPath, pathItem]);
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
