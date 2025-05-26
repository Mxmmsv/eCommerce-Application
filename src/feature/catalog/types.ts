export type BasicCategory = {
  id: string;
  name: Record<string, string>;
  parent?: {
    id: string;
    obj?: BasicCategory;
  };
};

export type CategoryNode = BasicCategory & {
  children: CategoryNode[];
};

// export type Props = {
//   categories: CategoryNode[];
//   onSelect: (category: BasicCategory) => void;
//   openedSubmenus: Record<string, boolean>;
//   toggleSubmenu: (id: string) => void;
// };
