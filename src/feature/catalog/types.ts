import type { Category } from '@commercetools/platform-sdk';

export type CategoryWithParent = Category & {
  parent?: {
    obj?: Category;
  };
  children?: CategoryWithParent[];
};
