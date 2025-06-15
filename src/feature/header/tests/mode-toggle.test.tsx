import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, it, expect } from 'vitest';

import { ThemeProvider } from '@/components/ui/theme-provider';

import { ModeToggle } from '../mode-toggle';

const renderWithProvider = () => {
  render(
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <ModeToggle />
    </ThemeProvider>,
  );
};

describe('ModeToggle', () => {
  afterEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('saves switching theme value in localStorage and updates <html> class, saves the theme after page reload', async () => {
    const user = userEvent.setup();

    renderWithProvider();

    expect(localStorage.getItem('vite-ui-theme')).toBeNull();
    expect(document.documentElement.classList.contains('light')).toBe(true);

    await user.click(screen.getByRole('button', { name: /toggle-button/i }));

    expect(localStorage.getItem('vite-ui-theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    await user.click(screen.getByRole('button', { name: /toggle-button/i }));

    expect(localStorage.getItem('vite-ui-theme')).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);

    renderWithProvider();

    expect(localStorage.getItem('vite-ui-theme')).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });
});
