export function setAuthToLocalStorage(ACCESS_TOKEN_KEY: string, IS_AUTHORIZED: boolean) {
  localStorage.setItem('ACCESS_TOKEN_KEY', ACCESS_TOKEN_KEY);
  localStorage.setItem('IS_AUTHORIZED', IS_AUTHORIZED.toString());
}

export function getAuthFromLocalStorage(): {
  ACCESS_TOKEN_KEY: string | null;
  IS_AUTHORIZED: boolean;
} {
  const ACCESS_TOKEN_KEY = localStorage.getItem('ACCESS_TOKEN_KEY');
  const IS_AUTHORIZED = localStorage.getItem('IS_AUTHORIZED') === 'true';
  return { ACCESS_TOKEN_KEY, IS_AUTHORIZED };
}

export function clearAuthFromLocalStorage() {
  localStorage.removeItem('ACCESS_TOKEN_KEY');
  localStorage.removeItem('IS_AUTHORIZED');
}
