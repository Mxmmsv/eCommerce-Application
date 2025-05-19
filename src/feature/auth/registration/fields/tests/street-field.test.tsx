import { render, screen } from '@testing-library/react';
import ue from '@testing-library/user-event';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { describe, it, expect } from 'vitest';

import type { RegistrationFormData } from '@/feature/auth/registration/types';

import { StreetField } from '../street-field';

describe('StreetField', () => {
  it('should render basic street input', () => {
    const Wrapper = () => {
      const methods = useForm<RegistrationFormData>();
      return (
        <FormProvider {...methods}>
          <StreetField />
        </FormProvider>
      );
    };
    render(<Wrapper />);

    const input = screen.getByLabelText('Street');
    expect(input.tagName.toLowerCase()).toBe('input');
  });

  it('should render with prefix', () => {
    const Wrapper = () => {
      const methods = useForm<RegistrationFormData>();
      return (
        <FormProvider {...methods}>
          <StreetField prefix="alternativeShipping" />
        </FormProvider>
      );
    };
    render(<Wrapper />);
    expect(screen.getByLabelText('Alternative Street')).toBeInTheDocument();
  });

  it('should show error message', () => {
    const Wrapper = () => {
      const methods = useForm<RegistrationFormData>();
      React.useEffect(() => {
        methods.setError('streetName', { type: 'required', message: 'Street is required' });
        methods.setError('alternativeShippingStreet', {
          type: 'required',
          message: 'Shipping street error',
        });
      }, [methods]);
      return (
        <FormProvider {...methods}>
          <>
            <StreetField />
            <StreetField prefix="alternativeShipping" />
          </>
        </FormProvider>
      );
    };
    render(<Wrapper />);

    expect(screen.getByText('Street is required')).toBeInTheDocument();
    expect(screen.getByText('Shipping street error')).toBeInTheDocument();
  });

  it('should accept input', async () => {
    const user = ue.setup();
    const Wrapper = () => {
      const methods = useForm<RegistrationFormData>();
      return (
        <FormProvider {...methods}>
          <StreetField />
        </FormProvider>
      );
    };
    render(<Wrapper />);

    const input = screen.getByLabelText('Street');
    await user.type(input, 'Main Street 123');

    expect(input).toHaveValue('Main Street 123');
  });
});
