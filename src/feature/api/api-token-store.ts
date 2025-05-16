import type { TokenStore, TokenCache } from '@commercetools/ts-client';

let tokenCacheStore: TokenStore = {
  token: '',
  expirationTime: 0,
  refreshToken: '',
};

const tokenCache: TokenCache = {
  get: () => tokenCacheStore,
  set: (cache) => {
    tokenCacheStore = cache;
  },
};

export default tokenCache;
