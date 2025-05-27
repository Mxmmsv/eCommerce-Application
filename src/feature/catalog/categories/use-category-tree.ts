import { arrayToTree } from 'performant-array-to-tree';

import type { PosterCategory, PosterCategoryNode } from '../types';

export const useCategoryTree = (categories?: PosterCategory[]): PosterCategoryNode[] => {
  if (!categories) return [];
  return arrayToTree(categories, {
    parentId: 'parentId',
    dataField: null,
  }) as PosterCategoryNode[];
};
