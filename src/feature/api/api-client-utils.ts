import { useAuthStore } from '@/service/store/use-auth-store';

import AnonymousFlowApiClient from './api-client-anonymous';
import { createApiClientWithToken } from './api-client-token-flow';

export const getApiClient = () => {
  const { token } = useAuthStore.getState();
  return token ? createApiClientWithToken() : AnonymousFlowApiClient();
};
