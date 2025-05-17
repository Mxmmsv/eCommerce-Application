import { valibotResolver } from '@hookform/resolvers/valibot';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { CloseButton } from '@/components/ui/button/close-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { AddressFields } from './fields/address-fields';
import { DateField } from './fields/date-field';
import { EmailField } from './fields/email-field';
import { NameFields } from './fields/name-fields';
import { PasswordField } from './fields/password-field';
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
    control,
  } = useForm<RegistrationFormData>({
    resolver: valibotResolver(schema),
    shouldUseNativeValidation: false,
    defaultValues: {
      country: '',
    },
  });

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="relative p-12">
        <CloseButton className="flex justify-end" />
        <CardHeader className="flex justify-center">
          <CardTitle className="text-2xl">Create an account</CardTitle>
        </CardHeader>
        <CardContent>
          <form noValidate onSubmit={(e) => void handleSubmit(onRegister)(e)}>
            <div className="flex flex-col gap-3">
              <NameFields register={register} errors={errors} />
              <DateField register={register} errors={errors} />
              <AddressFields register={register} errors={errors} control={control} />
              <EmailField register={register} errors={errors} />
              <PasswordField register={register} errors={errors} />

              <Button type="submit" className="mt-4 w-3xs self-center">
                Register
              </Button>
              <Button variant="outline" className="w-3xs self-center" asChild>
                <Link to="/login">Already have an account? Sign in</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
