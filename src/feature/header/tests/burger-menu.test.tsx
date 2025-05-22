import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router';
import { describe, it, expect } from 'vitest';

import BurgerMenu from '../burger-menu';

describe('BurgerMenu', () => {
  it('opens when clicking menu-open-button and closes when clicking on X-button', async () => {
    render(
      <BrowserRouter>
        <BurgerMenu />
      </BrowserRouter>,
    );
    const user = userEvent.setup();

    const openMenuButton = screen.getByRole('button', { name: 'open menu' });
    await user.click(openMenuButton);

    const burgerMenu = await screen.findByRole('dialog', { name: /burger menu/i });
    expect(burgerMenu).toHaveAttribute('data-state', 'open');

    const closeMenuButton = screen.getByRole('button', { name: 'close menu' });
    await user.click(closeMenuButton);

    await waitFor(() => {
      expect(burgerMenu).toHaveAttribute('data-state', 'closed');
    });
  });

  it('closes the burger menu after clicking a link', async () => {
    render(
      <BrowserRouter>
        <BurgerMenu />
      </BrowserRouter>,
    );
    const user = userEvent.setup();

    const openMenuButton = screen.findByRole('button', { name: /open menu/i });
    await user.click(await openMenuButton);

    const burgerMenu = await screen.findByRole('dialog', { name: /burger menu/i });
    expect(burgerMenu).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /wishlist/i });
    await user.click(link);

    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: /burger menu/i })).not.toBeInTheDocument();
    });
  });
});
