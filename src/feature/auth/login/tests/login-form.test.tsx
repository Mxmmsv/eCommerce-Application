import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, it, expect } from 'vitest';

import { AlertFailedLogin } from '../alert-login';
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
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    );

    const email = screen.getByLabelText('Email');
    const password = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /Login/i });

    await userEvent.type(email, 'test@example.com');
    await userEvent.type(password, 'Password123');
    await userEvent.click(submitButton);

    expect(screen.queryByText(/please enter a valid email/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText('Password')).not.toHaveClass('text-red-500');
  });

  describe('Alert Failed', () => {
    it('should render error alert with correct message', () => {
      render(<AlertFailedLogin />);
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Authorization error!Please check your email and password and try again.',
      );
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
