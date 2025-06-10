import { useEffect } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';

import { useCategoryStore } from '@/feature/catalog/categories/use-category-store';

import { fetchCategories } from '../api/fetch-categories';
import type { PosterCategory } from '../types';

import { getCategoryPath } from './category-path';
import { useCategoryTree } from './use-category-tree';

export const useCategoryManagement = () => {
  const { id: categoryId } = useParams();
  const {
    data: categories,
    error,
    isLoading,
  } = useSWR<PosterCategory[], Error>('commercetools/categories', fetchCategories);

  const { setCurrentPath } = useCategoryStore();
  const categoryTree = useCategoryTree(categories);

  useEffect(() => {
    if (!categories) return;
    setCurrentPath(categoryId ? getCategoryPath(categoryId, categories) : []);
  }, [categoryId, categories, setCurrentPath]);

  return {
    categories,
    error,
    isLoading,
    categoryTree,
  };
};
