import apiRoot from '@/feature/api/api-client-credentials-flow';

import type { CategoryWithParent } from '../types';

export const fetchCategories = async (): Promise<CategoryWithParent[]> => {
  const response = await apiRoot
    .categories()
    .get({
      queryArgs: {
        expand: ['parent'],
      },
    })
    .execute();
  return response.body.results;
};
