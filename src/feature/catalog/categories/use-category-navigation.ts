import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import type { PosterCategory } from '../types';

export const useCategoryNavigation = () => {
  const navigate = useNavigate();

  const handleCategoryClick = useCallback(
    (category: PosterCategory) => {
<<<<<<< HEAD
      void navigate(`/catalog/category/${category.id}`);
=======
      void navigate(`/category/${category.id}`);
>>>>>>> 29f3ea1 (refactor: correct type)
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
