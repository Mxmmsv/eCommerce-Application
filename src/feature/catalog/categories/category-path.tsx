import type { BasicCategory } from '../types';

export const getFullPath = (
  category: BasicCategory,
  categories: BasicCategory[],
): { id: string; name: string }[] => {
  const path = [];
  let current = categories?.find((c) => c.id === category.id);
  while (current) {
    path.unshift({ id: current.id, name: current.name['en-GB'] });
    current = current.parent?.obj;
  }

  return path;
};

export const getCategoryPath = (categoryId: string, categories: BasicCategory[]) => {
  const category = categories.find((c) => c.id === categoryId);
  return category ? getFullPath(category, categories) : [];
};
