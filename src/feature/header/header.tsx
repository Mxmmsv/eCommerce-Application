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
            <img src="logo.svg" alt="logo" className="flex h-auto w-full" />
          </NavLink>
        </div>
        <div className="flex items-center justify-center gap-4 max-sm:gap-1">
          <ModeToggle />
          <NavLink to="/wishlist" className="px-1.5 text-xl font-normal tracking-wider">
            <Heart strokeWidth={1.5} size={32} className="max-sm:size-6" />
          </NavLink>
          <NavLink to="/cart" className="px-1.5 text-xl font-normal tracking-wider">
            <ShoppingCart strokeWidth={1.5} size={32} className="max-sm:size-6" />
          </NavLink>

          <BurgerMenu />
        </div>
      </header>

      <header className="bg-background hidden grid-cols-[1fr_125px_1fr] place-items-center py-4 lg:grid">
        <CustomNavigationMenu />

        <div className="flex w-24 cursor-pointer items-center justify-center">
          <NavLink to="/">
            <img src="logo.svg" alt="logo" />
          </NavLink>
        </div>

        <nav className="flex items-center justify-end">
          <ul className="flex flex-row items-center gap-4">
            <SearchBar />
            <Currency />
            <ModeToggle />
            <div className="mr-6 flex gap-4">
              <NavLink to="/wishlist" className="text-xl font-normal tracking-wider">
                <Heart strokeWidth={1.5} size={32} />
              </NavLink>

              <ProfileDropdownMenu />

              <NavLink to="/cart" className="text-xl font-normal tracking-wider">
                <ShoppingCart strokeWidth={1.5} size={32} />
              </NavLink>
            </div>
          </ul>
        </nav>
      </header>
    </>
  );
}
