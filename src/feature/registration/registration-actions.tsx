import type { NavigateFunction } from 'react-router';
import { toast } from 'sonner';

import AnonymousFlowApiClient from '@/feature/api/api-client-anonymous';
import type { RegistrationFormData } from '@/feature/registration/types';

import { signInCustomerWithMail } from '../auth/login/sign-in-customer';

export const handleRegister = async (data: RegistrationFormData, navigate: NavigateFunction) => {
  console.log('Данные перед отправкой:', JSON.stringify(data, null, 2));
  try {
    const anonymousApiRoot = AnonymousFlowApiClient();
    await anonymousApiRoot
      .customers()
      .post({ body: getRegistrationBody(data) })
      .execute();

    console.log('Success:', anonymousApiRoot);

    await signInCustomerWithMail(data.email, data.password);

    toast.success('Success!', {
      description: 'Registration completed',
    });
    void navigate('/', { replace: true });
  } catch (error) {
    handleRegisterError(error, navigate);
    console.log('data:', data);
  }
};

const getRegistrationBody = (data: RegistrationFormData) => ({
  firstName: data.firstName,
  lastName: data.lastName,
  email: data.email,
  password: data.password,
  dateOfBirth: data.dateOfBirth,
  addresses: [
    {
      country: data.country,
      postalCode: data.postalCode,
      city: data.city,
      streetName: data.streetName,
    },
  ],
  defaultShippingAddress: 0,
  defaultBillingAddress: 0,
});

const handleRegisterError = (error: unknown, navigate: NavigateFunction) => {
  console.error('Fail:', error);
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
