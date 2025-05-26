import { ChevronDown, MenuIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

import type { CategoryDropdownProps } from '../types';

import { CategoryTree } from './category-tree';

export const CategoryDropdown = ({
  categoryTree,
  onSelect,
  openedSubmenus,
  toggleSubmenu,
}: CategoryDropdownProps) => {
  return (
    <DropdownMenu modal={true}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'h-auto rounded-full px-4 py-2',
            'bg-background hover:bg-muted/80',
            'transition-all duration-200 ease-in-out',
            'shadow-sm hover:shadow-md',
            'border-border/50 hover:border-primary',
            'flex items-center gap-2',
          )}
        >
          <MenuIcon className="text-foreground/80 h-4 w-4" />
          Categories
          <ChevronDown
            className={cn('text-foreground/60 h-3 w-3', 'transition-transform duration-200')}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          'min-w-[240px] rounded-xl p-2',
          'bg-popover/95 backdrop-blur-sm',
          'border-border/50 border shadow-lg',
          'animate-in fade-in-80 zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=top]:slide-in-from-bottom-2',
        )}
        align="start"
      >
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
