import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm, FormProvider } from 'react-hook-form';
import { describe, it, expect } from 'vitest';

import type { RegistrationFormData } from '@/feature/auth/registration/types';

import { NameFields } from '../name-fields';

describe('NameFields', () => {
  it('should render first and last name fields', () => {
    const Wrapper = () => {
      const methods = useForm<RegistrationFormData>();
      return (
        <FormProvider {...methods}>
          <NameFields />
        </FormProvider>
      );
    };
    render(<Wrapper />);
    expect(screen.getByLabelText('First name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last name')).toBeInTheDocument();
  });

  it('should accept user input', async () => {
    const user = userEvent.setup();
    const Wrapper = () => {
      const methods = useForm<RegistrationFormData>();
      return (
        <FormProvider {...methods}>
          <NameFields />
        </FormProvider>
      );
    };
    render(<Wrapper />);

    await user.type(screen.getByLabelText('First name'), 'John');
    await user.type(screen.getByLabelText('Last name'), 'Doe');

    expect(screen.getByLabelText('First name')).toHaveValue('John');
    expect(screen.getByLabelText('Last name')).toHaveValue('Doe');
  });
});
