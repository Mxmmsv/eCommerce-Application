import type { TokenStore, TokenCache } from '@commercetools/ts-client';

let initialValue: TokenStore = {
  token: '',
  expirationTime: 0,
  refreshToken: '',
};

export const tokenCache: TokenCache = {
  get: () => initialValue,
  set: (cache) => {
    initialValue = cache;
  },
};

export const clearTokenCache = () => {
  tokenCache.set(initialValue);
};
