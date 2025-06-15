import { render, screen } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import { describe, it, expect } from 'vitest';

import type { RegistrationFormData } from '@/feature/auth/registration/types';

import { EmailField } from '../email-field';

describe('EmailField', () => {
  it('should render email input with label', () => {
    const Wrapper = () => {
      const methods = useForm<RegistrationFormData>();
      return (
        <FormProvider {...methods}>
          <EmailField />
        </FormProvider>
      );
    };
    render(<Wrapper />);

    const input = screen.getByLabelText('Email');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('placeholder', 'm@example.com');
    expect(input).toHaveAttribute('autocomplete', 'username');
  });
});
