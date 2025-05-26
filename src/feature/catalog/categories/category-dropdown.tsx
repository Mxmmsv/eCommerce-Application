import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

import { Button } from '@/components/ui/button';

import type { CategoryNode, BasicCategory } from '../types';

import { CategoryTree } from './category-tree';

type Props = {
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
}: Props) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">Categories</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="min-w-[200px]">
      <CategoryTree
        categories={categoryTree}
        onSelect={onSelect}
        openedSubmenus={openedSubmenus}
        toggleSubmenu={toggleSubmenu}
      />
    </DropdownMenuContent>
  </DropdownMenu>
);
