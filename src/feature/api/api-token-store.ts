import type { TokenStore, TokenCache } from '@commercetools/ts-client';

const getInitialToken = (): TokenStore => {
  const token = localStorage.getItem('ACCESS_TOKEN_KEY');
  return token
    ? { token, expirationTime: 0, refreshToken: '' }
    : { token: '', expirationTime: 0, refreshToken: '' };
};

export const tokenCache: TokenCache = {
  get: () => getInitialToken(),
  set: (cache) => {
    localStorage.setItem('ACCESS_TOKEN_KEY', cache.token);
  },
};
