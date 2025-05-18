import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { describe, it, expect } from 'vitest';

import type { RegistrationFormData } from '@/feature/auth/registration/types';

import { AddressFields } from '../address-fields';

function renderWithForm(
  defaultValues: Partial<RegistrationFormData> = {},
  errors: Partial<Record<keyof RegistrationFormData, { message: string; type: string }>> = {},
) {
  const Wrapper = () => {
    const {
      register,
      control,
      formState: { errors: formErrors },
    } = useForm<RegistrationFormData>({
      defaultValues,
      resolver: (data) => ({ values: data, errors: {} }),
    });
    return (
      <AddressFields register={register} errors={{ ...formErrors, ...errors }} control={control} />
    );
  };
  render(<Wrapper />);
}

describe('AddressFields', () => {
  it('should render the form title and fields', () => {
    renderWithForm();

    expect(screen.getByText(/Address Information/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('Postal code')).toBeInTheDocument();
    expect(screen.getByLabelText('City')).toBeInTheDocument();
    expect(screen.getByLabelText('Street')).toBeInTheDocument();
  });

  it('should show validation errors', () => {
    renderWithForm(
      {},
      {
        country: { message: 'Country is required', type: 'required' },
        postalCode: { message: 'Postal code is invalid', type: 'pattern' },
        city: { message: 'City should contain only letters', type: 'pattern' },
        streetName: { message: 'Street is required', type: 'required' },
      },
    );

    expect(screen.getByText(/country is required/i)).toBeInTheDocument();
    expect(screen.getByText(/postal code is invalid/i)).toBeInTheDocument();
    expect(screen.getByText(/city should contain only letters/i)).toBeInTheDocument();
    expect(screen.getByText(/street is required/i)).toBeInTheDocument();

    expect(screen.getByText(/country is required/i)).toHaveClass('error-message');
    expect(screen.getByText(/postal code is invalid/i)).toHaveClass('error-message');
    expect(screen.getByText(/city should contain only letters/i)).toHaveClass('error-message');
    expect(screen.getByText(/street is required/i)).toHaveClass('error-message');
  });
});
