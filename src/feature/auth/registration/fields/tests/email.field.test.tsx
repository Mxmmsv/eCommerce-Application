import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('should show required error when empty', () => {
    const Wrapper = () => {
      const methods = useForm<RegistrationFormData>({
        errors: {
          email: {
            type: 'required',
            message: 'Email is required',
          },
        },
      });
      return (
        <FormProvider {...methods}>
          <EmailField />
        </FormProvider>
      );
    };
    render(<Wrapper />);

    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByTestId('alert-circle')).toBeInTheDocument();
  });

  it('should accept valid email input', async () => {
    const user = userEvent.setup();
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
    await user.type(input, 'test@example.com');
    expect(input).toHaveValue('test@example.com');
  });

  it('should show validation error for invalid format', async () => {
    const user = userEvent.setup();
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
    await user.type(input, 'invalid-email');
    await user.tab();

    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
  });
});
