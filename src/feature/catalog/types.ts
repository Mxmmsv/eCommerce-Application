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
