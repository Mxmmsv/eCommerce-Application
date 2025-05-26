import { clsx } from 'clsx';
import {
  UserRound,
  UserRoundPen,
  UserRoundPlus,
  LogIn,
  LogOut,
  UserRoundCheck,
} from 'lucide-react';
import { useContext } from 'react';
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
import AuthContext from '@/feature/auth/login/auth-provider';

export function ProfileDropdownMenu() {
  const handleLogout = useLogout();
  const { IS_AUTHORIZED } = useContext(AuthContext);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        {IS_AUTHORIZED ? (
          <UserRoundCheck strokeWidth={1.5} size={32} />
        ) : (
          <UserRound strokeWidth={1.5} size={32} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex w-56 flex-col justify-start pr-4 pl-4">
        <DropdownMenuLabel className="flex justify-center">
          <span className="text-xl">My Account</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <div className="hover:bg-secondary flex items-center justify-start rounded-sm border-white shadow-none">
          <LogIn strokeWidth={1.5} size={28} />
          <DropdownMenuItem asChild>
            <NavLink to="/login" className="flex w-full cursor-pointer justify-start text-xl">
              <span className="block">Log in</span>
            </NavLink>
          </DropdownMenuItem>
        </div>

        <div className="hover:bg-secondary flex items-center justify-start rounded-sm border-white shadow-none">
          <UserRoundPlus strokeWidth={1.5} size={28} />
          <DropdownMenuItem asChild>
            <NavLink
              to="/registration"
              className="flex w-full cursor-pointer justify-start text-xl"
            >
              <span>Registration</span>
            </NavLink>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        <div className="hover:bg-secondary flex items-center justify-start rounded-sm border-white shadow-none">
          <UserRoundPen strokeWidth={1.5} size={28} />
          <DropdownMenuItem asChild>
            <NavLink to="/profile" className="flex w-full cursor-pointer justify-start text-xl">
              <span className="block">Profile</span>
            </NavLink>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        <div
          className={clsx(
            'flex w-full items-center justify-start rounded-sm border-white shadow-none',
            {
              'cursor-not-allowed opacity-50': !IS_AUTHORIZED,
              'hover:bg-secondary cursor-pointer': IS_AUTHORIZED,
            },
          )}
        >
          <LogOut strokeWidth={1.5} size={28} />
          <DropdownMenuItem
            className="w-full cursor-pointer"
            onClick={handleLogout}
            disabled={!IS_AUTHORIZED}
          >
            <span className="w-full text-start text-xl whitespace-nowrap">Log out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
