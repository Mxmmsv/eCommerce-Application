import { render, screen, waitFor } from '@testing-library/react';
import ue from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

import { RegistrationForm } from './registration-form';
vi.mock('@/components/ui/button/close-button', () => ({
  CloseButton: () => <div data-testid="mock-close-button" />,
}));

describe('RegistrationForm', () => {
  it('should render the form fields', async () => {
    const user = ue.setup();

    render(
      <MemoryRouter>
        <RegistrationForm />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Create an account/i)).toBeInTheDocument();
    expect(screen.getByTestId('mock-close-button')).toBeInTheDocument();
    expect(screen.getByLabelText(/First name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last name/i)).toBeInTheDocument();
    expect(screen.getByText(/Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Register/i }));

    expect(await screen.findAllByText(/required/i)).not.toHaveLength(0);
    expect(screen.getByLabelText(/First name/i)).toHaveAttribute('aria-invalid', 'true');
  });

  it('should accept valid input', async () => {
    const user = ue.setup();
    render(
      <MemoryRouter>
        <RegistrationForm />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(/First name/i), 'John');
    await user.type(screen.getByLabelText(/Last name/i), 'Doe');
    await user.type(screen.getByLabelText(/Email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/Password/i), 'Password123');
    await user.type(screen.getByLabelText(/Date of Birth/i), '2001-01-02');
    await user.type(screen.getByLabelText(/Country/i), 'Country');
    await user.type(screen.getByLabelText(/Postal code/i), '12345');
    await user.type(screen.getByLabelText(/City/i), 'City');
    await user.type(screen.getByLabelText(/Street/i), 'Street');

    await waitFor(() => {
      expect(screen.queryAllByText(/required/i)).toHaveLength(0);
    });
  });
});
