import { NavLink } from 'react-router';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

export function CustomNavigationMenu() {
  return (
    <NavigationMenu className="flex items-center justify-between gap-5 text-xl">
      <NavigationMenuList className="flex items-center justify-between">
        <NavigationMenuItem className="hover:bg-secondary flex h-auto cursor-pointer items-center justify-between rounded-sm text-xl font-medium">
          <NavLink to="/" end className="px-6 py-4">
            Home
          </NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="hover:bg-secondary flex h-auto cursor-pointer items-center justify-between rounded-sm text-xl font-medium">
          <NavLink to="/catalog" className="px-6 py-4">
            Catalog
          </NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="hover:bg-secondary flex h-auto cursor-pointer justify-between self-center rounded-sm text-xl font-medium">
          <NavLink to="/about_us" className="px-6 py-4">
            About us
          </NavLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
