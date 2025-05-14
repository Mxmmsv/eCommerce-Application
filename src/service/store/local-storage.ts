function setTokenToLocalStorage(token: string, isAuthenticated: boolean) {
  localStorage.setItem('access_token', token);
  localStorage.setItem('isAuthorized', isAuthenticated.toString());
}

function getTokenFromLocalStorage() {
  const token = localStorage.getItem('access_token');
  const isAuthenticated = localStorage.getItem('isAuthorized') === 'true';
  return { token, isAuthorized: isAuthenticated };
}

export { setTokenToLocalStorage, getTokenFromLocalStorage };
