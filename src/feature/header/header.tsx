import { Heart } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { NavLink } from 'react-router';

import logoSrc from '@/assets/logo.jpg';

import Currency from './currency';
import Language from './language';
import { CustomNavigationMenu } from './nav-menu';
import { ProfileDropdownMenu } from './profile-dropdown';
import Search from './search';

const navLinkStyle = 'font-rubik font-normal text-xl tracking-wider';

export function Header() {
  return (
    <header className="grid grid-cols-[1fr_150px_1fr] items-center bg-white p-4 shadow-xl">
      <CustomNavigationMenu />

      <div className="flex w-24 items-center justify-center">
        <img src={logoSrc} alt="logo" />
      </div>

      <nav className="flex items-center justify-end">
        <ul className="flex flex-row items-center gap-4">
          <Search />
          <Currency />
          <Language />
          <div className="flex gap-4">
            <NavLink to="/wishlist" className={navLinkStyle}>
              <Heart strokeWidth={1.5} size={32} />
            </NavLink>

            <ProfileDropdownMenu />

            <NavLink to="/cart" className={navLinkStyle}>
              <ShoppingCart strokeWidth={1.5} size={32} />
            </NavLink>
          </div>
        </ul>
      </nav>
    </header>
  );
}
