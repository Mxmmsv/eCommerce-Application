import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, it, expect } from 'vitest';

import BurgerMenu from '../burger-menu';

describe('BurgerMenu', () => {
  it('opens when click on menu-open-button and closes when click on X-button', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <BurgerMenu />
      </MemoryRouter>,
    );

    const openMenuButton = screen.getByRole('button', { name: /open menu/i });
    await user.click(openMenuButton);

    const burgerMenu = screen.getByRole('dialog', { name: /burger menu/i });
    expect(burgerMenu).toHaveAttribute('data-state', 'open');

    const closeMenuButton = screen.getByRole('button', { name: /close menu/i });
    await user.click(closeMenuButton);

    expect(burgerMenu).toHaveAttribute('data-state', 'closed');
  });

  it('closes the burger menu after clicking a link', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <BurgerMenu />
      </MemoryRouter>,
    );

    const openMenuButton = screen.getByRole('button', { name: /open menu/i });
    await user.click(openMenuButton);

    const burgerMenu = screen.getByRole('dialog', { name: /burger menu/i });
    expect(burgerMenu).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /wishlist/i });
    await user.click(link);

    expect(screen.queryByRole('dialog', { name: /burger menu/i })).not.toBeInTheDocument();
  });
});
