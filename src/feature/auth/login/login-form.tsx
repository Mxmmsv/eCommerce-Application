/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { safeParse } from 'valibot';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertFailedLogin } from '@/feature/auth/login/alert-login';
import { handleLogin } from '@/feature/auth/login/handle-login';
import { formSchema } from '@/feature/auth/login/handle-validation';
import { cn } from '@/lib/utils';

type FormErrors = {
  email?: string;
  password?: string;
};

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError(false);
    setFormErrors({});

    const result = safeParse(formSchema, { email, password });

    if (!result.success) {
      const errors = result.issues.reduce(
        (acc, issue) => {
          const path = issue.path?.[0]?.key;
          if (typeof path === 'string') {
            acc[path] = issue.message;
          }
          return acc;
        },
        {} as Record<string, string>,
      );
      setFormErrors(errors);
      return;
    }

    try {
      await handleLogin(email, password);
      await navigate('/');
    } catch (error) {
      setLoginError(true);
      console.error('Login failed', error);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid gap-6">
              {loginError && <AlertFailedLogin />}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="mail@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="strong-pass-123"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {formErrors.password && (
                  <p className="text-sm text-red-500">{formErrors.password}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link to="/register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
