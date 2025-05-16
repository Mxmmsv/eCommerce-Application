import type { HttpMiddlewareOptions } from '@commercetools/ts-client';

const projectKey: string = import.meta.env.VITE_PROJECT_KEY;
const clientId: string = import.meta.env.VITE_CLIENT_ID;
const clientSecret: string = import.meta.env.VITE_CLIENT_SECRET;
const authUrl: string = import.meta.env.VITE_AUTH_URL;
const apiUrl: string = import.meta.env.VITE_API_URL;
const scopes: string[] = import.meta.env.VITE_SCOPES.split(' ');

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
};

export { projectKey, clientId, clientSecret, authUrl, apiUrl, scopes, httpMiddlewareOptions };
