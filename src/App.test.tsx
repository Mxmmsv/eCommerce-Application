import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

import App from './App';

describe('App', () => {
  it('renders content on the pages and navigates to the pages', async () => {
    render(<App />);
    const user = userEvent.setup();
    expect(screen.getByText(/home page/i)).toBeInTheDocument();

    await user.click(screen.getByText(/about us/i));
    expect(screen.getByText(/about us page/i)).toBeInTheDocument();
  });

  it('redirects on a not-found-page', () => {
    window.history.pushState({}, '', '/unknown-route');

    render(<App />);

    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});
