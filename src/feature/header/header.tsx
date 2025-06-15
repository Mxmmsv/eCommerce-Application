import { NavLink } from 'react-router';

import BurgerMenu from './burger-menu';
import { CartIconWithBadge } from './cart-icon-with-badge';
import { ModeToggle } from './mode-toggle';
import { CustomNavigationMenu } from './nav-menu';
import { ProfileDropdownMenu } from './profile-dropdown';
import SearchBar from './search';

export function Header() {
  return (
    <>
      <header className="bg-background grid-cols-[1fr_125px_1fr] place-items-center py-4 max-lg:flex max-lg:items-center max-lg:justify-between max-lg:p-4 lg:grid">
        <CustomNavigationMenu />

        <div className="flex w-24 cursor-pointer flex-col items-center justify-center">
          <NavLink to="/">
            <img src="/logo.svg" alt="logo" className="flex h-auto w-full rounded-2xl bg-white" />
            <span className="text-lg">Poster store</span>
          </NavLink>
        </div>

        <nav className="flex flex-nowrap items-center justify-end gap-6">
          <div className="max-lg:hidden">
            <SearchBar />
          </div>
          <ul className="flex flex-row items-center lg:mr-4">
            <li>
              <ModeToggle />
            </li>
            <li className="flex">
              <ProfileDropdownMenu />
            </li>
            <li className="flex">
              <CartIconWithBadge />
            </li>
            <li>
              <BurgerMenu />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
