import apiRoot from '@/feature/api/api-client-credentials-flow';

export const fetchCategories = async () => {
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
