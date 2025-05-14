import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import type {
  AuthMiddlewareOptions,
  CorrelationIdMiddlewareOptions,
} from '@commercetools/ts-client';
import { ClientBuilder } from '@commercetools/ts-client';

import {
  authUrl,
  clientId,
  clientSecret,
  httpMiddlewareOptions,
  projectKey,
  scopes,
} from '@/feature/api/api-client-builder';
import tokenCache from '@/feature/api/api-token-store';

const AnonymousFlowApiClient = () => {
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: authUrl,
    projectKey,
    credentials: {
      clientId: clientId,
      clientSecret: clientSecret,
    },
    scopes,
    tokenCache,
    httpClient: fetch,
  };

  const correlationIdMiddlewareOptions: CorrelationIdMiddlewareOptions = {
    generate: (): string => crypto.randomUUID(),
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
