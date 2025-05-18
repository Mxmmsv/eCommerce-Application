import { UserRound, UserRoundPen, UserRoundPlus, LogIn, LogOut } from 'lucide-react';
import { NavLink } from 'react-router';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export function ProfileDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <UserRound strokeWidth={1.5} size={32} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex w-56 flex-col justify-start pr-4 pl-4 text-black">
        <DropdownMenuLabel className="flex justify-center">
          <span className="text-xl">My Account</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <div className="flex items-center justify-start rounded-sm border-white shadow-none hover:bg-[#f5f5f5]">
          <LogIn strokeWidth={1.5} size={28} />
          <DropdownMenuItem className="w-full cursor-pointer">
            <NavLink to="/login" className="w-full justify-center text-xl whitespace-nowrap">
              <span className="block">Log in</span>
            </NavLink>
          </DropdownMenuItem>
        </div>

        <div className="flex items-center justify-start rounded-sm border-white shadow-none hover:bg-[#f5f5f5]">
          <UserRoundPlus strokeWidth={1.5} size={28} />
          <DropdownMenuItem className="w-full cursor-pointer">
            <NavLink to="/registration" className="w-full justify-center text-xl whitespace-nowrap">
              <span>Registration</span>
            </NavLink>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        <div className="flex items-center justify-start rounded-sm border-white shadow-none hover:bg-[#f5f5f5]">
          <UserRoundPen strokeWidth={1.5} size={28} />
          <DropdownMenuItem className="w-full cursor-pointer">
            <NavLink to="/profile" className="w-full justify-center text-xl whitespace-nowrap">
              <span className="block">Profile</span>
            </NavLink>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        <div className="flex items-center justify-start rounded-sm border-white shadow-none hover:bg-[#f5f5f5]">
          <LogOut strokeWidth={1.5} size={28} />
          <DropdownMenuItem className="w-full cursor-pointer">
            <NavLink to="/" className="w-full justify-center text-xl whitespace-nowrap">
              <span className="block">Log out</span>
            </NavLink>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
