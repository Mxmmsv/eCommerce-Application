import { loginCustomerWithMail } from '@/feature/api/api-login-email';
import tokenCache from '@/feature/api/api-token-store';

export const handleLogin = async (email: string, password: string) => {
  try {
    const response = await loginCustomerWithMail(email, password);
    const token = tokenCache.get().token;
    if (token) {
      localStorage.setItem('accessToken', token);
    }
    console.log(`token: ${token}`);
    console.log(response.body.customer);
  } catch (error) {
    console.error('Ошибка логина', error);
  }
};
