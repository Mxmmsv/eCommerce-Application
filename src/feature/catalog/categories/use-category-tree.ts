import { arrayToTree } from 'performant-array-to-tree';

import type { BasicCategory, CategoryNode } from '../types';

export const useCategoryTree = (categories?: BasicCategory[]): CategoryNode[] => {
  if (!categories) return [];
  return arrayToTree(categories, {
    parentId: 'parent.obj.id',
    dataField: null,
  }) as CategoryNode[];
};
