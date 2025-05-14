import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import type {
  CorrelationIdMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
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

const PasswordFlowApiClient = (email: string, password: string) => {
  const PasswordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: authUrl,
    projectKey,
    credentials: {
      clientId: clientId,
      clientSecret: clientSecret,
      user: {
        username: email,
        password: password,
      },
    },
    scopes,
    tokenCache,
    httpClient: fetch,
  };

  const correlationIdMiddlewareOptions: CorrelationIdMiddlewareOptions = {
    generate: (): string => crypto.randomUUID(),
  };

  const passwordFlowClient = new ClientBuilder()
    .withPasswordFlow(PasswordAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withCorrelationIdMiddleware(correlationIdMiddlewareOptions)
    .build();

  const passwordFlowApiRoot = createApiBuilderFromCtpClient(passwordFlowClient).withProjectKey({
    projectKey,
  });

  return passwordFlowApiRoot;
};

export default PasswordFlowApiClient;
