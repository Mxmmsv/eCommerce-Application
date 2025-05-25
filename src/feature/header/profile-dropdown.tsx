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
import { useLogout } from '@/feature/auth/login/api/use-logout';

export function ProfileDropdownMenu() {
  const handleLogout = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:text-chart-3 cursor-pointer p-3 transition-colors duration-300 max-lg:hidden lg:p-2">
        <UserRound strokeWidth={1.5} size={32} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex w-56 flex-col justify-start pr-4 pl-4">
        <DropdownMenuLabel className="flex justify-center">
          <span className="text-xl">My Account</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <div className="hover:bg-secondary flex items-center justify-start rounded-sm border-white shadow-none">
          <LogIn strokeWidth={1.5} size={28} />
          <DropdownMenuItem className="w-full cursor-pointer">
            <NavLink to="/login" className="w-full justify-center text-xl whitespace-nowrap">
              <span className="block">Log in</span>
            </NavLink>
          </DropdownMenuItem>
        </div>

        <div className="hover:bg-secondary flex items-center justify-start rounded-sm border-white shadow-none">
          <UserRoundPlus strokeWidth={1.5} size={28} />
          <DropdownMenuItem className="w-full cursor-pointer">
            <NavLink to="/registration" className="w-full justify-center text-xl whitespace-nowrap">
              <span>Registration</span>
            </NavLink>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        <div className="hover:bg-secondary flex items-center justify-start rounded-sm border-white shadow-none">
          <UserRoundPen strokeWidth={1.5} size={28} />
          <DropdownMenuItem className="w-full cursor-pointer">
            <NavLink to="/profile" className="w-full justify-center text-xl whitespace-nowrap">
              <span className="block">Profile</span>
            </NavLink>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        <div className="hover:bg-secondary flex items-center justify-start rounded-sm border-white shadow-none">
          <LogOut strokeWidth={1.5} size={28} />
          <DropdownMenuItem className="w-full cursor-pointer" onClick={handleLogout}>
            <span className="w-full text-start text-xl whitespace-nowrap">Log out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
