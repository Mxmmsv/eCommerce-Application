import type { TokenStore, TokenCache } from '@commercetools/ts-client';

let tokenCacheStore: TokenStore = {
  token: '',
  expirationTime: 0,
  refreshToken: '',
};

export const tokenCache: TokenCache = {
  get: () => tokenCacheStore,
  set: (cache) => {
    tokenCacheStore = cache;
  },
};

export const clearTokenCache = () => {
  tokenCache.set({
    token: '',
    expirationTime: 0,
    refreshToken: '',
  });
};
