import {
  Menu,
  ChevronDown,
  X,
  LayoutGrid,
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

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
  SheetDescription,
  SheetTitle,
} from '@/components/ui/sheet';
import { useLogout } from '@/feature/auth/login/api/use-logout';

import { ModeToggle } from './mode-toggle';
import SearchBar from './search';

export default function BurgerMenu() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const handleLogout = useLogout();

  return (
    <div className="flex items-center justify-center gap-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-auto w-full items-center justify-center [&_svg:not([class*='size-'])]:size-8"
          >
            <Menu size={32} className="max-sm:size-6" />
          </Button>
        </SheetTrigger>

        <SheetContent side="top" className="flex max-h-[100vh] space-y-4 overflow-y-auto text-2xl">
          <SheetTitle className="sr-only">
            Burger menu for screens with a resolution of less than 1025px.
          </SheetTitle>
          <SheetDescription className="sr-only">
            This menu allows you to choose one of the pages you want to navigate to: Home, Catalog,
            About Us, Profile, Cart, Wishlist, or perform a site search.
          </SheetDescription>
          <div className="bg-background flex items-center justify-between gap-10 border-b-2 border-solid p-4 max-md:gap-2 max-md:p-2">
            <div className="flex w-24 cursor-pointer items-center justify-center">
              <NavLink to="/">
                <img src="logo.svg" alt="logo" className="rounded-2xl bg-white" />
              </NavLink>
            </div>
            <SearchBar />

            <div className="flex items-center justify-center gap-5 max-md:gap-1">
              <ModeToggle />
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  className="flex h-[55px] w-[55px] items-center justify-center [&_svg:not([class*='size-'])]:size-8"
                >
                  <X size={32} className="max-sm:size-6" />
                </Button>
              </SheetClose>
            </div>
          </div>
          <nav className="flex flex-col items-start px-9 py-4 md:items-center">
            <SheetClose asChild>
              <NavLink
                to="/"
                className="flex w-full cursor-pointer py-5 hover:underline md:justify-center"
              >
                <LayoutGrid size={28} className="mr-2" />
                Home
              </NavLink>
            </SheetClose>

            <SheetClose asChild>
              <NavLink
                to="/catalog"
                className="flex w-full cursor-pointer py-5 hover:underline md:justify-center"
              >
                <Box size={28} className="mr-2" />
                Catalog
              </NavLink>
            </SheetClose>

            <SheetClose asChild>
              <NavLink
                to="/wishlist"
                className="flex w-full cursor-pointer items-center py-5 hover:underline md:justify-center"
              >
                <Heart size={28} className="mr-2" />
                Wishlist
              </NavLink>
            </SheetClose>

            <SheetClose asChild>
              <NavLink
                to="/about_us"
                className="flex w-full cursor-pointer items-center py-5 hover:underline md:justify-center"
              >
                <ShieldCheck size={28} className="mr-2" />
                About us
              </NavLink>
            </SheetClose>
          </nav>
          <div className="flex flex-col border-t p-4 md:items-center">
            <button
              className="flex items-center justify-between"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              aria-expanded={isProfileOpen}
              aria-controls="profile-menu"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setIsProfileOpen(!isProfileOpen)}
            >
              <span className="flex w-full cursor-pointer p-5 hover:underline">
                <UserRound size={28} className="mr-2" />
                Profile
              </span>
              <ChevronDown
                className={`transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isProfileOpen && (
              <div id="profile-menu" className="ml-4 flex flex-col">
                <SheetClose asChild>
                  <NavLink to="/login" className="flex items-center p-3 hover:underline">
                    <LogIn size={28} className="mr-2" />
                    Login
                  </NavLink>
                </SheetClose>

                <SheetClose asChild>
                  <NavLink to="/registration" className="flex items-center p-3 hover:underline">
                    <UserRoundPlus size={28} className="mr-2" />
                    Registration
                  </NavLink>
                </SheetClose>

                <SheetClose asChild>
                  <NavLink to="/profile" className="flex items-center p-3 hover:underline">
                    <UserRoundPen size={28} className="mr-2" />
                    Profile
                  </NavLink>
                </SheetClose>

                <SheetClose asChild onClick={handleLogout}>
                  <NavLink
                    className={`${buttonVariants({ variant: 'link' })} h-auto w-full cursor-pointer items-center justify-start hover:underline`}
                    to={'/login'}
                  >
                    <LogOut size={28} className="[&_svg:not([class*='size-'])]:size-8" />
                    <span className="py-1 text-2xl font-normal">Log out</span>
                  </NavLink>
                </SheetClose>
              </div>
            )}

            <SheetClose asChild>
              <NavLink
                to="/cart"
                className="flex w-full cursor-pointer items-center p-5 hover:underline md:justify-center"
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
