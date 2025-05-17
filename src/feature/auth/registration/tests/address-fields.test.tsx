import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { AddressFields } from '../address-fields';

describe('AddressFields', () => {
  it('should render the form title and fields', () => {
    const mockProps = {
      register: vi.fn(),
      errors: {},
    };
    render(<AddressFields {...mockProps} />);

    expect(screen.getByText(/Address Information/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('Postal code')).toBeInTheDocument();
    expect(screen.getByLabelText('City')).toBeInTheDocument();
    expect(screen.getByLabelText('Street')).toBeInTheDocument();
  });

  it('should show validation errors', () => {
    const mockProps = {
      register: vi.fn(),
      errors: {
        country: { message: 'Country is required', type: 'required' },
        postalCode: { message: 'Postal code is invalid', type: 'pattern' },
        city: { message: 'City should contain only letters', type: 'pattern' },
        street: { message: 'Street is required', type: 'required' },
      },
    };
    render(<AddressFields {...mockProps} />);

    expect(screen.getByText(/country is required/i)).toBeInTheDocument();
    expect(screen.getByText(/postal code is invalid/i)).toBeInTheDocument();
    expect(screen.getByText(/city should contain only letters/i)).toBeInTheDocument();
    expect(screen.getByText(/street is required/i)).toBeInTheDocument();

    expect(screen.getByText(/country is required/i)).toHaveClass('error-message');
    expect(screen.getByText(/postal code is invalid/i)).toHaveClass('error-message');
    expect(screen.getByText(/city should contain only letters/i)).toHaveClass('error-message');
    expect(screen.getByText(/street is required/i)).toHaveClass('error-message');
  });
});
