import { render, screen } from '@testing-library/react';
import ue from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

import App from './App';

describe('App', () => {
  it('should increase counter when user clicks the button', async () => {
    const user = ue.setup();

    render(<App />);

    expect(screen.getByText(/counter: 0/i)).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /click/i });

    await user.click(button);
    expect(screen.getByText(/counter: 1/i)).toBeInTheDocument();
  });
});
