import apiRoot from '@/feature/api/api-client-credentials-flow';

import type { CategoryApiResponse, PosterCategory } from '../types';

const mapToCategory = (category: CategoryApiResponse): PosterCategory => ({
  id: category.id,
  name: category.name['en-GB'] || 'Unnamed Category',
  parentId: category.parent?.id || null,
});

export const fetchCategories = async (): Promise<PosterCategory[]> => {
  const response = await apiRoot
    .categories()
    .get({
      queryArgs: {
        expand: ['parent'],
      },
    })
    .execute();
  return response.body.results.map(mapToCategory);
};
