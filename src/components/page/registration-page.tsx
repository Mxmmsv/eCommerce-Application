import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

import apiRoot from '@/feature/api/apiClient';
import { RegistrationForm } from '@/feature/registration/registration-form';
import type { RegistrationFormData } from '@/feature/registration/types';

export default function RegistrationPage() {
  const navigate = useNavigate();
  const handleRegister = async (data: RegistrationFormData) => {
    console.log('Данные перед отправкой:', JSON.stringify(data, null, 2));
    try {
      const response = await apiRoot
        .customers()
        .post({
          body: {
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
          },
        })
        .execute();

      console.log('Success:', response);

      toast.success('Success!', {
        description: 'Registration completed',
      });
      void navigate(-1);
    } catch (error) {
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
          toast.warning('Email is busy', {
            description: 'This email is already registered',
            duration: Infinity,
            action: {
              label: (
                <button className="-mx-4 rounded-md border border-[var(--warning-border)] bg-[var(--warning-bg)] px-3 py-1 font-medium text-[var(--warning-text)] transition hover:bg-[var(--warning-border)]">
                  Login
                </button>
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
    }

    console.log('data:', data);
  };

  return (
    <div className="bg-muted flex min-h-svh items-center justify-center p-6">
      <div className="flex w-full max-w-xl min-w-xs flex-col gap-6">
        <Link to="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-10 w-10 items-center justify-center">
            <img src="logo.svg" alt="logo" />
          </div>
          Poster Store
        </Link>
        <RegistrationForm onRegister={(data) => handleRegister(data)} />
      </div>
    </div>
  );
}
