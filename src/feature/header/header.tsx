import { Heart, ShoppingCart } from 'lucide-react';
import { NavLink } from 'react-router';

import BurgerMenu from './burger-menu';
import Currency from './currency';
import { ModeToggle } from './mode-toggle';
import { CustomNavigationMenu } from './nav-menu';
import { ProfileDropdownMenu } from './profile-dropdown';
import SearchBar from './search';

export function Header() {
  return (
    <>
      <header className="bg-background flex items-center justify-between p-4 shadow-lg lg:hidden">
        <div className="flex w-24 cursor-pointer items-center justify-center">
          <NavLink to="/">
            <img src="logo.svg" alt="logo" className="flex h-auto w-full rounded-2xl bg-white" />
          </NavLink>
        </div>
        <div className="flex items-center justify-center gap-4 max-sm:gap-0">
          <ModeToggle />
          <NavLink
            to="/wishlist"
            className="hover:text-chart-3 px-1.5 transition-colors duration-300"
          >
            <Heart strokeWidth={1.5} size={32} className="max-sm:size-6" />
          </NavLink>
          <NavLink to="/cart" className="hover:text-chart-3 px-1.5 transition-colors duration-300">
            <ShoppingCart strokeWidth={1.5} size={32} className="max-sm:size-6" />
          </NavLink>

          <BurgerMenu />
        </div>
      </header>

      <header className="bg-background hidden grid-cols-[1fr_125px_1fr] place-items-center py-4 lg:grid">
        <CustomNavigationMenu />

        <div className="flex w-24 cursor-pointer items-center justify-center">
          <NavLink to="/">
            <img src="logo.svg" alt="logo" className="flex h-auto w-full rounded-2xl bg-white" />
          </NavLink>
        </div>

        <nav className="flex items-center justify-end">
          <ul className="flex flex-row items-center gap-4">
            <li>
              <SearchBar />
            </li>
            <li>
              <Currency />
            </li>
            <li>
              <ModeToggle />
            </li>
            <li className="mr-6 flex gap-4">
              <ul className="flex flex-row items-center gap-4">
                <li>
                  <NavLink
                    to="/wishlist"
                    className="hover:text-chart-3 transition-colors duration-300"
                  >
                    <Heart strokeWidth={1.5} size={32} />
                  </NavLink>
                </li>
                <li>
                  <ProfileDropdownMenu />
                </li>
                <li>
                  <NavLink to="/cart" className="hover:text-chart-3 transition-colors duration-300">
                    <ShoppingCart strokeWidth={1.5} size={32} />
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
