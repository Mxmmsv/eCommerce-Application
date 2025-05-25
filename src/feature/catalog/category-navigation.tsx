import type { Category } from '@commercetools/platform-sdk';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { useMemo } from 'react';
import useSWR from 'swr';

import { Button } from '@/components/ui/button';
import { buildCategoryTree } from '@/lib/category-tree';
import { useCategoryStore } from '@/service/store/use-category-store';

import { fetchCategories } from './api/fetch-categories';

export const CategoryNavigation = () => {
  const { data: categories } = useSWR('commercetools/categories', fetchCategories);
  const { setCurrentPath } = useCategoryStore();

  console.log('Сategories from API:', categories);

  const categoryTree = useMemo(() => buildCategoryTree(categories || []), [categories]);
  console.log('Category tree:', categoryTree);

  const handleCategoryClick = (category: Category) => {
    setCurrentPath([
      {
        id: category.id,
        name: category.name['en-GB'],
      },
    ]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Categories</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {categories?.map((category) => (
          <DropdownMenuItem key={category.id} onClick={() => handleCategoryClick(category)}>
            {category.name['en-GB']}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
