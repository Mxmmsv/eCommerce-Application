import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import type { PosterCategory } from '../types';

export const useCategoryNavigation = () => {
  const navigate = useNavigate();

  const handleCategoryClick = useCallback(
    (category: PosterCategory) => {
      void navigate(`/catalog/category/${category.id}`);
    },
    [navigate],
  );

  const handleAllCategoriesClick = useCallback(() => {
    void navigate('/catalog');
  }, [navigate]);

  return {
    handleCategoryClick,
    handleAllCategoriesClick,
  };
};
