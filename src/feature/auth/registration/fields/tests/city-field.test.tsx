import { render, screen } from '@testing-library/react';
import ue from '@testing-library/user-event';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { describe, it, expect } from 'vitest';

import type { RegistrationFormData } from '@/feature/auth/registration/types';

import { CityField } from '../city-field';

describe('CityField', () => {
  it('should render basic city input', () => {
    const Wrapper = () => {
      const methods = useForm<RegistrationFormData>();
      return (
        <FormProvider {...methods}>
          <CityField />
        </FormProvider>
      );
    };
    render(<Wrapper />);

    const input = screen.getByLabelText('City');
    expect(input.tagName.toLowerCase()).toBe('input');
  });

  it('should render with prefix', () => {
    const Wrapper = () => {
      const methods = useForm<RegistrationFormData>();
      return (
        <FormProvider {...methods}>
          <CityField prefix="alternativeShipping" />
        </FormProvider>
      );
    };
    render(<Wrapper />);
    expect(screen.getByLabelText('Alternative City')).toBeInTheDocument();
  });

  it('should show error message', () => {
    const Wrapper = () => {
      const methods = useForm<RegistrationFormData>();
      React.useEffect(() => {
        methods.setError('city', { type: 'required', message: 'City is required' });
        methods.setError('alternativeShippingCity', {
          type: 'required',
          message: 'Shipping city error',
        });
      }, []);
      return (
        <FormProvider {...methods}>
          <>
            <CityField />
            <CityField prefix="alternativeShipping" />
          </>
        </FormProvider>
      );
    };
    render(<Wrapper />);

    expect(screen.getByText('City is required')).toBeInTheDocument();
    expect(screen.getByText('Shipping city error')).toBeInTheDocument();
  });

  it('should accept input', async () => {
    const user = ue.setup();
    const Wrapper = () => {
      const methods = useForm<RegistrationFormData>();
      return (
        <FormProvider {...methods}>
          <CityField />
        </FormProvider>
      );
    };
    render(<Wrapper />);

    const input = screen.getByLabelText('City');
    await user.type(input, 'Moscow');

    expect(input).toHaveValue('Moscow');
  });
});
