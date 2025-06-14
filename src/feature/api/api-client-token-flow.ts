import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/ts-client';

import {
  projectKey,
  correlationIdMiddlewareOptions,
  httpMiddlewareOptions,
} from './api-client-builder';
import { tokenCache } from './api-token-store';

export const createApiClientWithToken = () => {
  const accessToken = tokenCache.get().token;
  if (!accessToken) throw new Error('Token is missing');
  const httpClientWithToken = async (request: RequestInfo, options?: RequestInit) => {
    const headers = new Headers(options?.headers);
    headers.set('Authorization', `Bearer ${accessToken}`);

    const newOptions: RequestInit = {
      ...options,
      headers,
    };

    return fetch(request, newOptions);
  };

  const httpMiddlewareOptionsWithToken = {
    ...httpMiddlewareOptions,
    httpClient: httpClientWithToken,
  };

  const client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withHttpMiddleware(httpMiddlewareOptionsWithToken)
    .withCorrelationIdMiddleware(correlationIdMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};
