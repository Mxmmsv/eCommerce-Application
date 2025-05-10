import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { AddressFields } from './address-fields';

describe('AddressFields', () => {
  it('should render the form title and fields', () => {
    const mockProps = {
      register: vi.fn(),
      errors: {},
    };
    render(<AddressFields {...mockProps} />);

    expect(screen.getByText(/Address Information/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('City')).toBeInTheDocument();
    expect(screen.getByLabelText('Street')).toBeInTheDocument();
  });
});
