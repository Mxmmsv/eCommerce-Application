import { MenuIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { CategoryNode, BasicCategory } from '../types';

import { CategoryTree } from './category-tree';

type CategoryDropdownProps = {
  categoryTree: CategoryNode[];
  onSelect: (category: BasicCategory) => void;
  openedSubmenus: Record<string, boolean>;
  toggleSubmenu: (id: string) => void;
};

export const CategoryDropdown = ({
  categoryTree,
  onSelect,
  openedSubmenus,
  toggleSubmenu,
}: CategoryDropdownProps) => {
  return (
    <DropdownMenu modal={true}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <MenuIcon className="mr-2 h-4 w-4" />
          Categories
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[200px]" align="start">
        <CategoryTree
          categories={categoryTree}
          onSelect={onSelect}
          openedSubmenus={openedSubmenus}
          toggleSubmenu={toggleSubmenu}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
