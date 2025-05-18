import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, it, expect, vi } from 'vitest';

import { LoginForm } from '../login-form';

describe('Login form', () => {
  it(`should contain 'Welcome back'`, () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    );
    expect(screen.getByText('Welcome back')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('should call onSubmit with valid data', async () => {
    const user = userEvent.setup();
    const submitSpy = vi.fn();

    render(
      <MemoryRouter>
        <LoginForm onSubmit={submitSpy} />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'Password123');
    await user.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalled();
    });
  });

  describe('Email', () => {
    it(`should contain 'Email'`, () => {
      render(
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>,
      );
      const result = screen.getByText('Email');
      expect(result).toBeInTheDocument();
    });

    it('should check the connection between the label and the input', () => {
      render(
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>,
      );
      const emailInput = screen.getByLabelText('Email');
      expect(emailInput).toBeInTheDocument();
      expect(emailInput.tagName).toBe('INPUT');
    });

    it('should show AlertCircle icon, text-red-500 class and error message when email is invalid', async () => {
      render(
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>,
      );
      const emailInput = screen.getByLabelText('Email');

      await userEvent.type(emailInput, 'aboba');
      await userEvent.tab();
      const alertIcon = await screen.findByTestId('alert-icon');
      const errorMessage = await screen.findByText(
        'Please enter a valid email (e.g., user@example.com)',
      );

      expect(alertIcon).toBeInTheDocument();
      expect(alertIcon).toHaveClass('text-red-500');
      expect(errorMessage).toBeInTheDocument();
    });

    it('should not show AlertCircle icon, text-red-500 class and error message when email is valid', async () => {
      render(
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>,
      );
      const emailInput = screen.getByLabelText('Email');
      await userEvent.type(emailInput, 'test@example.com');
      await userEvent.tab();

      const alertIcon = screen.queryByTestId('alert-icon');
      expect(alertIcon).not.toBeInTheDocument();
    });
  });
});
