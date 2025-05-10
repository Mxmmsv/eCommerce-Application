import { loginCustomerWithMail } from '@/feature/api/api-login-email';
import tokenCache from '@/feature/api/api-token-store';

export const handleLogin = async (email: string, password: string) => {
  await loginCustomerWithMail(email, password);
  const token = tokenCache.get().token;
  if (!token) {
    throw new Error('Token not found');
  }
  localStorage.setItem('accessToken', token);
};
