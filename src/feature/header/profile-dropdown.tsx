import { UserRound } from 'lucide-react';
import { UserRoundPen } from 'lucide-react';
import { UserRoundPlus } from 'lucide-react';
import { LogIn } from 'lucide-react';
import { LogOut } from 'lucide-react';
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
  const DropdownMenuItemStyle = 'w-full cursor-pointer';
  const NavLinkDropdownMenuStyle = 'w-full justify-center text-xl whitespace-nowrap';
  const divMenuItemStyle =
    'flex justify-start items-center rounded-sm hover:bg-[#f5f5f5] border-white shadow-none';

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

        <div className={divMenuItemStyle}>
          <LogIn strokeWidth={1.5} size={28} />
          <DropdownMenuItem className={DropdownMenuItemStyle}>
            <NavLink to="/login" className={NavLinkDropdownMenuStyle}>
              <span className="block">Log in</span>
            </NavLink>
          </DropdownMenuItem>
        </div>

        <div className={divMenuItemStyle}>
          <UserRoundPlus strokeWidth={1.5} size={28} />
          <DropdownMenuItem className={DropdownMenuItemStyle}>
            <NavLink to="/register" className={NavLinkDropdownMenuStyle}>
              <span>Registration</span>
            </NavLink>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        <div className={divMenuItemStyle}>
          <UserRoundPen strokeWidth={1.5} size={28} />
          <DropdownMenuItem className={DropdownMenuItemStyle}>
            <NavLink to="/profile" className={NavLinkDropdownMenuStyle}>
              <span className="block">Profile</span>
            </NavLink>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        <div className={divMenuItemStyle}>
          <LogOut strokeWidth={1.5} size={28} />
          <DropdownMenuItem className={DropdownMenuItemStyle}>
            <NavLink to="/" className={NavLinkDropdownMenuStyle}>
              <span className="block">Log out</span>
            </NavLink>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
