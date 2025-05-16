export function setAuthToLocalStorage(ACCESS_TOKEN_KEY: string, AUTH_STATUS_KEY: boolean) {
  localStorage.setItem('ACCESS_TOKEN_KEY', ACCESS_TOKEN_KEY);
  localStorage.setItem('AUTH_STATUS_KEY', AUTH_STATUS_KEY.toString());
}

export function getAuthFromLocalStorage(): {
  ACCESS_TOKEN_KEY: string | null;
  AUTH_STATUS_KEY: boolean;
} {
  const ACCESS_TOKEN_KEY = localStorage.getItem('ACCESS_TOKEN_KEY');
  const AUTH_STATUS_KEY = localStorage.getItem('AUTH_STATUS_KEY') === 'true';
  return { ACCESS_TOKEN_KEY, AUTH_STATUS_KEY };
}

export function clearAuthFromLocalStorage() {
  localStorage.removeItem('ACCESS_TOKEN_KEY');
  localStorage.removeItem('AUTH_STATUS_KEY');
}
