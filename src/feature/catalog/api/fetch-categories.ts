import apiRoot from '@/feature/api/api-client-credentials-flow';

import type { BasicCategory } from '../types';

export const fetchCategories = async (): Promise<BasicCategory[]> => {
  const response = await apiRoot
    .categories()
    .get({
      queryArgs: {
        expand: ['parent'],
      },
    })
    .execute();
  return response.body.results.map((category) => ({
    id: category.id,
    name: category.name,
    parent: category.parent,
  }));
};
