import type { PosterCategory } from '../types';

export const getCategoryPath = (
  categoryId: string,
  categories: PosterCategory[],
): { id: string; name: string }[] => {
  const categoryMap = new Map(categories.map((c) => [c.id, c]));

  const path = [];
  let currentId: string | null | undefined = categoryId;

  while (currentId) {
    const category = categoryMap.get(currentId);
    if (!category) break;

    path.unshift({ id: category.id, name: category.name });
    currentId = category.parentId;
  }
  return path;
};

export const getCategoryPath = (categoryId: string, categories: BasicCategory[]) => {
  const category = categories.find((c) => c.id === categoryId);
  return category ? getFullPath(category, categories) : [];
};
