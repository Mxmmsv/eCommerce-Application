import { valibotResolver } from '@hookform/resolvers/valibot';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CloseButton } from '@/components/ui/close-button';
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
  const methods = useForm<RegistrationFormData>({
    resolver: valibotResolver(schema),
    shouldUseNativeValidation: false,
    defaultValues: {
      country: '',
      alternativeShippingCountry: '',
      alternativeBillingCountry: '',
      setAsDefaultShipping: true,
      setAsDefaultBilling: true,
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
          <FormProvider {...methods}>
            <form noValidate onSubmit={(e) => void methods.handleSubmit(onRegister)(e)}>
              <div className="flex flex-col gap-3">
                <NameFields />
                <DateField />
                <EmailField />
                <PasswordField />
                <AddressFields />

                <Button type="submit" className="mt-4 w-3xs self-center">
                  Register
                </Button>
                <Button variant="outline" className="w-3xs self-center" asChild>
                  <Link to="/login">Already have an account? Sign in</Link>
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
