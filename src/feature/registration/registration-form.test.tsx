import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

import { RegistrationForm } from './registration-form';
vi.mock('@/components/ui/button/close-button', () => ({
  CloseButton: () => <div data-testid="mock-close-button" />,
}));

describe('RegistrationForm', () => {
  it('should render the form title', () => {
    render(
      <MemoryRouter>
        <RegistrationForm />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Create an account/i)).toBeInTheDocument();
    expect(screen.getByTestId('mock-close-button')).toBeInTheDocument();
  });
});
