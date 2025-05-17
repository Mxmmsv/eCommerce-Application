import { valibotResolver } from '@hookform/resolvers/valibot';
import { AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CloseButton } from '@/components/ui/close-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

import { AddressFields } from './address-fields';
import { schema } from './registration-schema';
import type { RegistrationFormData } from './types';

type Props = {
  className?: string;
  onRegister: (data: RegistrationFormData) => Promise<void>;
} & React.ComponentProps<'div'>;

export function RegistrationForm({ className, onRegister, ...props }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: valibotResolver(schema),
    shouldUseNativeValidation: false,
  });

  return (
    <div className={cn('flex flex-col gap-6 p-0', className)} {...props}>
      <Card className="relative p-12">
        <CloseButton className="flex justify-end" />
        <CardHeader className="flex justify-center">
          <CardTitle className="text-2xl">Create an account</CardTitle>
        </CardHeader>
        <CardContent>
          <form noValidate onSubmit={(e) => void handleSubmit(onRegister)(e)}>
            <div className="flex flex-col gap-3">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First name</Label>
                <div className="relative">
                  <Input
                    id="firstName"
                    {...register('firstName', { required: 'Required field' })}
                    aria-invalid={!!errors.firstName}
                  />
                  {errors.firstName && (
                    <AlertCircle className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-red-500" />
                  )}
                </div>
                {errors.firstName && (
                  <p className="error-message text-sm text-red-500">{errors.firstName.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last name</Label>
                <div className="relative">
                  <Input
                    id="lastName"
                    {...register('lastName', { required: 'Required field' })}
                    aria-invalid={!!errors.lastName}
                  />
                  {errors.lastName && (
                    <AlertCircle className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-red-500" />
                  )}
                </div>
                {errors.lastName && (
                  <p className="error-message text-sm text-red-500">{errors.lastName.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <div className="relative">
                  <Input
                    id="dateOfBirth"
                    type="date"
                    {...register('dateOfBirth')}
                    max={new Date().toISOString().split('T')[0]}
                    aria-invalid={!!errors.dateOfBirth}
                  />
                  {errors.dateOfBirth && (
                    <AlertCircle className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-red-500" />
                  )}
                </div>
                {errors.dateOfBirth && (
                  <p className="error-message text-sm text-red-500">{errors.dateOfBirth.message}</p>
                )}
              </div>

              <AddressFields register={register} errors={errors} />

              <div className="mt-6 grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register('email', {
                      required: 'Required field',
                    })}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <AlertCircle className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-red-500" />
                  )}
                </div>
                {errors.email && (
                  <p className="error-message text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    {...register('password', { required: 'Required field' })}
                    aria-invalid={!!errors.password}
                  />
                  {errors.password && (
                    <AlertCircle className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-red-500" />
                  )}
                </div>
                {errors.password && (
                  <p className="error-message text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
              <Button type="submit" className="mt-4 w-3xs self-center">
                Register
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              <Button variant="outline" className="w-3xs" asChild>
                <Link to="/login">Already have an account? Sign in</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
