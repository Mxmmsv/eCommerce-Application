import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { ChevronRight } from 'lucide-react';
import { arrayToTree } from 'performant-array-to-tree';
import useSWR from 'swr';

import { Button } from '@/components/ui/button';
import { useCategoryStore } from '@/service/store/use-category-store';

import { fetchCategories } from './api/fetch-categories';
import type { BasicCategory, CategoryNode } from './types';

export const CategoryNavigation = () => {
  const { data: categories } = useSWR('commercetools/categories', fetchCategories);
  const { setCurrentPath } = useCategoryStore();

  console.log('Сategories from API:', categories);

  const categoryTree = arrayToTree(categories || [], {
    parentId: 'parent.obj.id',
    dataField: null,
  }) as CategoryNode[];
  console.log('Category tree:', categoryTree);

  const getFullPath = (category: BasicCategory): { id: string; name: string }[] => {
    const path = [];
    let current = categories?.find((c) => c.id === category.id);
    while (current) {
      path.unshift({ id: current.id, name: current.name['en-GB'] || 'Unnamed' });
      current = current.parent?.obj;
    }

    return path;
  };

  const handleCategoryClick = (category: BasicCategory) => {
    setCurrentPath(getFullPath(category));
  };

  const renderCategory = (category: CategoryNode) => (
    <DropdownMenuItem
      key={category.id}
      onSelect={(e) => {
        e.preventDefault();
        handleCategoryClick(category);
      }}
      className="flex items-center justify-between"
    >
      <span>{category.name['en-GB']}</span>
      {category.children.length > 0 && (
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="ml-2">
            <ChevronRight className="h-4 w-4" />
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>{category.children.map(renderCategory)}</DropdownMenuSubContent>
        </DropdownMenuSub>
      )}
    </DropdownMenuItem>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Categories</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[200px]">
        {categoryTree.map(renderCategory)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
