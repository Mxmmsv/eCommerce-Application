import {
  Menu,
  ChevronDown,
  X,
  LayoutGrid,
  BookImage,
  Heart,
  UserRound,
  ShoppingCart,
  LogOut,
  LogIn,
  UserRoundPlus,
  UserRoundPen,
  ShieldCheck,
  Box,
} from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
  SheetDescription,
  SheetTitle,
} from '@/components/ui/sheet';

import { ModeToggle } from './mode-toggle';
import SearchBar from './search';

export default function BurgerMenu() {
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="flex items-center justify-center gap-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-auto w-full items-center justify-center [&_svg:not([class*='size-'])]:size-8"
          >
            <Menu size={32} />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="top"
          className="flex max-h-[100vh] space-y-4 overflow-y-auto p-4 text-2xl"
        >
          <SheetTitle className="sr-only">
            Burger menu for screens with a resolution of less than 1025px.
          </SheetTitle>
          <SheetDescription className="sr-only">
            This menu allows you to choose one of the pages you want to navigate to: Home, Catalog,
            About Us, Profile, Cart, Wishlist, or perform a site search.
          </SheetDescription>
          <div className="flex items-center justify-between gap-10">
            <div className="flex w-24 cursor-pointer items-center justify-center">
              <NavLink to="/">
                <img src="logo.svg" alt="logo" />
              </NavLink>
            </div>
            <SearchBar />
            <ModeToggle />
            <SheetClose asChild>
              <Button
                variant="ghost"
                className="flex h-[55px] w-[55px] items-center justify-center [&_svg:not([class*='size-'])]:size-8"
              >
                <X size={32} />
              </Button>
            </SheetClose>
          </div>
          <nav className="flex flex-col p-4">
            <SheetClose asChild>
              <NavLink
                to="/"
                className="flex w-full cursor-pointer items-center py-5 hover:underline"
              >
                <LayoutGrid size={28} className="mr-2" />
                Home
              </NavLink>
            </SheetClose>

            <button
              className="flex items-center justify-between"
              onClick={() => setCatalogOpen(!catalogOpen)}
              aria-expanded={catalogOpen}
              aria-controls="catalog-menu"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setCatalogOpen(!catalogOpen)}
            >
              <BookImage size={28} className="mr-2" />
              <span className="flex w-full cursor-pointer py-5 hover:underline">Catalog</span>
              <ChevronDown className={`transition-transform ${catalogOpen ? 'rotate-180' : ''}`} />
            </button>
            {catalogOpen && (
              <div id="catalog-menu" className="ml-4 flex flex-col">
                <SheetClose asChild>
                  <NavLink to="/catalog" className="flex items-center py-3 hover:underline">
                    <Box size={28} className="mr-2" />
                    All Products
                  </NavLink>
                </SheetClose>
              </div>
            )}

            <SheetClose asChild>
              <NavLink
                to="/wishlist"
                className="flex w-full cursor-pointer items-center py-5 hover:underline"
              >
                <Heart size={28} className="mr-2" />
                Wishlist
              </NavLink>
            </SheetClose>

            <SheetClose asChild>
              <NavLink
                to="/about_us"
                className="flex w-full cursor-pointer items-center py-5 hover:underline"
              >
                <ShieldCheck size={28} className="mr-2" />
                About us
              </NavLink>
            </SheetClose>
          </nav>
          <div className="flex flex-col border-t p-4">
            <button
              className="flex items-center justify-between"
              onClick={() => setProfileOpen(!profileOpen)}
              aria-expanded={profileOpen}
              aria-controls="profile-menu"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setProfileOpen(!profileOpen)}
            >
              <span className="flex w-full cursor-pointer py-5 hover:underline">
                <UserRound size={28} className="mr-2" />
                Profile
              </span>
              <ChevronDown className={`transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
            </button>
            {profileOpen && (
              <div id="profile-menu" className="ml-4 flex flex-col">
                <SheetClose asChild>
                  <NavLink to="/login" className="flex items-center py-3 hover:underline">
                    <LogIn size={28} className="mr-2" />
                    Login
                  </NavLink>
                </SheetClose>

                <SheetClose asChild>
                  <NavLink to="/registration" className="flex items-center py-3 hover:underline">
                    <UserRoundPlus size={28} className="mr-2" />
                    Registration
                  </NavLink>
                </SheetClose>

                <SheetClose asChild>
                  <NavLink to="/profile" className="flex items-center py-3 hover:underline">
                    <UserRoundPen size={28} className="mr-2" />
                    Profile
                  </NavLink>
                </SheetClose>

                <SheetClose asChild>
                  <NavLink to="/logout" className="flex items-center py-3 hover:underline">
                    <LogOut size={28} className="mr-2" />
                    Logout
                  </NavLink>
                </SheetClose>
              </div>
            )}

            <SheetClose asChild>
              <NavLink
                to="/cart"
                className="flex w-full cursor-pointer items-center py-5 hover:underline"
              >
                <ShoppingCart size={28} className="mr-2" />
                Cart
              </NavLink>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
