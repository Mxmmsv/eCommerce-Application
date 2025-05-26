import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import type { BasicCategory } from '../types';

export const useCategoryNavigation = () => {
  const navigate = useNavigate();

  const handleCategoryClick = useCallback(
    (category: BasicCategory) => {
      void navigate(`/category/${category.id}`);
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
