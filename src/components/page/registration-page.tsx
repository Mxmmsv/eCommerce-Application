import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

import apiRoot from '@/feature/api/apiClient';
import { RegistrationForm } from '@/feature/registration/registration-form';
import type { RegistrationFormData } from '@/feature/registration/types';

export default function RegistrationPage() {
  const navigate = useNavigate();
  const handleRegister = async (data: RegistrationFormData) => {
    await new Promise((res) => setTimeout(res, 100));

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
      toast.success('Registration successful!');
      void navigate(-1);
    } catch (error) {
      console.error('Fail:', error);
      if (error instanceof Error) {
        toast.error(`Registration failed. ${error.message}`);
      } else toast.error('Unknown error');
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
