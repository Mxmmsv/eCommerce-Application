import type { CategoryWithParent } from '@/feature/catalog/types';

export const buildCategoryTree = (categories: CategoryWithParent[]) => {
  const map = new Map<string, CategoryWithParent>();
  const tree: CategoryWithParent[] = [];

  categories.forEach((category) => {
    map.set(category.id, { ...category, children: [] });
  });

  map.forEach((category) => {
    if (category.parent?.obj?.id) {
      const parent = map.get(category.parent.obj.id);
      parent?.children?.push(category);
    } else {
      tree.push(category);
    }
  });
  console.log('Built tree:', tree);
  return tree;
};
