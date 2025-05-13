import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import type {
  AuthMiddlewareOptions,
  HttpMiddlewareOptions,
  CorrelationIdMiddlewareOptions,
} from '@commercetools/ts-client';
import { ClientBuilder } from '@commercetools/ts-client';

import tokenCache from '@/feature/api/api-token-store';

const projectKey: string = import.meta.env.VITE_PROJECT_KEY;
const clientId: string = import.meta.env.VITE_CLIENT_ID;
const clientSecret: string = import.meta.env.VITE_CLIENT_SECRET;
const authUrl: string = import.meta.env.VITE_AUTH_URL;
const apiUrl: string = import.meta.env.VITE_API_URL;
const scopes: string[] = import.meta.env.VITE_SCOPES.split(' ');

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

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiUrl,
  includeResponseHeaders: true,
  maskSensitiveHeaderData: false,
  includeOriginalRequest: true,
  includeRequestInErrorResponse: true,
  enableRetry: true,
  retryConfig: {
    maxRetries: 3,
    retryDelay: 200,
    backoff: false,
    retryCodes: [500, 503],
  },
  httpClient: fetch,
};

const correlationIdMiddlewareOptions: CorrelationIdMiddlewareOptions = {
  generate: (): string => crypto.randomUUID(),
};

const client = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withCorrelationIdMiddleware(correlationIdMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });

export default apiRoot;
