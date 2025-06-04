import { EyeIcon, EyeOffIcon, Key } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLogout } from '@/feature/auth/login/api/use-logout';
import { setAuthToLocalStorage } from '@/service/store/local-storage';
import { useAuthStore } from '@/service/store/use-auth-store';
import { useCustomerStore } from '@/service/store/use-user-store';

import { tokenCache } from '../api/api-token-store';
import { signInCustomer } from '../auth/login/api/sign-in-customer';

import { changeCustomerPassword } from './api/update-my-customer';

type FormData = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

export default function PasswordCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const customer = useCustomerStore((state) => state.customer);
  let token = useAuthStore((state) => state.token);
  const logout = useLogout();

  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit = async (data: FormData) => {
    const { currentPassword, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      if (!token) {
        token = localStorage.getItem('ACCESS_TOKEN_KEY');
      }
      if (!token || !customer) {
        throw new Error(!token ? 'Missing token' : 'Customer not found');
      }

      await changeCustomerPassword(customer.version, currentPassword, password, customer.email);

      const response = await signInCustomer(customer.email, password);
      const newToken = response.body.customer?.id ? tokenCache.get().token : null;

      if (newToken) {
        setAuthToLocalStorage(newToken, true);
      }
      toast.success('Password updated! Logging out...');
      logout();
    } catch (error) {
      toast.error('Failed to change password');
      console.error(error);
      setIsEditing(false);
    } finally {
      reset();
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>
          Change your password here. After saving, you will be logged out.
        </CardDescription>
      </CardHeader>
      <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="current">Current password</Label>
            <div className="flex items-center">
              <Input
                id="current"
                placeholder="Enter your current password"
                type={isPasswordVisible ? 'text' : 'password'}
                disabled={!isEditing}
                {...register('currentPassword', { required: 'Current password is required' })}
              />
              {errors.currentPassword && (
                <p className="text-sm text-red-500">{errors.currentPassword.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="new">New password</Label>
            <Input
              id="new"
              placeholder="Enter your new password"
              type={isPasswordVisible ? 'text' : 'password'}
              disabled={!isEditing}
              {...register('password', {
                required: 'New password is required',
                minLength: {
                  value: 8,
                  message: 'Minimum length is 8 characters',
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                  message:
                    'Password must include uppercase, lowercase and a number and contain only Latin letters',
                },
              })}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="confirm-new">Confirm new password</Label>
            <Input
              id="confirm-new"
              placeholder="Confirm new password"
              type={isPasswordVisible ? 'text' : 'password'}
              disabled={!isEditing}
              {...register('confirmPassword', {
                required: 'Please confirm your new password',
              })}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="mt-5 justify-end">
          {isEditing ? (
            <div className="flex w-full items-center justify-between">
              <Button type="button" variant="ghost" size="icon" onClick={togglePasswordVisibility}>
                {isPasswordVisible ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </Button>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    reset(undefined, { keepValues: true });
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Key size={20} strokeWidth={1.25} className="mr-2" />
              Change
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
