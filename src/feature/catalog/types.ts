<<<<<<< HEAD
export type Poster = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type PosterCategory = {
  id: string;
  name: string;
  parentId: string | null;
};

export type CategoryApiResponse = {
  id: string;
  name: Record<string, string>;
  parent?: { id: string };
};

export type PosterCategoryNode = PosterCategory & {
  children: PosterCategoryNode[];
};

export type CategoryDropdownProps = {
  categoryTree: PosterCategoryNode[];
  onSelect: (category: PosterCategory) => void;
  openedSubmenus: Record<string, boolean>;
  toggleSubmenu: (id: string) => void;
=======
import type { Category } from '@commercetools/platform-sdk';

export type CategoryWithParent = Category & {
  parent?: {
    obj?: Category;
  };
  children?: CategoryWithParent[];
>>>>>>> 67f049c (feat: add categories tree)
};
