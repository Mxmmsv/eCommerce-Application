import apiRoot from '@/feature/api/api-client-credentials-flow';

import type { PosterType } from '../types';

export const fetchProductTypes = async (): Promise<PosterType[]> => {
  const response = await apiRoot.productTypes().get().execute();
  return response.body.results.map((type) => ({
    id: type.id,
    name: type.name,
  }));
};
