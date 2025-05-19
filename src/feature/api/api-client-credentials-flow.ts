import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder, type AuthMiddlewareOptions } from '@commercetools/ts-client';

import {
  authUrl,
  clientId,
  clientSecret,
  correlationIdMiddlewareOptions,
  httpMiddlewareOptions,
  projectKey,
  scopes,
} from './api-client-builder';

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: authUrl,
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
  scopes,
  httpClient: fetch,
};

const client = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withCorrelationIdMiddleware(correlationIdMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });

export default apiRoot;
