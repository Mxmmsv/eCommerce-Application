import type { NavigateFunction } from 'react-router';
import { toast } from 'sonner';

import AnonymousFlowApiClient from '@/feature/api/api-client-anonymous';
import { signInCustomer } from '@/feature/api/sign-in-customer';

import type { RegistrationFormData } from './types';

export const handleRegister = async (data: RegistrationFormData, navigate: NavigateFunction) => {
  try {
    const anonymousApiRoot = AnonymousFlowApiClient();
    await anonymousApiRoot
      .customers()
      .post({ body: getRegistrationBody(data) })
      .execute();

    await signInCustomer(data.email, data.password);

    toast.success('Success!', {
      description: 'Registration completed',
    });
    void navigate('/', { replace: true });
  } catch (error) {
    handleRegisterError(error, navigate);
  }
};

const getRegistrationBody = (data: RegistrationFormData) => {
  const cleanData = {
    ...data,
    ...(data.setAsDefaultShipping && {
      alternativeShippingCountry: undefined,
      alternativeShippingPostalCode: undefined,
      alternativeShippingCity: undefined,
      alternativeShippingStreet: undefined,
    }),
    ...(data.setAsDefaultBilling && {
      alternativeBillingCountry: undefined,
      alternativeBillingPostalCode: undefined,
      alternativeBillingCity: undefined,
      alternativeBillingStreet: undefined,
    }),
  };

  const addresses = [];

  addresses.push({
    country: data.country,
    postalCode: data.postalCode,
    city: data.city,
    streetName: data.streetName,
  });

  const shippingIndex = !cleanData.setAsDefaultShipping
    ? addresses.push({
        country: cleanData.alternativeShippingCountry || cleanData.country,
        postalCode: cleanData.alternativeShippingPostalCode || cleanData.postalCode,
        city: cleanData.alternativeShippingCity || cleanData.city,
        streetName: cleanData.alternativeShippingStreet || cleanData.streetName,
      }) - 1
    : 0;

  const billingIndex = !cleanData.setAsDefaultBilling
    ? addresses.push({
        country: cleanData.alternativeBillingCountry || cleanData.country,
        postalCode: cleanData.alternativeBillingPostalCode || cleanData.postalCode,
        city: cleanData.alternativeBillingCity || cleanData.city,
        streetName: cleanData.alternativeBillingStreet || cleanData.streetName,
      }) - 1
    : 0;

  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    dateOfBirth: data.dateOfBirth,
    addresses,
    defaultShippingAddress: shippingIndex,
    defaultBillingAddress: billingIndex,
  };
};

const handleRegisterError = (error: unknown, navigate: NavigateFunction) => {
  if (
    typeof error === 'object' &&
    error !== null &&
    'body' in error &&
    error.body &&
    typeof error.body === 'object' &&
    'errors' in error.body &&
    Array.isArray(error.body.errors)
  ) {
    const apiError = error as {
      body: {
        errors: {
          code: string;
          message: string;
        }[];
      };
    };

    if (apiError.body.errors.some((err) => err.code === 'DuplicateField')) {
      toast.warning('This email is already registered', {
        description: 'Please sign in or use a different email address',
        action: {
          label: (
            <div className="-mx-4 rounded-md border border-[var(--warning-border)] bg-[var(--warning-bg)] px-3 py-1 font-medium text-[var(--warning-text)] transition hover:bg-[var(--warning-border)]">
              Login
            </div>
          ),
          onClick: () => {
            void navigate('/login');
          },
        },
      });
    } else {
      const firstError = apiError.body.errors[0];
      toast.error('Registration failed', {
        description: firstError?.message || 'Invalid data',
      });
    }
  } else if (error instanceof Error) {
    toast.error('Registration failed.', {
      description: error.message,
    });
  } else
    toast.error('Server error', {
      description: 'Try again later',
    });
};
