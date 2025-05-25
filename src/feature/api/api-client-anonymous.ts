import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import type { AuthMiddlewareOptions } from '@commercetools/ts-client';
import { ClientBuilder } from '@commercetools/ts-client';

import {
  authUrl,
  clientId,
  clientSecret,
  correlationIdMiddlewareOptions,
  httpMiddlewareOptions,
  projectKey,
  scopes,
} from './api-client-builder';
import tokenCache from './api-token-store';

const AnonymousFlowApiClient = () => {
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: authUrl,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
    },
    scopes,
    tokenCache,
    httpClient: fetch,
  };

  const anonymousFlowClient = new ClientBuilder()
    .withAnonymousSessionFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withCorrelationIdMiddleware(correlationIdMiddlewareOptions)
    .build();

  const anonymousFlowApiRoot = createApiBuilderFromCtpClient(anonymousFlowClient).withProjectKey({
    projectKey,
  });

  return anonymousFlowApiRoot;
};

export default AnonymousFlowApiClient;
