import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { ChevronRight } from 'lucide-react';
import { arrayToTree } from 'performant-array-to-tree';
import { useState } from 'react';
import useSWR from 'swr';

import { Button } from '@/components/ui/button';
import { useCategoryStore } from '@/service/store/use-category-store';

import { fetchCategories } from './api/fetch-categories';
import type { BasicCategory, CategoryNode } from './types';

export const CategoryNavigation = () => {
  const { data: categories } = useSWR('commercetools/categories', fetchCategories);
  const { setCurrentPath } = useCategoryStore();
  const [openedSubmenus, setOpenedSubmenus] = useState<Record<string, boolean>>({});

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

  const toggleSubmenu = (categoryId: string) => {
    setOpenedSubmenus((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleCategoryClick = (category: BasicCategory) => {
    setCurrentPath(getFullPath(category));
  };

  const renderCategory = (category: CategoryNode) => (
    <div key={category.id} className="relative">
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault();
          handleCategoryClick(category);
        }}
        className="flex items-center justify-between"
      >
        <span>{category.name['en-GB']}</span>
        {category.children.length > 0 && (
          <button
            type="button"
            aria-label={`Toggle ${category.name['en-GB']} submenu`}
            onClick={(e) => {
              e.stopPropagation();
              toggleSubmenu(category.id);
            }}
            className="rounded p-1 hover:bg-gray-100"
          >
            <ChevronRight
              className={`h-4 w-4 transition-transform ${
                openedSubmenus[category.id] ? 'rotate-90' : ''
              }`}
            />
          </button>
        )}
      </DropdownMenuItem>
      {category.children.length > 0 && openedSubmenus[category.id] && (
        <div className="ml-4 border-l-2 border-gray-200 pl-2">
          {category.children.map(renderCategory)}
        </div>
      )}
    </div>
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
