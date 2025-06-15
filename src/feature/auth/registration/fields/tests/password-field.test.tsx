import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm, FormProvider } from 'react-hook-form';
import { describe, it, expect, vi } from 'vitest';

import type { RegistrationFormData } from '@/feature/auth/registration/types';

import { PasswordField } from '../password-field';

vi.mock('lucide-react', () => ({
  AlertCircle: () => <div data-testid="alert-icon" />,
  ToggleLeft: () => <div data-testid="toggle-closed" />,
  ToggleRight: () => <div data-testid="toggle-open" />,
}));

describe('PasswordField', () => {
  it('should render password field with toggle button', () => {
    const Wrapper = () => {
      const methods = useForm<RegistrationFormData>();
      return (
        <FormProvider {...methods}>
          <PasswordField />
        </FormProvider>
      );
    };
    render(<Wrapper />);

    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
    expect(screen.getByTestId('toggle-closed')).toBeInTheDocument();
  });

  it('should accept password input', async () => {
    const user = userEvent.setup();
    const Wrapper = () => {
      const methods = useForm<RegistrationFormData>();
      return (
        <FormProvider {...methods}>
          <PasswordField />
        </FormProvider>
      );
    };
    render(<Wrapper />);

    const input = screen.getByLabelText('Password');
    await user.type(input, 'secure123');

    expect(input).toHaveValue('secure123');
  });
});
