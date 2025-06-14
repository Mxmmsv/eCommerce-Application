export function setAuthToLocalStorage(
  ACCESS_TOKEN_KEY: string,
  IS_AUTHORIZED: boolean,
  CUSTOMER_ID?: string,
) {
  localStorage.setItem('ACCESS_TOKEN_KEY', ACCESS_TOKEN_KEY);
  localStorage.setItem('IS_AUTHORIZED', IS_AUTHORIZED.toString());
  if (CUSTOMER_ID) {
    localStorage.setItem('CUSTOMER_ID', CUSTOMER_ID);
  }
}

export function getAuthFromLocalStorage() {
  return {
    ACCESS_TOKEN_KEY: localStorage.getItem('ACCESS_TOKEN_KEY'),
    IS_AUTHORIZED: localStorage.getItem('IS_AUTHORIZED') === 'true',
    CUSTOMER_ID: localStorage.getItem('CUSTOMER_ID'),
  };
}
