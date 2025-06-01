export type Poster = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  currencyCode: string;
  discount?: string;
  discountPercent?: number;
  hasDiscount?: boolean;
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
};

export type CategoryPathItem = {
  id: string;
  name: string;
};

export type SortOption = 'price asc' | 'price desc' | 'name asc' | 'name desc' | null;
