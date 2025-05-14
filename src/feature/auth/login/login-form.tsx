import { AlertCircle, ToggleLeft, ToggleRight } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertFailedLogin } from '@/feature/auth/login/alert-login';
import { useLoginForm } from '@/feature/auth/login/use-login-form';
import { cn } from '@/lib/utils';

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const { register, handleSubmit, errors, onSubmit, showPassword, setShowPassword, loginError } =
    useLoginForm();

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} noValidate>
            <div className="grid gap-6">
              {loginError && <AlertFailedLogin />}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="text"
                    placeholder="mail@example.com"
                    aria-invalid={!!errors.email}
                    className={`overflow-hidden ${errors.email ? 'pr-8' : ''}`}
                    {...register('email')}
                  />
                  {errors.email && (
                    <AlertCircle className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-red-500" />
                  )}
                </div>
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="strong-pass-123"
                    aria-invalid={!!errors.password}
                    className={`overflow-hidden ${errors.password ? 'pr-16' : 'pr-10'}`}
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className={`absolute top-1/2 ${errors.password ? 'right-10' : 'right-3'} -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-700`}
                  >
                    {showPassword ? (
                      <ToggleRight className="h-5 w-5" />
                    ) : (
                      <ToggleLeft className="h-5 w-5" />
                    )}
                  </button>
                  {errors.password && (
                    <AlertCircle className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-red-500" />
                  )}
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
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
