import apiRoot from '@/feature/api/api-client-credentials-flow';

async function fetchPromoCode() {
  const response = await apiRoot.discountCodes().get().execute();
  return response.body.results;
}

export default fetchPromoCode;
