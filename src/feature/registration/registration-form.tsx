import { valibotResolver } from '@hookform/resolvers/valibot';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

import { CloseButton } from '../../components/ui/button/close-button';

import { AddressFields } from './address-fields';
import { schema } from './register-schema';
import type { FormData } from './types';

export function RegistrationForm({ className, ...props }: React.ComponentProps<'div'>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: valibotResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    try {
      console.log('Данные формы:', data);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="relative p-12">
        <CloseButton className="flex justify-end" />
        <CardHeader className="flex justify-center">
          <CardTitle className="text-2xl">Create an account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
            <div className="flex flex-col gap-5">
              <div className="grid gap-3">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  {...register('firstName', { required: 'Required field' })}
                  aria-invalid={!!errors.firstName}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">{errors.firstName.message}</p>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  {...register('lastName', { required: 'Required field' })}
                  aria-invalid={!!errors.lastName}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">{errors.lastName.message}</p>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  {...register('dateOfBirth')}
                  max={new Date().toISOString().split('T')[0]}
                  aria-invalid={!!errors.dateOfBirth}
                />
                {errors.dateOfBirth && (
                  <p className="text-sm text-red-500">{errors.dateOfBirth.message}</p>
                )}
              </div>

              <AddressFields register={register} errors={errors} />

              <div className="mt-6 grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register('email', {
                    required: 'Required field',
                  })}
                  aria-invalid={!!errors.email}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password', { required: 'Required field' })}
                  aria-invalid={!!errors.password}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
              <Button type="submit" className="w-3xs self-center">
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
