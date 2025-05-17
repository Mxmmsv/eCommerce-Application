import { NavLink } from 'react-router';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export function CustomNavigationMenu() {
  return (
    <NavigationMenu className="flex items-center justify-between gap-5 text-xl">
      <NavigationMenuList className="flex items-center justify-between">
        <NavigationMenuItem className="flex h-auto cursor-pointer items-center justify-between rounded-sm px-6 py-4 text-xl font-medium hover:bg-gray-100">
          <NavLink to="/" end>
            Home
          </NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="relative flex h-auto cursor-pointer justify-between self-center rounded-sm font-medium hover:bg-gray-100">
          <NavigationMenuTrigger className="h-auto items-center px-6 py-4 text-xl hover:bg-gray-100">
            Catalog
          </NavigationMenuTrigger>

          <NavigationMenuContent className="flex cursor-pointer items-center justify-center p-10 hover:rounded-sm hover:bg-gray-100">
            <NavLink to="/catalog">
              <span>All&nbsp;products</span>
            </NavLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className="flex h-auto cursor-pointer justify-between self-center rounded-sm px-6 py-4 text-xl font-medium hover:bg-gray-100">
          <NavLink to="/about_us">About us</NavLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
