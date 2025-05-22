import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, it, expect, beforeEach } from 'vitest';

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
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('saves switching theme value in localStorage and updates <html> class', async () => {
    const user = userEvent.setup();

    renderWithProvider();

    expect(localStorage.getItem('vite-ui-theme')).toBeNull();
    expect(document.documentElement.classList.contains('light')).toBe(true);

    await user.click(screen.getByRole('button'));

    expect(localStorage.getItem('vite-ui-theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    await user.click(screen.getByRole('button'));

    expect(localStorage.getItem('vite-ui-theme')).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('saves the theme after app reload', async () => {
    const user = userEvent.setup();

    renderWithProvider();

    await user.click(screen.getByRole('button'));

    expect(localStorage.getItem('vite-ui-theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    afterEach(() => cleanup());
    renderWithProvider();

    expect(localStorage.getItem('vite-ui-theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
