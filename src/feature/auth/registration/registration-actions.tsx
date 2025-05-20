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
  const addresses = [
    {
      country: data.country,
      postalCode: data.postalCode,
      city: data.city,
      streetName: data.streetName,
    },
  ];

  if (!data.skipDefaultAddresses) {
    if (!data.setAsDefaultShipping && data.alternativeShippingStreet) {
      addresses.push({
        country: data.alternativeShippingCountry || data.country,
        postalCode: data.alternativeShippingPostalCode || data.postalCode,
        city: data.alternativeShippingCity || data.city,
        streetName: data.alternativeShippingStreet,
      });
    }

    if (!data.setAsDefaultBilling && data.alternativeBillingStreet) {
      addresses.push({
        country: data.alternativeBillingCountry || data.country,
        postalCode: data.alternativeBillingPostalCode || data.postalCode,
        city: data.alternativeBillingCity || data.city,
        streetName: data.alternativeBillingStreet,
      });
    }
  }

  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    dateOfBirth: data.dateOfBirth,
    addresses,
    defaultShippingAddress: data.skipDefaultAddresses
      ? undefined
      : data.setAsDefaultShipping
        ? 0
        : addresses.length > 1
          ? 1
          : 0,
    defaultBillingAddress: data.skipDefaultAddresses
      ? undefined
      : data.setAsDefaultBilling
        ? 0
        : addresses.length > 1
          ? 2
          : 0,
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
