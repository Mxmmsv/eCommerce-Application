import { render, screen } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import { describe, it, expect } from 'vitest';

import type { RegistrationFormData } from '@/feature/auth/registration/types';

import { AddressFields } from '../address-fields';

describe('AddressFields', () => {
  it('should render all address fields', () => {
    const Wrapper = () => {
      const methods = useForm<RegistrationFormData>();
      return (
        <FormProvider {...methods}>
          <AddressFields />
        </FormProvider>
      );
    };

    render(<Wrapper />);
    expect(screen.getByText('Address Information')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('Postal Code')).toBeInTheDocument();
    expect(screen.getByLabelText('City')).toBeInTheDocument();
    expect(screen.getByLabelText('Street')).toBeInTheDocument();
    expect(screen.getByText('Set as default shipping address')).toBeInTheDocument();
    expect(screen.getByText('Set as default billing address')).toBeInTheDocument();
  });
});
